import { Item, CharacterClass } from '../types/game';
import { EXPANDED_WEAPONS } from './expandedEquipment';
import { EXPANDED_ARMOR } from './expandedArmor';
import { ACCESSORIES, EXPANDED_CONSUMABLES, CRAFTING_MATERIALS } from './expandedAccessories';

// MASTER EQUIPMENT SYSTEM - Combines all equipment types
export const MASTER_WEAPONS: Record<CharacterClass, Item[]> = EXPANDED_WEAPONS;
export const MASTER_ARMOR: Record<CharacterClass, Item[]> = EXPANDED_ARMOR;
export const MASTER_ACCESSORIES: Item[] = ACCESSORIES;
export const MASTER_CONSUMABLES: Item[] = EXPANDED_CONSUMABLES;
export const MASTER_MATERIALS: Item[] = CRAFTING_MATERIALS;

// CLASS-SPECIFIC EQUIPMENT SETS FOR EASY ACCESS
export const getClassWeapons = (characterClass: CharacterClass): Item[] => {
  return MASTER_WEAPONS[characterClass] || [];
};

export const getClassArmor = (characterClass: CharacterClass): Item[] => {
  return MASTER_ARMOR[characterClass] || [];
};

// GET EQUIPMENT BY TIER/RARITY
export const getWeaponsByTier = (characterClass: CharacterClass, rarity: 'epic' | 'legendary' | 'ultimate'): Item[] => {
  return getClassWeapons(characterClass).filter(weapon => weapon.rarity === rarity);
};

export const getArmorByTier = (characterClass: CharacterClass, rarity: 'epic' | 'legendary' | 'ultimate'): Item[] => {
  return getClassArmor(characterClass).filter(armor => armor.rarity === rarity);
};

export const getAccessoriesByTier = (rarity: 'epic' | 'legendary' | 'ultimate'): Item[] => {
  return MASTER_ACCESSORIES.filter(accessory => accessory.rarity === rarity);
};

// GET EQUIPMENT BY TYPE
export const getAccessoriesByType = (type: 'ring' | 'necklace' | 'gloves' | 'boots' | 'helmet'): Item[] => {
  return MASTER_ACCESSORIES.filter(accessory => accessory.type === type);
};

// ENHANCED LOOT GENERATION WITH NEW EQUIPMENT
export const generateEnhancedLoot = (
  level: number, 
  isBoss: boolean = false, 
  characterClass?: CharacterClass,
  difficulty: 'normal' | 'difficult' | 'impossible' = 'normal'
): Item[] => {
  const loot: Item[] = [];
  
  // Difficulty modifiers
  const difficultyMultiplier = difficulty === 'normal' ? 1 : difficulty === 'difficult' ? 1.5 : 2;
  const baseDropChance = (isBoss ? 0.8 : 0.3) * difficultyMultiplier;
  
  // Always drop consumables (higher chance for higher levels)
  if (Math.random() < Math.min(baseDropChance * 2, 0.9)) {
    const consumableIndex = Math.min(
      Math.floor((level / 100) * MASTER_CONSUMABLES.length), 
      MASTER_CONSUMABLES.length - 1
    );
    const consumable = MASTER_CONSUMABLES[consumableIndex];
    loot.push({ ...consumable, id: `${consumable.id}_${Date.now()}_${Math.random()}` });
  }
  
  // Equipment drops based on level
  if (Math.random() < baseDropChance) {
    const dropWeapon = Math.random() < 0.4;
    const dropArmor = Math.random() < 0.4;
    const dropAccessory = Math.random() < 0.3;
    
    if (dropWeapon && characterClass) {
      const weapons = getClassWeapons(characterClass);
      const tierIndex = Math.min(Math.floor(level / 25), 2); // 0=epic, 1=legendary, 2=ultimate
      const tierWeapons = weapons.filter(w => {
        if (tierIndex === 0) return w.rarity === 'epic';
        if (tierIndex === 1) return w.rarity === 'legendary';
        return w.rarity === 'ultimate';
      });
      
      if (tierWeapons.length > 0) {
        const weapon = tierWeapons[Math.floor(Math.random() * tierWeapons.length)];
        loot.push({ ...weapon, id: `${weapon.id}_${Date.now()}_${Math.random()}` });
      }
    }
    
    if (dropArmor && characterClass) {
      const armors = getClassArmor(characterClass);
      const tierIndex = Math.min(Math.floor(level / 25), 2);
      const tierArmors = armors.filter(a => {
        if (tierIndex === 0) return a.rarity === 'epic';
        if (tierIndex === 1) return a.rarity === 'legendary';
        return a.rarity === 'ultimate';
      });
      
      if (tierArmors.length > 0) {
        const armor = tierArmors[Math.floor(Math.random() * tierArmors.length)];
        loot.push({ ...armor, id: `${armor.id}_${Date.now()}_${Math.random()}` });
      }
    }
    
    if (dropAccessory) {
      const tierIndex = Math.min(Math.floor(level / 30), 2);
      const tierAccessories = MASTER_ACCESSORIES.filter(a => {
        if (tierIndex === 0) return a.rarity === 'epic';
        if (tierIndex === 1) return a.rarity === 'legendary';
        return a.rarity === 'ultimate';
      });
      
      if (tierAccessories.length > 0) {
        const accessory = tierAccessories[Math.floor(Math.random() * tierAccessories.length)];
        loot.push({ ...accessory, id: `${accessory.id}_${Date.now()}_${Math.random()}` });
      }
    }
  }
  
  // Boss guaranteed ultimate drops for high levels
  if (isBoss && level >= 50) {
    const ultimateDropChance = Math.min((level - 50) / 50, 1); // 0% at level 50, 100% at level 100
    
    if (Math.random() < ultimateDropChance) {
      const allUltimateItems = [
        ...Object.values(MASTER_WEAPONS).flat().filter(w => w.rarity === 'ultimate'),
        ...Object.values(MASTER_ARMOR).flat().filter(a => a.rarity === 'ultimate'),
        ...MASTER_ACCESSORIES.filter(a => a.rarity === 'ultimate')
      ];
      
      if (allUltimateItems.length > 0) {
        const ultimateItem = allUltimateItems[Math.floor(Math.random() * allUltimateItems.length)];
        loot.push({ ...ultimateItem, id: `${ultimateItem.id}_${Date.now()}_${Math.random()}` });
      }
    }
  }
  
  // Material drops
  if (Math.random() < baseDropChance * 0.5) {
    const materialTier = level < 30 ? 0 : level < 70 ? 1 : 2;
    const materialsInTier = MASTER_MATERIALS.filter(m => {
      if (materialTier === 0) return m.rarity === 'epic';
      if (materialTier === 1) return m.rarity === 'legendary';
      return m.rarity === 'ultimate';
    });
    
    if (materialsInTier.length > 0) {
      const material = materialsInTier[Math.floor(Math.random() * materialsInTier.length)];
      loot.push({ 
        ...material, 
        id: `${material.id}_${Date.now()}_${Math.random()}`,
        quantity: Math.floor(Math.random() * 3) + 1 
      });
    }
  }
  
  return loot;
};

