import { Item } from '../types/game';

// ACCESSORIES AND SPECIAL ITEMS - Universal and class-specific
export const ACCESSORIES: Item[] = [
  // RINGS
  {
    id: 'ring_strength',
    name: 'Ring of Strength',
    type: 'ring',
    rarity: 'epic',
    stats: { strength: 8 },
    description: 'Increases physical power',
  },
  {
    id: 'ring_agility',
    name: 'Ring of Agility',
    type: 'ring',
    rarity: 'epic',
    stats: { agility: 8 },
    description: 'Increases speed and dexterity',
  },
  {
    id: 'ring_intelligence',
    name: 'Ring of Intelligence',
    type: 'ring',
    rarity: 'epic',
    stats: { intelligence: 8 },
    description: 'Increases mental acuity',
  },
  {
    id: 'ring_vitality',
    name: 'Ring of Vitality',
    type: 'ring',
    rarity: 'epic',
    stats: { vitality: 8 },
    description: 'Increases health and stamina',
  },
  {
    id: 'ring_magic',
    name: 'Ring of Magic',
    type: 'ring',
    rarity: 'epic',
    stats: { magic: 8 },
    description: 'Increases magical power',
  },
  {
    id: 'ring_luck',
    name: 'Ring of Luck',
    type: 'ring',
    rarity: 'epic',
    stats: { luck: 8 },
    description: 'Increases fortune and critical chance',
  },
  {
    id: 'ring_defense',
    name: 'Ring of Defense',
    type: 'ring',
    rarity: 'epic',
    stats: { defense: 8 },
    description: 'Increases damage resistance',
  },
  // LEGENDARY RINGS
  {
    id: 'ring_power',
    name: 'Ring of Power',
    type: 'ring',
    rarity: 'legendary',
    stats: { strength: 15, magic: 10 },
    description: 'Grants immense power',
  },
  {
    id: 'ring_speed',
    name: 'Ring of Speed',
    type: 'ring',
    rarity: 'legendary',
    stats: { agility: 15, luck: 10 },
    description: 'Grants incredible speed',
  },
  {
    id: 'ring_wisdom',
    name: 'Ring of Wisdom',
    type: 'ring',
    rarity: 'legendary',
    stats: { intelligence: 15, magic: 12 },
    description: 'Grants ancient wisdom',
  },
  {
    id: 'ring_life',
    name: 'Ring of Life',
    type: 'ring',
    rarity: 'legendary',
    stats: { vitality: 15, defense: 12 },
    description: 'Grants incredible vitality',
  },
  // ULTIMATE RINGS
  {
    id: 'ring_void',
    name: 'Void Ring',
    type: 'ring',
    rarity: 'ultimate',
    stats: { strength: 20, agility: 15, magic: 25 },
    description: 'Ring forged in the void',
  },
  {
    id: 'ring_dragon',
    name: 'Dragon Ring',
    type: 'ring',
    rarity: 'ultimate',
    stats: { strength: 25, vitality: 20, magic: 20 },
    description: 'Ring containing dragon essence',
  },
  {
    id: 'ring_chaos',
    name: 'Chaos Ring',
    type: 'ring',
    rarity: 'ultimate',
    stats: { luck: 30, magic: 25, intelligence: 20 },
    description: 'Ring of pure chaos energy',
  },
  {
    id: 'ring_infinity',
    name: 'Infinity Ring',
    type: 'ring',
    rarity: 'ultimate',
    stats: { strength: 30, agility: 25, intelligence: 25, vitality: 25, magic: 30, luck: 20, defense: 25 },
    description: 'Ring with unlimited power',
  },
  {
    id: 'ring_genesis',
    name: 'Genesis Ring',
    type: 'ring',
    rarity: 'ultimate',
    stats: { strength: 35, agility: 30, intelligence: 30, vitality: 30, magic: 35, luck: 25, defense: 30 },
    description: 'The first ring ever created',
  },
  {
    id: 'ring_absolute',
    name: 'Absolute Ring',
    type: 'ring',
    rarity: 'ultimate',
    stats: { strength: 50, agility: 45, intelligence: 45, vitality: 45, magic: 50, luck: 40, defense: 45 },
    description: 'Ring of absolute power',
  },
  
  // NECKLACES
  {
    id: 'necklace_health',
    name: 'Health Amulet',
    type: 'necklace',
    rarity: 'epic',
    stats: { vitality: 10 },
    description: 'Increases maximum health',
  },
  {
    id: 'necklace_mana',
    name: 'Mana Pendant',
    type: 'necklace',
    rarity: 'epic',
    stats: { magic: 10 },
    description: 'Increases maximum mana',
  },
  {
    id: 'necklace_warrior',
    name: 'Warrior\'s Pendant',
    type: 'necklace',
    rarity: 'legendary',
    stats: { strength: 12, vitality: 10, defense: 8 },
    description: 'Pendant worn by legendary warriors',
  },
  {
    id: 'necklace_mage',
    name: 'Arcane Amulet',
    type: 'necklace',
    rarity: 'legendary',
    stats: { intelligence: 12, magic: 15, luck: 8 },
    description: 'Amulet containing arcane power',
  },
  {
    id: 'necklace_shadow',
    name: 'Shadow Amulet',
    type: 'necklace',
    rarity: 'legendary',
    stats: { agility: 12, luck: 15, magic: 8 },
    description: 'Amulet that bends shadows',
  },
  {
    id: 'necklace_nature',
    name: 'Nature\'s Heart',
    type: 'necklace',
    rarity: 'legendary',
    stats: { vitality: 15, magic: 12, intelligence: 8 },
    description: 'Heart of the natural world',
  },
  {
    id: 'necklace_dragon',
    name: 'Dragon Heart Amulet',
    type: 'necklace',
    rarity: 'ultimate',
    stats: { strength: 25, vitality: 20, magic: 20, defense: 15 },
    description: 'Amulet containing a dragon\'s heart',
  },
  {
    id: 'necklace_void',
    name: 'Void Pendant',
    type: 'necklace',
    rarity: 'ultimate',
    stats: { intelligence: 25, magic: 30, luck: 20, agility: 15 },
    description: 'Pendant from the void dimension',
  },
  {
    id: 'necklace_infinity',
    name: 'Infinity Amulet',
    type: 'necklace',
    rarity: 'ultimate',
    stats: { strength: 30, agility: 25, intelligence: 30, vitality: 25, magic: 35, luck: 25, defense: 20 },
    description: 'Amulet with unlimited power',
  },
  {
    id: 'necklace_genesis',
    name: 'Genesis Pendant',
    type: 'necklace',
    rarity: 'ultimate',
    stats: { strength: 35, agility: 30, intelligence: 35, vitality: 30, magic: 40, luck: 30, defense: 25 },
    description: 'The first pendant ever made',
  },
  {
    id: 'necklace_absolute',
    name: 'Absolute Amulet',
    type: 'necklace',
    rarity: 'ultimate',
    stats: { strength: 50, agility: 45, intelligence: 50, vitality: 45, magic: 55, luck: 45, defense: 40 },
    description: 'Amulet of absolute power',
  },
  
  // GLOVES
  {
    id: 'gloves_leather',
    name: 'Leather Gloves',
    type: 'gloves',
    rarity: 'epic',
    stats: { agility: 5, defense: 3 },
    description: 'Basic leather protection',
  },
  {
    id: 'gloves_steel',
    name: 'Steel Gauntlets',
    type: 'gloves',
    rarity: 'epic',
    stats: { strength: 5, defense: 5 },
    description: 'Steel plated gloves',
  },
  {
    id: 'gloves_silk',
    name: 'Silk Gloves',
    type: 'gloves',
    rarity: 'epic',
    stats: { intelligence: 5, magic: 5 },
    description: 'Delicate silk gloves',
  },
  {
    id: 'gloves_shadow',
    name: 'Shadow Gloves',
    type: 'gloves',
    rarity: 'legendary',
    stats: { agility: 10, luck: 8, magic: 5 },
    description: 'Gloves woven from shadows',
  },
  {
    id: 'gloves_power',
    name: 'Power Gauntlets',
    type: 'gloves',
    rarity: 'legendary',
    stats: { strength: 12, defense: 8, vitality: 5 },
    description: 'Gauntlets that amplify strength',
  },
  {
    id: 'gloves_arcane',
    name: 'Arcane Gloves',
    type: 'gloves',
    rarity: 'legendary',
    stats: { intelligence: 12, magic: 10, luck: 5 },
    description: 'Gloves infused with arcane power',
  },
  {
    id: 'gloves_dragon',
    name: 'Dragon Scale Gloves',
    type: 'gloves',
    rarity: 'ultimate',
    stats: { strength: 15, defense: 12, magic: 10, vitality: 8 },
    description: 'Gloves made from dragon scales',
  },
  {
    id: 'gloves_void',
    name: 'Void Gauntlets',
    type: 'gloves',
    rarity: 'ultimate',
    stats: { agility: 15, magic: 15, luck: 12, intelligence: 10 },
    description: 'Gauntlets from the void dimension',
  },
  {
    id: 'gloves_infinity',
    name: 'Infinity Gloves',
    type: 'gloves',
    rarity: 'ultimate',
    stats: { strength: 20, agility: 15, intelligence: 15, vitality: 15, magic: 20, luck: 15, defense: 15 },
    description: 'Gloves with unlimited power',
  },
  {
    id: 'gloves_genesis',
    name: 'Genesis Gauntlets',
    type: 'gloves',
    rarity: 'ultimate',
    stats: { strength: 25, agility: 20, intelligence: 20, vitality: 20, magic: 25, luck: 20, defense: 20 },
    description: 'The first gloves ever made',
  },
  {
    id: 'gloves_absolute',
    name: 'Absolute Gauntlets',
    type: 'gloves',
    rarity: 'ultimate',
    stats: { strength: 35, agility: 30, intelligence: 30, vitality: 30, magic: 35, luck: 30, defense: 30 },
    description: 'Gauntlets of absolute power',
  },
  
  // BOOTS
  {
    id: 'boots_leather',
    name: 'Leather Boots',
    type: 'boots',
    rarity: 'epic',
    stats: { agility: 5, defense: 3 },
    description: 'Basic leather boots',
  },
  {
    id: 'boots_steel',
    name: 'Steel Boots',
    type: 'boots',
    rarity: 'epic',
    stats: { defense: 8, vitality: 5 },
    description: 'Heavy steel boots',
  },
  {
    id: 'boots_speed',
    name: 'Speed Boots',
    type: 'boots',
    rarity: 'legendary',
    stats: { agility: 12, luck: 8 },
    description: 'Boots that increase movement speed',
  },
  {
    id: 'boots_power',
    name: 'Power Boots',
    type: 'boots',
    rarity: 'legendary',
    stats: { strength: 10, defense: 10 },
    description: 'Boots that amplify strength',
  },
  {
    id: 'boots_magic',
    name: 'Magic Boots',
    type: 'boots',
    rarity: 'legendary',
    stats: { intelligence: 10, magic: 12 },
    description: 'Boots infused with magical energy',
  },
  {
    id: 'boots_shadow',
    name: 'Shadow Boots',
    type: 'boots',
    rarity: 'legendary',
    stats: { agility: 15, luck: 10, magic: 5 },
    description: 'Boots that silence footsteps',
  },
  {
    id: 'boots_dragon',
    name: 'Dragon Scale Boots',
    type: 'boots',
    rarity: 'ultimate',
    stats: { agility: 15, defense: 15, magic: 10, vitality: 10 },
    description: 'Boots made from dragon scales',
  },
  {
    id: 'boots_void',
    name: 'Void Boots',
    type: 'boots',
    rarity: 'ultimate',
    stats: { agility: 20, magic: 15, luck: 15, intelligence: 10 },
    description: 'Boots from the void dimension',
  },
  {
    id: 'boots_infinity',
    name: 'Infinity Boots',
    type: 'boots',
    rarity: 'ultimate',
    stats: { strength: 15, agility: 25, intelligence: 15, vitality: 15, magic: 15, luck: 20, defense: 15 },
    description: 'Boots with unlimited power',
  },
  {
    id: 'boots_genesis',
    name: 'Genesis Boots',
    type: 'boots',
    rarity: 'ultimate',
    stats: { strength: 20, agility: 30, intelligence: 20, vitality: 20, magic: 20, luck: 25, defense: 20 },
    description: 'The first boots ever made',
  },
  {
    id: 'boots_absolute',
    name: 'Absolute Boots',
    type: 'boots',
    rarity: 'ultimate',
    stats: { strength: 30, agility: 45, intelligence: 30, vitality: 30, magic: 30, luck: 35, defense: 30 },
    description: 'Boots of absolute power',
  },
  
  // HELMETS
  {
    id: 'helmet_leather',
    name: 'Leather Helmet',
    type: 'helmet',
    rarity: 'epic',
    stats: { defense: 8, vitality: 5 },
    description: 'Basic leather head protection',
  },
  {
    id: 'helmet_steel',
    name: 'Steel Helmet',
    type: 'helmet',
    rarity: 'epic',
    stats: { defense: 12, vitality: 8 },
    description: 'Sturdy steel helmet',
  },
  {
    id: 'helmet_mage',
    name: 'Mage Hat',
    type: 'helmet',
    rarity: 'epic',
    stats: { intelligence: 8, magic: 10 },
    description: 'Classic pointed hat',
  },
  {
    id: 'helmet_shadow',
    name: 'Shadow Hood',
    type: 'helmet',
    rarity: 'legendary',
    stats: { agility: 10, luck: 12, magic: 8 },
    description: 'Hood that conceals the wearer',
  },
  {
    id: 'helmet_warrior',
    name: 'War Helm',
    type: 'helmet',
    rarity: 'legendary',
    stats: { strength: 10, defense: 15, vitality: 10 },
    description: 'Helmet worn by legendary warriors',
  },
  {
    id: 'helmet_arcane',
    name: 'Arcane Crown',
    type: 'helmet',
    rarity: 'legendary',
    stats: { intelligence: 15, magic: 18, luck: 8 },
    description: 'Crown of magical power',
  },
  {
    id: 'helmet_dragon',
    name: 'Dragon Helmet',
    type: 'helmet',
    rarity: 'ultimate',
    stats: { strength: 15, defense: 20, magic: 15, vitality: 15 },
    description: 'Helmet crafted from dragon skull',
  },
  {
    id: 'helmet_void',
    name: 'Void Helmet',
    type: 'helmet',
    rarity: 'ultimate',
    stats: { intelligence: 20, magic: 20, luck: 15, agility: 10 },
    description: 'Helmet from the void dimension',
  },
  {
    id: 'helmet_infinity',
    name: 'Infinity Crown',
    type: 'helmet',
    rarity: 'ultimate',
    stats: { strength: 20, agility: 15, intelligence: 25, vitality: 20, magic: 25, luck: 20, defense: 20 },
    description: 'Crown with unlimited power',
  },
  {
    id: 'helmet_genesis',
    name: 'Genesis Helmet',
    type: 'helmet',
    rarity: 'ultimate',
    stats: { strength: 25, agility: 20, intelligence: 30, vitality: 25, magic: 30, luck: 25, defense: 25 },
    description: 'The first helmet ever made',
  },
  {
    id: 'helmet_absolute',
    name: 'Absolute Crown',
    type: 'helmet',
    rarity: 'ultimate',
    stats: { strength: 35, agility: 30, intelligence: 40, vitality: 35, magic: 40, luck: 35, defense: 35 },
    description: 'Crown of absolute power',
  }
];

