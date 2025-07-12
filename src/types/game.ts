export interface Character {
  id: string;
  name: string;
  class: CharacterClass;
  level: number;
  experience: number;
  stats: Stats;
  skills: Skill[];
  inventory: Item[];
  equipment: Equipment;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  skillPoints: number;
  learnedSkills: LearnedSkill[];
  credits: number; // Cyberpunk currency
}

export interface LearnedSkill {
  skillId: string;
  level: number;
  unlocked: boolean;
}

export type CharacterClass = 'samurai' | 'ninja' | 'warrior' | 'hunter' | 'mage' | 'necromancer' | 'druid';

export interface Stats {
  strength: number;
  agility: number;
  intelligence: number;
  vitality: number;
  defense: number;
  magic: number;
  luck: number;
}

export interface Skill {
  id: string;
  name: string;
  type: SkillType;
  level: number;
  maxLevel: number;
  damage?: number;
  manaCost?: number;
  cooldown?: number;
  description: string;
  unlocked: boolean;
}

export type SkillType = 'active' | 'passive' | 'defensive' | 'attacking' | 'magic';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  rarity: Rarity;
  stats?: Partial<Stats>;
  damage?: number;
  defense?: number;
  description: string;
  characterClass?: CharacterClass;
  quantity?: number;
}

export type ItemType = 'weapon' | 'armor' | 'consumable' | 'material' | 'ring' | 'necklace' | 'gloves' | 'boots' | 'helmet';
export type Rarity = 'epic' | 'legendary' | 'ultimate';

export interface Equipment {
  weapon?: Item;
  armor?: Item;
  helmet?: Item;
  boots?: Item;
  gloves?: Item;
  ring?: Item;
  necklace?: Item;
}

export interface Enemy {
  id: string;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  damage: number;
  defense: number;
  experience: number;
  loot: Item[];
  isBoss: boolean;
  skills: string[];
}

export interface GameLevel {
  id: number;
  name: string;
  enemies: Enemy[];
  boss?: Enemy;
  requiredLevel: number;
  backgroundMusic?: string;
  environment: 'street' | 'building' | 'underground' | 'rooftop' | 'factory' | 'neon_city' | 'cyber_night' | 'toxic_wasteland' | 'digital_realm' | 'void_space';
}

export type Difficulty = 'normal' | 'difficult' | 'impossible';

export interface GameState {
  currentCharacter?: Character;
  currentLevel: number;
  difficulty: Difficulty;
  gameMode: GameMode;
  unlockedDifficulties: Difficulty[];
  chest: Item[];
  playerLevel: number;
  totalExperience: number;
  availableSkillPoints: number;
  credits: number; // Global credits for the player
}

export type GameMode = 'lobby' | 'characterSelect' | 'levelSelect' | 'game' | 'inventory' | 'shop' | 'skillTree' | 'training' | 'saveMenu';

export interface ShopItem extends Item {
  price: number;
  stock: number;
}