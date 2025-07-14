import { Item, CharacterClass } from '../types/game';

// MASSIVE ARMOR EXPANSION - 12+ armor pieces per class
export const EXPANDED_ARMOR: Record<CharacterClass, Item[]> = {
  samurai: [
    // Tier 1 - Basic Armor
    {
      id: 'armor_cloth',
      name: 'Cloth Gi',
      type: 'armor',
      rarity: 'epic',
      defense: 8,
      stats: { agility: 3 },
      description: 'Traditional training garments',
      characterClass: 'samurai'
    },
    {
      id: 'armor_leather',
      name: 'Leather Hakama',
      type: 'armor',
      rarity: 'epic',
      defense: 15,
      stats: { vitality: 5, defense: 5 },
      description: 'Reinforced leather armor',
      characterClass: 'samurai'
    },
    {
      id: 'armor_lamellar',
      name: 'Lamellar Armor',
      type: 'armor',
      rarity: 'epic',
      defense: 22,
      stats: { defense: 8, vitality: 8 },
      description: 'Traditional layered armor',
      characterClass: 'samurai'
    },
    // Tier 2 - Enhanced Armor
    {
      id: 'armor_do_maru',
      name: 'Do-Maru Armor',
      type: 'armor',
      rarity: 'legendary',
      defense: 35,
      stats: { defense: 12, vitality: 15, strength: 5 },
      description: 'Classical samurai body armor',
      characterClass: 'samurai'
    },
    {
      id: 'armor_cyber_suit',
      name: 'Cyber Samurai Suit',
      type: 'armor',
      rarity: 'legendary',
      defense: 40,
      stats: { defense: 15, intelligence: 8, vitality: 12 },
      description: 'Traditional armor enhanced with cyber tech',
      characterClass: 'samurai'
    },
    {
      id: 'armor_steel_plates',
      name: 'Steel Plate Armor',
      type: 'armor',
      rarity: 'legendary',
      defense: 45,
      stats: { defense: 18, vitality: 18, strength: 8 },
      description: 'Heavy steel plating for maximum protection',
      characterClass: 'samurai'
    },
    {
      id: 'armor_storm_mail',
      name: 'Storm Mail',
      type: 'armor',
      rarity: 'legendary',
      defense: 42,
      stats: { defense: 15, magic: 12, vitality: 15 },
      description: 'Chainmail crackling with electricity',
      characterClass: 'samurai'
    },
    // Tier 3 - Legendary Armor
    {
      id: 'armor_dragon_scale',
      name: 'Dragon Scale Armor',
      type: 'armor',
      rarity: 'ultimate',
      defense: 65,
      stats: { defense: 25, vitality: 25, strength: 15, magic: 10 },
      description: 'Armor forged from dragon scales',
      characterClass: 'samurai'
    },
    {
      id: 'armor_void_plate',
      name: 'Void Plate Armor',
      type: 'armor',
      rarity: 'ultimate',
      defense: 75,
      stats: { defense: 30, vitality: 30, magic: 20, luck: 10 },
      description: 'Armor that exists between dimensions',
      characterClass: 'samurai'
    },
    {
      id: 'armor_cyber_demon',
      name: 'Cyber Demon Armor',
      type: 'armor',
      rarity: 'ultimate',
      defense: 85,
      stats: { defense: 35, strength: 20, magic: 25, intelligence: 15 },
      description: 'Armor possessed by a digital demon',
      characterClass: 'samurai'
    },
    {
      id: 'armor_quantum_mail',
      name: 'Quantum Mail',
      type: 'armor',
      rarity: 'ultimate',
      defense: 95,
      stats: { defense: 40, vitality: 35, magic: 30, agility: 15 },
      description: 'Armor that phases through attacks',
      characterClass: 'samurai'
    },
    // Tier 4 - Ultimate Armor
    {
      id: 'armor_infinity_plate',
      name: 'Infinity Plate',
      type: 'armor',
      rarity: 'ultimate',
      defense: 120,
      stats: { defense: 50, vitality: 45, strength: 25, magic: 25 },
      description: 'Armor with unlimited defensive power',
      characterClass: 'samurai'
    },
    {
      id: 'armor_genesis_suit',
      name: 'Genesis Armor',
      type: 'armor',
      rarity: 'ultimate',
      defense: 150,
      stats: { defense: 60, vitality: 55, strength: 30, intelligence: 25 },
      description: 'The first armor ever created',
      characterClass: 'samurai'
    },
    {
      id: 'armor_absolute_zero',
      name: 'Absolute Zero Armor',
      type: 'armor',
      rarity: 'ultimate',
      defense: 200,
      stats: { defense: 80, vitality: 70, magic: 50, luck: 40 },
      description: 'Armor that freezes time itself',
      characterClass: 'samurai'
    }
  ],
  ninja: [
    // Tier 1 - Basic Armor
    {
      id: 'armor_ninja_garb',
      name: 'Ninja Garb',
      type: 'armor',
      rarity: 'epic',
      defense: 5,
      stats: { agility: 8, luck: 5 },
      description: 'Traditional stealth clothing',
      characterClass: 'ninja'
    },
    {
      id: 'armor_shadow_cloth',
      name: 'Shadow Cloth',
      type: 'armor',
      rarity: 'epic',
      defense: 8,
      stats: { agility: 10, luck: 8 },
      description: 'Cloth that bends with shadows',
      characterClass: 'ninja'
    },
    {
      id: 'armor_stealth_suit',
      name: 'Stealth Suit',
      type: 'armor',
      rarity: 'epic',
      defense: 12,
      stats: { agility: 12, intelligence: 5 },
      description: 'Modern stealth technology',
      characterClass: 'ninja'
    },
    // Tier 2 - Enhanced Armor
    {
      id: 'armor_shadow_cloak',
      name: 'Shadow Cloak',
      type: 'armor',
      rarity: 'legendary',
      defense: 20,
      stats: { agility: 15, luck: 12, intelligence: 8 },
      description: 'Clothing that manipulates light',
      characterClass: 'ninja'
    },
    {
      id: 'armor_phantom_suit',
      name: 'Phantom Suit',
      type: 'armor',
      rarity: 'legendary',
      defense: 25,
      stats: { agility: 18, luck: 15, magic: 10 },
      description: 'Suit that phases through attacks',
      characterClass: 'ninja'
    },
    {
      id: 'armor_cyber_ninja',
      name: 'Cyber Ninja Suit',
      type: 'armor',
      rarity: 'legendary',
      defense: 30,
      stats: { agility: 20, intelligence: 15, luck: 12 },
      description: 'High-tech ninja gear',
      characterClass: 'ninja'
    },
    {
      id: 'armor_smoke_weave',
      name: 'Smoke Weave',
      type: 'armor',
      rarity: 'legendary',
      defense: 28,
      stats: { agility: 22, magic: 12, luck: 15 },
      description: 'Armor woven from smoke itself',
      characterClass: 'ninja'
    },
    // Tier 3 - Legendary Armor
    {
      id: 'armor_void_shroud',
      name: 'Void Shroud',
      type: 'armor',
      rarity: 'ultimate',
      defense: 45,
      stats: { agility: 30, luck: 25, magic: 20, intelligence: 15 },
      description: 'Shroud woven from void energy',
      characterClass: 'ninja'
    },
    {
      id: 'armor_phantom_mail',
      name: 'Phantom Mail',
      type: 'armor',
      rarity: 'ultimate',
      defense: 55,
      stats: { agility: 35, luck: 30, magic: 25, vitality: 15 },
      description: 'Armor that exists between worlds',
      characterClass: 'ninja'
    },
    {
      id: 'armor_shadow_lord',
      name: 'Shadow Lord Garb',
      type: 'armor',
      rarity: 'ultimate',
      defense: 65,
      stats: { agility: 40, luck: 35, magic: 30, intelligence: 20 },
      description: 'Garb worn by masters of shadow',
      characterClass: 'ninja'
    },
    {
      id: 'armor_quantum_cloak',
      name: 'Quantum Cloak',
      type: 'armor',
      rarity: 'ultimate',
      defense: 75,
      stats: { agility: 45, luck: 40, magic: 35, intelligence: 25 },
      description: 'Cloak that exists in multiple dimensions',
      characterClass: 'ninja'
    },
    // Tier 4 - Ultimate Armor
    {
      id: 'armor_infinity_shadow',
      name: 'Infinity Shadow',
      type: 'armor',
      rarity: 'ultimate',
      defense: 100,
      stats: { agility: 55, luck: 50, magic: 45, intelligence: 35 },
      description: 'Armor with unlimited stealth power',
      characterClass: 'ninja'
    },
    {
      id: 'armor_genesis_shade',
      name: 'Genesis Shade',
      type: 'armor',
      rarity: 'ultimate',
      defense: 125,
      stats: { agility: 65, luck: 60, magic: 55, intelligence: 40 },
      description: 'The first shadow given form',
      characterClass: 'ninja'
    },
    {
      id: 'armor_absolute_void',
      name: 'Absolute Void Cloak',
      type: 'armor',
      rarity: 'ultimate',
      defense: 175,
      stats: { agility: 80, luck: 75, magic: 70, intelligence: 50 },
      description: 'Cloak that negates all existence',
      characterClass: 'ninja'
    }
  ],
  warrior: [
    // Tier 1 - Basic Armor
    {
      id: 'armor_leather_vest',
      name: 'Leather Vest',
      type: 'armor',
      rarity: 'epic',
      defense: 18,
      stats: { vitality: 8, defense: 5 },
      description: 'Sturdy leather protection',
      characterClass: 'warrior'
    },
    {
      id: 'armor_chain_mail',
      name: 'Chain Mail',
      type: 'armor',
      rarity: 'epic',
      defense: 25,
      stats: { defense: 12, vitality: 10 },
      description: 'Interlocked metal rings',
      characterClass: 'warrior'
    },
    {
      id: 'armor_scale_mail',
      name: 'Scale Mail',
      type: 'armor',
      rarity: 'epic',
      defense: 30,
      stats: { defense: 15, vitality: 12, strength: 5 },
      description: 'Overlapping metal scales',
      characterClass: 'warrior'
    },
    // Tier 2 - Enhanced Armor
    {
      id: 'armor_plate_basic',
      name: 'Steel Plate Armor',
      type: 'armor',
      rarity: 'legendary',
      defense: 50,
      stats: { defense: 25, vitality: 20, strength: 10 },
      description: 'Heavy steel armor for maximum protection',
      characterClass: 'warrior'
    },
    {
      id: 'armor_titan_plate',
      name: 'Titan Plate',
      type: 'armor',
      rarity: 'legendary',
      defense: 60,
      stats: { defense: 30, vitality: 25, strength: 15 },
      description: 'Armor worn by ancient titans',
      characterClass: 'warrior'
    },
    {
      id: 'armor_cyber_plate',
      name: 'Cyber Plate',
      type: 'armor',
      rarity: 'legendary',
      defense: 55,
      stats: { defense: 28, vitality: 22, intelligence: 12 },
      description: 'Plate armor enhanced with cybernetics',
      characterClass: 'warrior'
    },
    {
      id: 'armor_storm_plate',
      name: 'Storm Plate',
      type: 'armor',
      rarity: 'legendary',
      defense: 58,
      stats: { defense: 32, vitality: 25, magic: 15 },
      description: 'Plate armor crackling with electricity',
      characterClass: 'warrior'
    },
    // Tier 3 - Legendary Armor
    {
      id: 'armor_fortress_plate',
      name: 'Fortress Plate',
      type: 'armor',
      rarity: 'ultimate',
      defense: 85,
      stats: { defense: 45, vitality: 40, strength: 20, magic: 10 },
      description: 'Armor that turns you into a fortress',
      characterClass: 'warrior'
    },
    {
      id: 'armor_demon_plate',
      name: 'Demon Plate',
      type: 'armor',
      rarity: 'ultimate',
      defense: 95,
      stats: { defense: 50, vitality: 45, strength: 25, magic: 15 },
      description: 'Armor forged in the fires of hell',
      characterClass: 'warrior'
    },
    {
      id: 'armor_void_fortress',
      name: 'Void Fortress',
      type: 'armor',
      rarity: 'ultimate',
      defense: 105,
      stats: { defense: 55, vitality: 50, strength: 30, magic: 20 },
      description: 'Armor that exists in the void',
      characterClass: 'warrior'
    },
    {
      id: 'armor_quantum_plate',
      name: 'Quantum Plate',
      type: 'armor',
      rarity: 'ultimate',
      defense: 115,
      stats: { defense: 60, vitality: 55, strength: 35, intelligence: 25 },
      description: 'Armor that phases between dimensions',
      characterClass: 'warrior'
    },
    // Tier 4 - Ultimate Armor
    {
      id: 'armor_infinity_fortress',
      name: 'Infinity Fortress',
      type: 'armor',
      rarity: 'ultimate',
      defense: 140,
      stats: { defense: 75, vitality: 70, strength: 45, magic: 30 },
      description: 'Armor with unlimited defensive power',
      characterClass: 'warrior'
    },
    {
      id: 'armor_genesis_plate',
      name: 'Genesis Plate',
      type: 'armor',
      rarity: 'ultimate',
      defense: 170,
      stats: { defense: 90, vitality: 85, strength: 55, intelligence: 35 },
      description: 'The first armor ever forged',
      characterClass: 'warrior'
    },
    {
      id: 'armor_absolute_fortress',
      name: 'Absolute Fortress',
      type: 'armor',
      rarity: 'ultimate',
      defense: 220,
      stats: { defense: 120, vitality: 110, strength: 70, magic: 50 },
      description: 'Armor that protects against everything',
      characterClass: 'warrior'
    }
  ],
  hunter: [
    // Tier 1 - Basic Armor
    {
      id: 'armor_leather_coat',
      name: 'Leather Coat',
      type: 'armor',
      rarity: 'epic',
      defense: 10,
      stats: { agility: 8, luck: 5 },
      description: 'Flexible leather for mobility',
      characterClass: 'hunter'
    },
    {
      id: 'armor_studded_leather',
      name: 'Studded Leather',
      type: 'armor',
      rarity: 'epic',
      defense: 15,
      stats: { agility: 10, defense: 8 },
      description: 'Reinforced leather with metal studs',
      characterClass: 'hunter'
    },
    {
      id: 'armor_ranger_vest',
      name: 'Ranger Vest',
      type: 'armor',
      rarity: 'epic',
      defense: 18,
      stats: { agility: 12, luck: 8, vitality: 5 },
      description: 'Practical gear for wilderness survival',
      characterClass: 'hunter'
    },
    // Tier 2 - Enhanced Armor
    {
      id: 'armor_ranger_gear',
      name: 'Elite Ranger Gear',
      type: 'armor',
      rarity: 'legendary',
      defense: 28,
      stats: { agility: 18, luck: 15, intelligence: 8 },
      description: 'Advanced gear for skilled hunters',
      characterClass: 'hunter'
    },
    {
      id: 'armor_tracker_suit',
      name: 'Tracker Suit',
      type: 'armor',
      rarity: 'legendary',
      defense: 32,
      stats: { agility: 20, luck: 18, intelligence: 12 },
      description: 'Suit with enhanced tracking abilities',
      characterClass: 'hunter'
    },
    {
      id: 'armor_cyber_hunter',
      name: 'Cyber Hunter Suit',
      type: 'armor',
      rarity: 'legendary',
      defense: 35,
      stats: { agility: 22, intelligence: 15, luck: 20 },
      description: 'High-tech hunting gear',
      characterClass: 'hunter'
    },
    {
      id: 'armor_beast_hide',
      name: 'Beast Hide Armor',
      type: 'armor',
      rarity: 'legendary',
      defense: 38,
      stats: { agility: 25, vitality: 18, strength: 10 },
      description: 'Armor made from dangerous beasts',
      characterClass: 'hunter'
    },
    // Tier 3 - Legendary Armor
    {
      id: 'armor_storm_cloak',
      name: 'Storm Cloak',
      type: 'armor',
      rarity: 'ultimate',
      defense: 55,
      stats: { agility: 30, luck: 28, magic: 20, intelligence: 15 },
      description: 'Cloak that channels storm energy',
      characterClass: 'hunter'
    },
    {
      id: 'armor_void_hunter',
      name: 'Void Hunter Gear',
      type: 'armor',
      rarity: 'ultimate',
      defense: 65,
      stats: { agility: 35, luck: 32, magic: 25, intelligence: 20 },
      description: 'Gear for hunting in the void',
      characterClass: 'hunter'
    },
    {
      id: 'armor_dragon_scale',
      name: 'Dragon Scale Coat',
      type: 'armor',
      rarity: 'ultimate',
      defense: 75,
      stats: { agility: 40, luck: 35, magic: 30, vitality: 20 },
      description: 'Coat made from dragon scales',
      characterClass: 'hunter'
    },
    {
      id: 'armor_quantum_suit',
      name: 'Quantum Hunter Suit',
      type: 'armor',
      rarity: 'ultimate',
      defense: 85,
      stats: { agility: 45, intelligence: 30, luck: 40, magic: 25 },
      description: 'Suit that exists in multiple dimensions',
      characterClass: 'hunter'
    },
    // Tier 4 - Ultimate Armor
    {
      id: 'armor_infinity_cloak',
      name: 'Infinity Cloak',
      type: 'armor',
      rarity: 'ultimate',
      defense: 110,
      stats: { agility: 55, luck: 50, magic: 40, intelligence: 35 },
      description: 'Cloak with unlimited mobility',
      characterClass: 'hunter'
    },
    {
      id: 'armor_genesis_hunter',
      name: 'Genesis Hunter Gear',
      type: 'armor',
      rarity: 'ultimate',
      defense: 135,
      stats: { agility: 65, luck: 60, intelligence: 45, magic: 35 },
      description: 'The first hunter\'s equipment',
      characterClass: 'hunter'
    },
    {
      id: 'armor_absolute_tracker',
      name: 'Absolute Tracker',
      type: 'armor',
      rarity: 'ultimate',
      defense: 180,
      stats: { agility: 80, luck: 75, intelligence: 60, magic: 50 },
      description: 'Armor that tracks everything',
      characterClass: 'hunter'
    }
  ],
  mage: [
    // Tier 1 - Basic Armor
    {
      id: 'armor_apprentice_robes',
      name: 'Apprentice Robes',
      type: 'armor',
      rarity: 'epic',
      defense: 5,
      stats: { intelligence: 8, magic: 12 },
      description: 'Simple robes for beginning mages',
      characterClass: 'mage'
    },
    {
      id: 'armor_scholar_robes',
      name: 'Scholar Robes',
      type: 'armor',
      rarity: 'epic',
      defense: 8,
      stats: { intelligence: 12, magic: 15 },
      description: 'Robes worn by magical scholars',
      characterClass: 'mage'
    },
    {
      id: 'armor_silk_robes',
      name: 'Silk Robes',
      type: 'armor',
      rarity: 'epic',
      defense: 12,
      stats: { intelligence: 15, magic: 18, luck: 5 },
      description: 'Luxurious silk robes',
      characterClass: 'mage'
    },
    // Tier 2 - Enhanced Armor
    {
      id: 'armor_mage_robes',
      name: 'Mage Robes',
      type: 'armor',
      rarity: 'legendary',
      defense: 20,
      stats: { intelligence: 20, magic: 25, vitality: 10 },
      description: 'Robes that amplify magical power',
      characterClass: 'mage'
    },
    {
      id: 'armor_arcane_vestments',
      name: 'Arcane Vestments',
      type: 'armor',
      rarity: 'legendary',
      defense: 25,
      stats: { intelligence: 25, magic: 30, luck: 15 },
      description: 'Vestments woven with arcane energy',
      characterClass: 'mage'
    },
    {
      id: 'armor_elemental_robes',
      name: 'Elemental Robes',
      type: 'armor',
      rarity: 'legendary',
      defense: 28,
      stats: { intelligence: 28, magic: 35, vitality: 12 },
      description: 'Robes attuned to all elements',
      characterClass: 'mage'
    },
    {
      id: 'armor_cyber_robes',
      name: 'Cyber Mage Robes',
      type: 'armor',
      rarity: 'legendary',
      defense: 30,
      stats: { intelligence: 30, magic: 32, agility: 15 },
      description: 'Robes enhanced with digital magic',
      characterClass: 'mage'
    },
    // Tier 3 - Legendary Armor
    {
      id: 'armor_cosmos_robes',
      name: 'Cosmos Robes',
      type: 'armor',
      rarity: 'ultimate',
      defense: 45,
      stats: { intelligence: 40, magic: 50, luck: 25, vitality: 20 },
      description: 'Robes that contain the power of stars',
      characterClass: 'mage'
    },
    {
      id: 'armor_void_vestments',
      name: 'Void Vestments',
      type: 'armor',
      rarity: 'ultimate',
      defense: 55,
      stats: { intelligence: 45, magic: 55, luck: 30, defense: 20 },
      description: 'Vestments woven from void energy',
      characterClass: 'mage'
    },
    {
      id: 'armor_archmage_robes',
      name: 'Archmage Robes',
      type: 'armor',
      rarity: 'ultimate',
      defense: 65,
      stats: { intelligence: 50, magic: 60, luck: 35, vitality: 25 },
      description: 'Robes worn by the greatest mages',
      characterClass: 'mage'
    },
    {
      id: 'armor_quantum_robes',
      name: 'Quantum Robes',
      type: 'armor',
      rarity: 'ultimate',
      defense: 75,
      stats: { intelligence: 55, magic: 65, agility: 25, luck: 40 },
      description: 'Robes that exist in multiple dimensions',
      characterClass: 'mage'
    },
    // Tier 4 - Ultimate Armor
    {
      id: 'armor_infinity_robes',
      name: 'Infinity Robes',
      type: 'armor',
      rarity: 'ultimate',
      defense: 95,
      stats: { intelligence: 65, magic: 80, luck: 50, vitality: 35 },
      description: 'Robes with unlimited magical power',
      characterClass: 'mage'
    },
    {
      id: 'armor_genesis_vestments',
      name: 'Genesis Vestments',
      type: 'armor',
      rarity: 'ultimate',
      defense: 120,
      stats: { intelligence: 75, magic: 95, luck: 60, vitality: 45 },
      description: 'The first magical garments',
      characterClass: 'mage'
    },
    {
      id: 'armor_absolute_robes',
      name: 'Absolute Arcane Robes',
      type: 'armor',
      rarity: 'ultimate',
      defense: 160,
      stats: { intelligence: 90, magic: 120, luck: 75, vitality: 60 },
      description: 'Robes that contain all magical knowledge',
      characterClass: 'mage'
    }
  ],
  necromancer: [
    // Tier 1 - Basic Armor
    {
      id: 'armor_dark_robes',
      name: 'Dark Robes',
      type: 'armor',
      rarity: 'epic',
      defense: 8,
      stats: { intelligence: 10, magic: 15 },
      description: 'Robes stained with dark magic',
      characterClass: 'necromancer'
    },
    {
      id: 'armor_bone_mail',
      name: 'Bone Mail',
      type: 'armor',
      rarity: 'epic',
      defense: 15,
      stats: { intelligence: 12, magic: 18, vitality: 8 },
      description: 'Armor made from cursed bones',
      characterClass: 'necromancer'
    },
    {
      id: 'armor_shadow_garb',
      name: 'Shadow Garb',
      type: 'armor',
      rarity: 'epic',
      defense: 12,
      stats: { intelligence: 15, magic: 20, luck: 8 },
      description: 'Garments woven from shadows',
      characterClass: 'necromancer'
    },
    // Tier 2 - Enhanced Armor
    {
      id: 'armor_death_robes',
      name: 'Death Robes',
      type: 'armor',
      rarity: 'legendary',
      defense: 25,
      stats: { intelligence: 20, magic: 28, vitality: 15 },
      description: 'Robes that command death',
      characterClass: 'necromancer'
    },
    {
      id: 'armor_lich_vestments',
      name: 'Lich Vestments',
      type: 'armor',
      rarity: 'legendary',
      defense: 30,
      stats: { intelligence: 25, magic: 32, luck: 18 },
      description: 'Vestments of an ancient lich',
      characterClass: 'necromancer'
    },
    {
      id: 'armor_cursed_plate',
      name: 'Cursed Plate',
      type: 'armor',
      rarity: 'legendary',
      defense: 35,
      stats: { intelligence: 22, magic: 30, defense: 20 },
      description: 'Armor cursed by dark magic',
      characterClass: 'necromancer'
    },
    {
      id: 'armor_soul_mail',
      name: 'Soul Mail',
      type: 'armor',
      rarity: 'legendary',
      defense: 32,
      stats: { intelligence: 28, magic: 35, vitality: 18 },
      description: 'Armor woven from captured souls',
      characterClass: 'necromancer'
    },
    // Tier 3 - Legendary Armor
    {
      id: 'armor_soul_shroud',
      name: 'Soul Shroud',
      type: 'armor',
      rarity: 'ultimate',
      defense: 50,
      stats: { intelligence: 35, magic: 45, luck: 30, vitality: 25 },
      description: 'Shroud woven from countless souls',
      characterClass: 'necromancer'
    },
    {
      id: 'armor_void_robes',
      name: 'Void Robes',
      type: 'armor',
      rarity: 'ultimate',
      defense: 60,
      stats: { intelligence: 40, magic: 50, luck: 35, defense: 25 },
      description: 'Robes that exist in the void',
      characterClass: 'necromancer'
    },
    {
      id: 'armor_death_lord',
      name: 'Death Lord Armor',
      type: 'armor',
      rarity: 'ultimate',
      defense: 70,
      stats: { intelligence: 45, magic: 55, vitality: 30, defense: 30 },
      description: 'Armor worn by lords of death',
      characterClass: 'necromancer'
    },
    {
      id: 'armor_quantum_shroud',
      name: 'Quantum Shroud',
      type: 'armor',
      rarity: 'ultimate',
      defense: 80,
      stats: { intelligence: 50, magic: 60, luck: 40, agility: 25 },
      description: 'Shroud that exists in multiple dimensions',
      characterClass: 'necromancer'
    },
    // Tier 4 - Ultimate Armor
    {
      id: 'armor_infinity_shroud',
      name: 'Infinity Shroud',
      type: 'armor',
      rarity: 'ultimate',
      defense: 105,
      stats: { intelligence: 60, magic: 75, luck: 50, vitality: 40 },
      description: 'Shroud with unlimited dark power',
      characterClass: 'necromancer'
    },
    {
      id: 'armor_genesis_death',
      name: 'Genesis Death Robes',
      type: 'armor',
      rarity: 'ultimate',
      defense: 130,
      stats: { intelligence: 70, magic: 90, luck: 60, defense: 45 },
      description: 'The first death magic garments',
      characterClass: 'necromancer'
    },
    {
      id: 'armor_absolute_void',
      name: 'Absolute Void Shroud',
      type: 'armor',
      rarity: 'ultimate',
      defense: 170,
      stats: { intelligence: 85, magic: 110, luck: 75, vitality: 55 },
      description: 'Shroud that commands absolute death',
      characterClass: 'necromancer'
    }
  ],
  druid: [
    // Tier 1 - Basic Armor
    {
      id: 'armor_nature_garb',
      name: 'Nature Garb',
      type: 'armor',
      rarity: 'epic',
      defense: 12,
      stats: { vitality: 10, magic: 12 },
      description: 'Clothing made from living plants',
      characterClass: 'druid'
    },
    {
      id: 'armor_bark_armor',
      name: 'Bark Armor',
      type: 'armor',
      rarity: 'epic',
      defense: 18,
      stats: { vitality: 15, defense: 10, magic: 8 },
      description: 'Armor grown from tree bark',
      characterClass: 'druid'
    },
    {
      id: 'armor_leaf_mail',
      name: 'Leaf Mail',
      type: 'armor',
      rarity: 'epic',
      defense: 15,
      stats: { vitality: 12, magic: 15, agility: 8 },
      description: 'Armor woven from enchanted leaves',
      characterClass: 'druid'
    },
    // Tier 2 - Enhanced Armor
    {
      id: 'armor_beast_hide',
      name: 'Primal Beast Hide',
      type: 'armor',
      rarity: 'legendary',
      defense: 35,
      stats: { vitality: 25, magic: 20, strength: 15 },
      description: 'Hide from an ancient beast',
      characterClass: 'druid'
    },
    {
      id: 'armor_stone_skin',
      name: 'Stone Skin Armor',
      type: 'armor',
      rarity: 'legendary',
      defense: 40,
      stats: { vitality: 30, defense: 25, magic: 18 },
      description: 'Armor as hard as stone',
      characterClass: 'druid'
    },
    {
      id: 'armor_storm_hide',
      name: 'Storm Hide',
      type: 'armor',
      rarity: 'legendary',
      defense: 38,
      stats: { vitality: 28, magic: 25, agility: 15 },
      description: 'Hide crackling with storm energy',
      characterClass: 'druid'
    },
    {
      id: 'armor_growth_armor',
      name: 'Living Growth Armor',
      type: 'armor',
      rarity: 'legendary',
      defense: 42,
      stats: { vitality: 32, magic: 28, intelligence: 12 },
      description: 'Armor that grows and adapts',
      characterClass: 'druid'
    },
    // Tier 3 - Legendary Armor
    {
      id: 'armor_world_bark',
      name: 'World Tree Bark',
      type: 'armor',
      rarity: 'ultimate',
      defense: 65,
      stats: { vitality: 45, magic: 40, intelligence: 25, defense: 20 },
      description: 'Bark from the world tree itself',
      characterClass: 'druid'
    },
    {
      id: 'armor_elemental_hide',
      name: 'Elemental Hide',
      type: 'armor',
      rarity: 'ultimate',
      defense: 75,
      stats: { vitality: 50, magic: 45, strength: 25, agility: 20 },
      description: 'Hide infused with all elements',
      characterClass: 'druid'
    },
    {
      id: 'armor_ancient_grove',
      name: 'Ancient Grove Armor',
      type: 'armor',
      rarity: 'ultimate',
      defense: 85,
      stats: { vitality: 55, magic: 50, intelligence: 30, defense: 25 },
      description: 'Armor from the first forest',
      characterClass: 'druid'
    },
    {
      id: 'armor_quantum_nature',
      name: 'Quantum Nature Armor',
      type: 'armor',
      rarity: 'ultimate',
      defense: 95,
      stats: { vitality: 60, magic: 55, intelligence: 35, luck: 30 },
      description: 'Armor that exists in all natural states',
      characterClass: 'druid'
    },
    // Tier 4 - Ultimate Armor
    {
      id: 'armor_infinity_grove',
      name: 'Infinity Grove',
      type: 'armor',
      rarity: 'ultimate',
      defense: 120,
      stats: { vitality: 75, magic: 70, intelligence: 45, defense: 40 },
      description: 'Armor with unlimited natural power',
      characterClass: 'druid'
    },
    {
      id: 'armor_genesis_nature',
      name: 'Genesis Nature Armor',
      type: 'armor',
      rarity: 'ultimate',
      defense: 145,
      stats: { vitality: 90, magic: 85, intelligence: 55, strength: 35 },
      description: 'The first natural armor',
      characterClass: 'druid'
    },
    {
      id: 'armor_absolute_nature',
      name: 'Absolute Nature Armor',
      type: 'armor',
      rarity: 'ultimate',
      defense: 190,
      stats: { vitality: 110, magic: 105, intelligence: 70, defense: 60 },
      description: 'Armor that commands all of nature',
      characterClass: 'druid'
    }
  ]
};

export default EXPANDED_ARMOR;