// EXPANDED CONSUMABLES
export const EXPANDED_CONSUMABLES: Item[] = [
  // HEALTH POTIONS
  {
    id: 'health_tiny',
    name: 'Tiny Health Potion',
    type: 'consumable',
    rarity: 'epic',
    description: 'Restores 25 HP',
    quantity: 1
  },
  {
    id: 'health_small',
    name: 'Small Health Potion',
    type: 'consumable',
    rarity: 'epic',
    description: 'Restores 50 HP',
    quantity: 1
  },
  {
    id: 'health_medium',
    name: 'Health Potion',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Restores 100 HP',
    quantity: 1
  },
  {
    id: 'health_large',
    name: 'Greater Health Potion',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Restores 200 HP',
    quantity: 1
  },
  {
    id: 'health_supreme',
    name: 'Supreme Health Potion',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Restores 500 HP',
    quantity: 1
  },
  {
    id: 'health_ultimate',
    name: 'Ultimate Health Elixir',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Restores 1000 HP',
    quantity: 1
  },
  {
    id: 'health_full',
    name: 'Full Recovery Potion',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Restores all HP',
    quantity: 1
  },
  
  // MANA POTIONS
  {
    id: 'mana_tiny',
    name: 'Tiny Mana Potion',
    type: 'consumable',
    rarity: 'epic',
    description: 'Restores 15 MP',
    quantity: 1
  },
  {
    id: 'mana_small',
    name: 'Small Mana Potion',
    type: 'consumable',
    rarity: 'epic',
    description: 'Restores 30 MP',
    quantity: 1
  },
  {
    id: 'mana_medium',
    name: 'Mana Potion',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Restores 60 MP',
    quantity: 1
  },
  {
    id: 'mana_large',
    name: 'Greater Mana Potion',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Restores 120 MP',
    quantity: 1
  },
  {
    id: 'mana_supreme',
    name: 'Supreme Mana Potion',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Restores 250 MP',
    quantity: 1
  },
  {
    id: 'mana_ultimate',
    name: 'Ultimate Mana Elixir',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Restores 500 MP',
    quantity: 1
  },
  {
    id: 'mana_full',
    name: 'Full Mana Recovery',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Restores all MP',
    quantity: 1
  },
  
  // STAT BOOST POTIONS
  {
    id: 'stat_boost_str',
    name: 'Strength Enhancer',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Permanently increases Strength by 2',
    quantity: 1
  },
  {
    id: 'stat_boost_agi',
    name: 'Agility Enhancer',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Permanently increases Agility by 2',
    quantity: 1
  },
  {
    id: 'stat_boost_int',
    name: 'Intelligence Enhancer',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Permanently increases Intelligence by 2',
    quantity: 1
  },
  {
    id: 'stat_boost_vit',
    name: 'Vitality Enhancer',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Permanently increases Vitality by 2',
    quantity: 1
  },
  {
    id: 'stat_boost_def',
    name: 'Defense Enhancer',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Permanently increases Defense by 2',
    quantity: 1
  },
  {
    id: 'stat_boost_mag',
    name: 'Magic Enhancer',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Permanently increases Magic by 2',
    quantity: 1
  },
  {
    id: 'stat_boost_luck',
    name: 'Luck Enhancer',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Permanently increases Luck by 2',
    quantity: 1
  },
  
  // ULTIMATE STAT BOOSTERS
  {
    id: 'stat_boost_ultimate_str',
    name: 'Ultimate Strength Elixir',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Strength by 5',
    quantity: 1
  },
  {
    id: 'stat_boost_ultimate_agi',
    name: 'Ultimate Agility Elixir',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Agility by 5',
    quantity: 1
  },
  {
    id: 'stat_boost_ultimate_int',
    name: 'Ultimate Intelligence Elixir',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Intelligence by 5',
    quantity: 1
  },
  {
    id: 'stat_boost_ultimate_vit',
    name: 'Ultimate Vitality Elixir',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Vitality by 5',
    quantity: 1
  },
  {
    id: 'stat_boost_ultimate_def',
    name: 'Ultimate Defense Elixir',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Defense by 5',
    quantity: 1
  },
  {
    id: 'stat_boost_ultimate_mag',
    name: 'Ultimate Magic Elixir',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Magic by 5',
    quantity: 1
  },
  {
    id: 'stat_boost_ultimate_luck',
    name: 'Ultimate Luck Elixir',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Luck by 5',
    quantity: 1
  },
  
  // SPECIAL CONSUMABLES
  {
    id: 'exp_boost_small',
    name: 'Experience Booster',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Doubles experience gain for 10 minutes',
    quantity: 1
  },
  {
    id: 'exp_boost_large',
    name: 'Greater Experience Booster',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Triples experience gain for 15 minutes',
    quantity: 1
  },
  {
    id: 'skill_reset',
    name: 'Skill Reset Scroll',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Resets all skill points for redistribution',
    quantity: 1
  },
  {
    id: 'stat_reset',
    name: 'Stat Reset Scroll',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Resets all stat points for redistribution',
    quantity: 1
  },
  {
    id: 'level_boost',
    name: 'Level Up Scroll',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Instantly gain one level',
    quantity: 1
  },
  {
    id: 'skill_point_scroll',
    name: 'Skill Point Scroll',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Grants 5 skill points',
    quantity: 1
  },
  {
    id: 'stat_point_scroll',
    name: 'Stat Point Scroll',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Grants 10 stat points',
    quantity: 1
  },
  {
    id: 'phoenix_feather',
    name: 'Phoenix Feather',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Revives character on death with full HP/MP',
    quantity: 1
  },
  {
    id: 'invincibility_potion',
    name: 'Invincibility Potion',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Grants temporary invincibility for 30 seconds',
    quantity: 1
  },
  {
    id: 'chaos_orb',
    name: 'Chaos Orb',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Randomizes all stats (dangerous!)',
    quantity: 1
  }
];