// EQUIPMENT PROGRESSION SYSTEM
export const getRecommendedEquipmentForLevel = (characterClass: CharacterClass, playerLevel: number) => {
  const recommendations = {
    weapons: [] as Item[],
    armor: [] as Item[],
    accessories: [] as Item[]
  };
  
  // Recommend equipment based on player level
  const tierIndex = Math.min(Math.floor(playerLevel / 25), 2);
  const rarityTiers: Array<'epic' | 'legendary' | 'ultimate'> = ['epic', 'legendary', 'ultimate'];
  const targetRarity = rarityTiers[tierIndex];
  
  recommendations.weapons = getWeaponsByTier(characterClass, targetRarity).slice(0, 3);
  recommendations.armor = getArmorByTier(characterClass, targetRarity).slice(0, 3);
  recommendations.accessories = getAccessoriesByTier(targetRarity).slice(0, 5);
  
  return recommendations;
};

// EQUIPMENT COMPARISON SYSTEM
export const compareEquipment = (item1: Item, item2: Item): number => {
  let score1 = 0;
  let score2 = 0;
  
  // Base stats
  score1 += (item1.damage || 0) + (item1.defense || 0);
  score2 += (item2.damage || 0) + (item2.defense || 0);
  
  // Stat bonuses
  if (item1.stats) {
    score1 += Object.values(item1.stats).reduce((sum, val) => sum + val, 0);
  }
  if (item2.stats) {
    score2 += Object.values(item2.stats).reduce((sum, val) => sum + val, 0);
  }
  
  // Rarity bonus
  const rarityValues = { epic: 1, legendary: 2, ultimate: 3 };
  score1 += rarityValues[item1.rarity] * 10;
  score2 += rarityValues[item2.rarity] * 10;
  
  return score2 - score1; // Higher score first
};

// EQUIPMENT SETS SYSTEM (Future expansion)
export const EQUIPMENT_SETS = {
  dragonborn: {
    name: 'Dragonborn Set',
    pieces: ['dragon_scale_armor', 'dragon_helmet', 'dragon_scale_gloves', 'dragon_scale_boots'],
    setBonuses: {
      2: { strength: 10, magic: 10 },
      3: { strength: 20, magic: 20, vitality: 15 },
      4: { strength: 35, magic: 35, vitality: 25, defense: 20 }
    }
  },
  voidwalker: {
    name: 'Voidwalker Set',
    pieces: ['void_shroud', 'void_helmet', 'void_gauntlets', 'void_boots'],
    setBonuses: {
      2: { agility: 10, magic: 15 },
      3: { agility: 20, magic: 25, luck: 15 },
      4: { agility: 35, magic: 40, luck: 25, intelligence: 20 }
    }
  },
  infinity: {
    name: 'Infinity Set',
    pieces: ['infinity_armor', 'infinity_crown', 'infinity_gloves', 'infinity_boots'],
    setBonuses: {
      2: { strength: 15, agility: 15, intelligence: 15 },
      3: { strength: 25, agility: 25, intelligence: 25, vitality: 20 },
      4: { strength: 40, agility: 40, intelligence: 40, vitality: 35, magic: 35, luck: 30, defense: 30 }
    }
  }
};

export {
  EXPANDED_WEAPONS,
  EXPANDED_ARMOR,
  ACCESSORIES,
  EXPANDED_CONSUMABLES,
  CRAFTING_MATERIALS
};