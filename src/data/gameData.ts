import { CharacterClass, Stats, Item, Enemy, GameLevel, ShopItem } from '../types/game';

export const CHARACTER_CLASSES: Record<CharacterClass, {
  name: string;
  baseStats: Stats;
  description: string;
  skills: string[];
  color: string;
}> = {
  samurai: {
    name: 'Samurai',
    baseStats: { strength: 18, agility: 14, intelligence: 10, vitality: 16, defense: 15, magic: 8, luck: 12 },
    description: 'Master of the blade, skilled in close combat and honor-bound techniques.',
    skills: ['Katana Strike', 'Blade Fury', 'Meditation', 'Honor Guard', 'Wind Slash', 'Soul Cut', 'Bushido'],
    color: '#ff6b6b'
  },
  ninja: {
    name: 'Ninja',
    baseStats: { strength: 14, agility: 20, intelligence: 12, vitality: 12, defense: 10, magic: 10, luck: 18 },
    description: 'Silent assassin with unmatched stealth and critical strike capabilities.',
    skills: ['Shadow Strike', 'Stealth', 'Poison Dart', 'Smoke Bomb', 'Assassination', 'Shadow Clone', 'Vanish'],
    color: '#4ecdc4'
  },
  warrior: {
    name: 'Warrior',
    baseStats: { strength: 20, agility: 10, intelligence: 8, vitality: 20, defense: 18, magic: 6, luck: 10 },
    description: 'Unstoppable force with massive strength and defensive capabilities.',
    skills: ['Power Strike', 'Shield Wall', 'Berserker', 'Taunt', 'Rage', 'Earthquake', 'Fortress'],
    color: '#ffd93d'
  },
  hunter: {
    name: 'Hunter',
    baseStats: { strength: 16, agility: 18, intelligence: 14, vitality: 14, defense: 12, magic: 8, luck: 16 },
    description: 'Ranged specialist with traps and precise shots.',
    skills: ['Arrow Shot', 'Explosive Trap', 'Eagle Eye', 'Multi Shot', 'Poison Arrow', 'Rain of Arrows', 'Beast Call'],
    color: '#6bcf7f'
  },
  mage: {
    name: 'Mage',
    baseStats: { strength: 8, agility: 10, intelligence: 22, vitality: 12, defense: 8, magic: 22, luck: 12 },
    description: 'Master of elemental magic and devastating spells.',
    skills: ['Fireball', 'Ice Shard', 'Lightning Bolt', 'Mana Shield', 'Meteor', 'Teleport', 'Arcane Blast'],
    color: '#a8e6cf'
  },
  necromancer: {
    name: 'Necromancer',
    baseStats: { strength: 10, agility: 12, intelligence: 20, vitality: 14, defense: 10, magic: 20, luck: 10 },
    description: 'Dark magic user who commands the undead and drains life.',
    skills: ['Bone Spear', 'Summon Skeleton', 'Life Drain', 'Corpse Explosion', 'Bone Armor', 'Death Nova', 'Soul Harvest'],
    color: '#dda0dd'
  },
  druid: {
    name: 'Druid',
    baseStats: { strength: 16, agility: 14, intelligence: 16, vitality: 18, defense: 14, magic: 16, luck: 12 },
    description: 'Nature shapeshifter with healing abilities and animal forms.',
    skills: ['Nature Heal', 'Wolf Form', 'Vine Whip', 'Bear Form', 'Lightning Storm', 'Regeneration', 'Elemental Fury'],
    color: '#90ee90'
  }
};

export const RARITY_COLORS = {
  epic: '#a855f7',
  legendary: '#f97316',
  ultimate: '#ef4444'
};

export const DIFFICULTY_MODIFIERS = {
  normal: { healthMultiplier: 1, damageMultiplier: 1, experienceMultiplier: 1, lootMultiplier: 1 },
  difficult: { healthMultiplier: 1.5, damageMultiplier: 1.3, experienceMultiplier: 1.5, lootMultiplier: 1.2 },
  impossible: { healthMultiplier: 2, damageMultiplier: 2, experienceMultiplier: 2, lootMultiplier: 1.5 }
};

