import { Item, CharacterClass } from '../types/game';
import { 
  MASTER_WEAPONS, 
  MASTER_ARMOR, 
  MASTER_ACCESSORIES, 
  MASTER_CONSUMABLES 
} from './masterEquipment';

export interface ShopItem extends Item {
  price: number;
  stock: number;
  levelRequirement: number;
  category: 'weapon' | 'armor' | 'accessory' | 'consumable' | 'material';
}

// PRICING FORMULAS BASED ON RARITY AND LEVEL
const getPriceByRarity = (rarity: string, basePrice: number): number => {
  switch (rarity) {
    case 'epic': return basePrice;
    case 'legendary': return basePrice * 2.5;
    case 'ultimate': return basePrice * 5;
    default: return basePrice;
  }
};

const getPriceByDamageDefense = (damage?: number, defense?: number): number => {
  const baseDamage = damage || 0;
  const baseDefense = defense || 0;
  return (baseDamage * 10) + (baseDefense * 8);
};

// CONVERT EQUIPMENT TO SHOP ITEMS
const convertToShopItems = (items: Item[], category: ShopItem['category']): ShopItem[] => {
  return items.map((item, index) => {
    const basePrice = getPriceByDamageDefense(item.damage, item.defense) || 50;
    const rarityPrice = getPriceByRarity(item.rarity, basePrice);
    const levelReq = Math.floor(index / 3) + 1; // Every 3 items increase level req
    
    return {
      ...item,
      price: Math.max(10, rarityPrice),
      stock: item.rarity === 'ultimate' ? 1 : item.rarity === 'legendary' ? 3 : 5,
      levelRequirement: Math.min(levelReq, 50),
      category
    };
  });
};

// SHOP CATEGORIES
export const SHOP_WEAPONS: Record<CharacterClass, ShopItem[]> = {
  samurai: convertToShopItems(MASTER_WEAPONS.samurai, 'weapon'),
  ninja: convertToShopItems(MASTER_WEAPONS.ninja, 'weapon'),
  warrior: convertToShopItems(MASTER_WEAPONS.warrior, 'weapon'),
  hunter: convertToShopItems(MASTER_WEAPONS.hunter, 'weapon'),
  mage: convertToShopItems(MASTER_WEAPONS.mage, 'weapon'),
  necromancer: convertToShopItems(MASTER_WEAPONS.necromancer, 'weapon'),
  druid: convertToShopItems(MASTER_WEAPONS.druid, 'weapon')
};

export const SHOP_ARMOR: Record<CharacterClass, ShopItem[]> = {
  samurai: convertToShopItems(MASTER_ARMOR.samurai, 'armor'),
  ninja: convertToShopItems(MASTER_ARMOR.ninja, 'armor'),
  warrior: convertToShopItems(MASTER_ARMOR.warrior, 'armor'),
  hunter: convertToShopItems(MASTER_ARMOR.hunter, 'armor'),
  mage: convertToShopItems(MASTER_ARMOR.mage, 'armor'),
  necromancer: convertToShopItems(MASTER_ARMOR.necromancer, 'armor'),
  druid: convertToShopItems(MASTER_ARMOR.druid, 'armor')
};

export const SHOP_ACCESSORIES: ShopItem[] = convertToShopItems(MASTER_ACCESSORIES, 'accessory');

export const SHOP_CONSUMABLES: ShopItem[] = MASTER_CONSUMABLES.map((item, index) => ({
  ...item,
  price: item.rarity === 'epic' ? 25 : item.rarity === 'legendary' ? 75 : 150,
  stock: 10,
  levelRequirement: Math.floor(index / 5) + 1,
  category: 'consumable' as const
}));

// SPECIAL SHOP SECTIONS
export const SHOP_DAILY_DEALS: ShopItem[] = [
  {
    id: 'daily_weapon',
    name: 'Daily Weapon Deal',
    type: 'weapon',
    rarity: 'legendary',
    damage: 75,
    description: 'Today\'s special weapon offer',
    price: 200,
    stock: 1,
    levelRequirement: 10,
    category: 'weapon'
  },
  {
    id: 'daily_armor',
    name: 'Daily Armor Deal',
    type: 'armor',
    rarity: 'legendary',
    defense: 60,
    description: 'Today\'s special armor offer',
    price: 180,
    stock: 1,
    levelRequirement: 10,
    category: 'armor'
  },
  {
    id: 'daily_consumable',
    name: 'Daily Consumable Bundle',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Bundle of premium consumables',
    price: 300,
    stock: 3,
    levelRequirement: 5,
    category: 'consumable'
  }
];

export const SHOP_PREMIUM_ITEMS: ShopItem[] = [
  {
    id: 'premium_credits',
    name: 'Credit Pack (500)',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Instantly gain 500 credits',
    price: 0, // Special item
    stock: 1,
    levelRequirement: 1,
    category: 'consumable'
  },
  {
    id: 'premium_exp',
    name: 'Experience Boost Pack',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Massive experience gain for 1 hour',
    price: 1000,
    stock: 1,
    levelRequirement: 20,
    category: 'consumable'
  },
  {
    id: 'premium_ultimate_bundle',
    name: 'Ultimate Equipment Bundle',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Random ultimate weapon + armor + accessory',
    price: 2500,
    stock: 1,
    levelRequirement: 30,
    category: 'consumable'
  }
];

// SHOP UTILITIES
export const getAvailableItems = (
  items: ShopItem[], 
  playerLevel: number, 
  characterClass?: CharacterClass
): ShopItem[] => {
  return items.filter(item => {
    const levelCheck = item.levelRequirement <= playerLevel;
    const classCheck = !item.characterClass || item.characterClass === characterClass;
    return levelCheck && classCheck;
  });
};

export const getItemsByCategory = (category: ShopItem['category']): ShopItem[] => {
  switch (category) {
    case 'weapon':
      return Object.values(SHOP_WEAPONS).flat();
    case 'armor':
      return Object.values(SHOP_ARMOR).flat();
    case 'accessory':
      return SHOP_ACCESSORIES;
    case 'consumable':
      return SHOP_CONSUMABLES;
    default:
      return [];
  }
};

export const searchItems = (query: string, items: ShopItem[]): ShopItem[] => {
  const searchTerm = query.toLowerCase();
  return items.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    item.rarity.toLowerCase().includes(searchTerm) ||
    item.type.toLowerCase().includes(searchTerm)
  );
};

export const sortItems = (items: ShopItem[], sortBy: 'name' | 'price' | 'rarity' | 'level'): ShopItem[] => {
  return [...items].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'rarity': {
        const rarityOrder = { epic: 1, legendary: 2, ultimate: 3 };
        return rarityOrder[a.rarity as keyof typeof rarityOrder] - rarityOrder[b.rarity as keyof typeof rarityOrder];
      }
      case 'level':
        return a.levelRequirement - b.levelRequirement;
      default:
        return 0;
    }
  });
};

// SHOP CONSTANTS
export const SHOP_CATEGORIES = [
  { id: 'weapons', name: '⚔️ Weapons', icon: '⚔️' },
  { id: 'armor', name: '🛡️ Armor', icon: '🛡️' },
  { id: 'accessories', name: '👑 Accessories', icon: '👑' },
  { id: 'consumables', name: '🧪 Consumables', icon: '🧪' },
  { id: 'daily', name: '⭐ Daily Deals', icon: '⭐' },
  { id: 'premium', name: '💎 Premium', icon: '💎' }
];

export const RARITY_MULTIPLIERS = {
  epic: 1,
  legendary: 2.5,
  ultimate: 5
};