// MATERIALS FOR CRAFTING
export const CRAFTING_MATERIALS: Item[] = [
  // COMMON MATERIALS
  {
    id: 'material_iron',
    name: 'Iron Ore',
    type: 'material',
    rarity: 'epic',
    description: 'Basic crafting material',
    quantity: 1
  },
  {
    id: 'material_leather',
    name: 'Monster Leather',
    type: 'material',
    rarity: 'epic',
    description: 'Flexible crafting material',
    quantity: 1
  },
  {
    id: 'material_cloth',
    name: 'Enchanted Cloth',
    type: 'material',
    rarity: 'epic',
    description: 'Magical fabric',
    quantity: 1
  },
  {
    id: 'material_wood',
    name: 'Mystic Wood',
    type: 'material',
    rarity: 'epic',
    description: 'Wood from magical trees',
    quantity: 1
  },
  {
    id: 'material_crystal',
    name: 'Mana Crystal',
    type: 'material',
    rarity: 'epic',
    description: 'Crystallized mana energy',
    quantity: 1
  },
  
  // RARE MATERIALS
  {
    id: 'material_steel',
    name: 'Cyber Steel',
    type: 'material',
    rarity: 'legendary',
    description: 'Enhanced steel for better equipment',
    quantity: 1
  },
  {
    id: 'material_shadow',
    name: 'Shadow Essence',
    type: 'material',
    rarity: 'legendary',
    description: 'Concentrated shadow energy',
    quantity: 1
  },
  {
    id: 'material_dragon',
    name: 'Dragon Scale',
    type: 'material',
    rarity: 'legendary',
    description: 'Scale from an ancient dragon',
    quantity: 1
  },
  {
    id: 'material_void',
    name: 'Void Fragment',
    type: 'material',
    rarity: 'legendary',
    description: 'Fragment from the void dimension',
    quantity: 1
  },
  {
    id: 'material_phoenix',
    name: 'Phoenix Feather',
    type: 'material',
    rarity: 'legendary',
    description: 'Feather from the legendary phoenix',
    quantity: 1
  },
  
  // ULTIMATE MATERIALS
  {
    id: 'material_quantum',
    name: 'Quantum Core',
    type: 'material',
    rarity: 'ultimate',
    description: 'Core of quantum energy',
    quantity: 1
  },
  {
    id: 'material_infinity',
    name: 'Infinity Shard',
    type: 'material',
    rarity: 'ultimate',
    description: 'Shard with unlimited power',
    quantity: 1
  },
  {
    id: 'material_genesis',
    name: 'Genesis Stone',
    type: 'material',
    rarity: 'ultimate',
    description: 'Stone from the beginning of time',
    quantity: 1
  },
  {
    id: 'material_absolute',
    name: 'Absolute Essence',
    type: 'material',
    rarity: 'ultimate',
    description: 'Pure essence of absolute power',
    quantity: 1
  },
  {
    id: 'material_chaos',
    name: 'Chaos Fragment',
    type: 'material',
    rarity: 'ultimate',
    description: 'Fragment of pure chaos',
    quantity: 1
  }
];