export const LEVEL_EXPERIENCE_REQUIRED = Array.from({ length: 99 }, (_, i) => Math.floor(100 * Math.pow(1.1, i)));

export const SAMPLE_WEAPONS: Item[] = [
  {
    id: 'katana_1',
    name: 'Cyber Katana',
    type: 'weapon',
    rarity: 'epic',
    damage: 45,
    description: 'A blade infused with digital energy.',
    characterClass: 'samurai'
  },
  {
    id: 'shuriken_1',
    name: 'Plasma Shuriken',
    type: 'weapon',
    rarity: 'legendary',
    damage: 35,
    description: 'Throwing stars that cut through reality.',
    characterClass: 'ninja'
  },
  {
    id: 'hammer_1',
    name: 'Thunder Hammer',
    type: 'weapon',
    rarity: 'ultimate',
    damage: 65,
    description: 'A massive hammer that shakes the earth.',
    characterClass: 'warrior'
  }
];

export const SAMPLE_ARMOR: Item[] = [
  {
    id: 'cyber_suit_1',
    name: 'Neon Armor',
    type: 'armor',
    rarity: 'epic',
    defense: 25,
    stats: { vitality: 5, defense: 8 },
    description: 'Armor that glows with cyberpunk energy.',
    characterClass: 'samurai'
  },
  {
    id: 'stealth_suit_1',
    name: 'Shadow Cloak',
    type: 'armor',
    rarity: 'legendary',
    defense: 20,
    stats: { agility: 10, luck: 5 },
    description: 'Clothing that bends light around the wearer.',
    characterClass: 'ninja'
  }
];

export const SAMPLE_ENEMIES: Enemy[] = [
  {
    id: 'gang_thug',
    name: 'Shimoto Thug',
    level: 1,
    health: 50,
    maxHealth: 50,
    damage: 15,
    defense: 5,
    experience: 25,
    loot: [],
    isBoss: false,
    skills: ['Punch', 'Kick']
  },
  {
    id: 'cyber_enforcer',
    name: 'Cyber Enforcer',
    level: 5,
    health: 150,
    maxHealth: 150,
    damage: 35,
    defense: 15,
    experience: 75,
    loot: [],
    isBoss: false,
    skills: ['Laser Shot', 'Shield']
  },
  {
    id: 'shimoto_boss',
    name: 'Shimoto Boss',
    level: 10,
    health: 500,
    maxHealth: 500,
    damage: 80,
    defense: 30,
    experience: 300,
    loot: [],
    isBoss: true,
    skills: ['Devastating Blow', 'Rage', 'Summon Thugs']
  }
];

export const SAMPLE_LEVELS: GameLevel[] = [
  {
    id: 1,
    name: 'Neon Streets',
    enemies: [SAMPLE_ENEMIES[0], SAMPLE_ENEMIES[0], SAMPLE_ENEMIES[1]],
    requiredLevel: 1,
    environment: 'street'
  },
  {
    id: 2,
    name: 'Boss Fight: Shimoto Lieutenant',
    enemies: [SAMPLE_ENEMIES[2]],
    boss: SAMPLE_ENEMIES[2],
    requiredLevel: 3,
    environment: 'rooftop'
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'health_potion',
    name: 'Health Stimpack',
    type: 'consumable',
    rarity: 'epic',
    description: 'Restores 100 HP instantly',
    price: 50,
    stock: 10
  },
  {
    id: 'mana_potion',
    name: 'Mana Booster',
    type: 'consumable',
    rarity: 'epic',
    description: 'Restores 50 MP instantly',
    price: 40,
    stock: 10
  },
  {
    id: 'basic_katana',
    name: 'Street Katana',
    type: 'weapon',
    rarity: 'epic',
    damage: 25,
    description: 'A reliable blade for starting warriors',
    characterClass: 'samurai',
    price: 200,
    stock: 5
  }
];