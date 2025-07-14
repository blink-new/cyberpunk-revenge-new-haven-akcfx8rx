// Game Constants - All game configuration values in one place
// This makes it easy to port to C++ as #define constants or const variables

export const GAME_CONFIG = {
  // Core Engine Settings
  TARGET_FPS: 60,
  FIXED_TIMESTEP: 1.0 / 60.0,
  MAX_DELTA_TIME: 0.05,
  
  // World Settings
  WORLD_WIDTH: 2000,
  WORLD_HEIGHT: 600,
  TILE_SIZE: 32,
  GRAVITY: 0.8,
  TERMINAL_VELOCITY: 20,
  
  // Player Settings
  PLAYER_WIDTH: 48,
  PLAYER_HEIGHT: 64,
  PLAYER_SPEED: 4,
  JUMP_FORCE: 18,
  DOUBLE_JUMP_FORCE: 15,
  DASH_DISTANCE: 120,
  DASH_COOLDOWN: 2.0,
  
  // Combat Settings
  BASE_ATTACK_DAMAGE: 25,
  CRITICAL_HIT_MULTIPLIER: 2.0,
  CRITICAL_HIT_CHANCE: 0.1,
  COMBO_WINDOW: 2.0,
  MAX_COMBO_MULTIPLIER: 3.0,
  
  // Character Classes
  CHARACTER_CLASSES: {
    SAMURAI: {
      BASE_HEALTH: 120,
      BASE_MANA: 80,
      BASE_DAMAGE: 30,
      BASE_DEFENSE: 15,
      BASE_SPEED: 100,
      SPECIAL_ABILITY: 'katana_mastery'
    },
    NINJA: {
      BASE_HEALTH: 90,
      BASE_MANA: 100,
      BASE_DAMAGE: 25,
      BASE_DEFENSE: 8,
      BASE_SPEED: 140,
      SPECIAL_ABILITY: 'stealth'
    },
    WARRIOR: {
      BASE_HEALTH: 150,
      BASE_MANA: 60,
      BASE_DAMAGE: 35,
      BASE_DEFENSE: 20,
      BASE_SPEED: 80,
      SPECIAL_ABILITY: 'berserker_rage'
    },
    HUNTER: {
      BASE_HEALTH: 100,
      BASE_MANA: 90,
      BASE_DAMAGE: 28,
      BASE_DEFENSE: 12,
      BASE_SPEED: 110,
      SPECIAL_ABILITY: 'eagle_eye'
    },
    MAGE: {
      BASE_HEALTH: 80,
      BASE_MANA: 150,
      BASE_DAMAGE: 40,
      BASE_DEFENSE: 5,
      BASE_SPEED: 90,
      SPECIAL_ABILITY: 'arcane_mastery'
    },
    NECROMANCER: {
      BASE_HEALTH: 85,
      BASE_MANA: 140,
      BASE_DAMAGE: 35,
      BASE_DEFENSE: 8,
      BASE_SPEED: 85,
      SPECIAL_ABILITY: 'death_magic'
    },
    DRUID: {
      BASE_HEALTH: 110,
      BASE_MANA: 120,
      BASE_DAMAGE: 30,
      BASE_DEFENSE: 12,
      BASE_SPEED: 95,
      SPECIAL_ABILITY: 'shapeshifting'
    }
  },
  
  // Difficulty Settings
  DIFFICULTY_MODIFIERS: {
    NORMAL: {
      ENEMY_HEALTH_MULTIPLIER: 1.0,
      ENEMY_DAMAGE_MULTIPLIER: 1.0,
      EXPERIENCE_MULTIPLIER: 1.0,
      LOOT_MULTIPLIER: 1.0,
      PLAYER_DAMAGE_TAKEN: 1.0
    },
    DIFFICULT: {
      ENEMY_HEALTH_MULTIPLIER: 1.5,
      ENEMY_DAMAGE_MULTIPLIER: 1.3,
      EXPERIENCE_MULTIPLIER: 1.5,
      LOOT_MULTIPLIER: 1.2,
      PLAYER_DAMAGE_TAKEN: 1.2
    },
    IMPOSSIBLE: {
      ENEMY_HEALTH_MULTIPLIER: 2.0,
      ENEMY_DAMAGE_MULTIPLIER: 2.0,
      EXPERIENCE_MULTIPLIER: 2.0,
      LOOT_MULTIPLIER: 1.5,
      PLAYER_DAMAGE_TAKEN: 10.0 // One-hit kill mode
    }
  },
  
  // Level Progression
  LEVEL_PROGRESSION: {
    MAX_LEVEL: 99,
    EXPERIENCE_BASE: 100,
    EXPERIENCE_MULTIPLIER: 1.1,
    SKILL_POINTS_PER_LEVEL: 1,
    STAT_POINTS_PER_LEVEL: 10
  },
  
  // Equipment Rarities
  EQUIPMENT_RARITIES: {
    EPIC: {
      COLOR: '#a855f7',
      STAT_MULTIPLIER: 1.0,
      DROP_CHANCE: 0.6
    },
    LEGENDARY: {
      COLOR: '#f97316',
      STAT_MULTIPLIER: 1.5,
      DROP_CHANCE: 0.3
    },
    ULTIMATE: {
      COLOR: '#ef4444',
      STAT_MULTIPLIER: 2.0,
      DROP_CHANCE: 0.1
    }
  },
  
  // Audio Settings
  AUDIO: {
    MASTER_VOLUME: 1.0,
    MUSIC_VOLUME: 0.7,
    SFX_VOLUME: 0.8,
    MAX_AUDIO_DISTANCE: 500,
    AUDIO_ROLLOFF: 0.5
  },
  
  // Visual Effects
  PARTICLES: {
    MAX_PARTICLES: 1000,
    DEFAULT_LIFETIME: 2.0,
    GRAVITY_STRENGTH: 0.5
  },
  
  // UI Settings
  UI: {
    HEALTH_BAR_WIDTH: 200,
    HEALTH_BAR_HEIGHT: 20,
    MANA_BAR_WIDTH: 200,
    MANA_BAR_HEIGHT: 15,
    ABILITY_SLOT_SIZE: 48,
    ABILITY_SLOTS_COUNT: 6,
    MINIMAP_SIZE: 150
  },
  
  // Input Settings
  INPUT: {
    BUFFER_TIME: 0.2,
    COMBO_WINDOW: 1.0,
    DOUBLE_TAP_TIME: 0.3
  },
  
  // AI Settings
  AI: {
    DETECTION_RANGE: 200,
    ATTACK_RANGE: 60,
    PATROL_SPEED: 50,
    CHASE_SPEED: 100,
    AGGRO_TIMEOUT: 5.0,
    PATHFINDING_UPDATE_RATE: 0.1
  },
  
  // Skill System
  SKILLS: {
    MAX_SKILL_LEVEL: 10,
    SKILL_TREE_TIERS: 10,
    ULTIMATE_SKILL_TIER: 10,
    SKILL_COOLDOWN_REDUCTION_PER_LEVEL: 0.05
  },
  
  // Status Effects
  STATUS_EFFECTS: {
    POISON: {
      TICK_RATE: 1.0,
      MAX_STACKS: 5
    },
    FREEZE: {
      SLOW_AMOUNT: 0.5,
      MAX_DURATION: 5.0
    },
    BURN: {
      TICK_RATE: 0.5,
      SPREAD_CHANCE: 0.3
    },
    STUN: {
      MAX_DURATION: 3.0
    },
    REGENERATION: {
      TICK_RATE: 1.0,
      MAX_STACKS: 3
    }
  },
  
  // Loot System
  LOOT: {
    BASE_DROP_CHANCE: 0.3,
    BOSS_DROP_CHANCE: 0.8,
    RARE_DROP_MULTIPLIER: 0.1,
    CURRENCY_DROP_RANGE: [10, 50],
    EQUIPMENT_LEVEL_VARIANCE: 5
  },
  
  // Boss Mechanics
  BOSS: {
    PHASE_TRANSITION_INVULNERABILITY: 2.0,
    ENRAGE_TIMER: 300.0, // 5 minutes
    ENRAGE_DAMAGE_MULTIPLIER: 1.5,
    MINION_SPAWN_INTERVAL: 30.0
  },
  
  // Environment
  ENVIRONMENT: {
    BACKGROUND_SCROLL_SPEED: 0.5,
    PARALLAX_LAYERS: 3,
    WEATHER_TRANSITION_TIME: 10.0,
    DAY_NIGHT_CYCLE_DURATION: 600.0 // 10 minutes
  },
  
  // Performance
  PERFORMANCE: {
    MAX_ENTITIES: 500,
    CULLING_DISTANCE: 800,
    LOD_DISTANCE_NEAR: 200,
    LOD_DISTANCE_FAR: 500,
    PHYSICS_SUBSTEPS: 1
  }
} as const;

// Input Key Mappings
export const INPUT_KEYS = {
  // Movement
  MOVE_LEFT: ['ArrowLeft', 'a', 'A'],
  MOVE_RIGHT: ['ArrowRight', 'd', 'D'],
  MOVE_UP: ['ArrowUp', 'w', 'W'],
  MOVE_DOWN: ['ArrowDown', 's', 'S'],
  
  // Actions
  JUMP: [' ', 'Space'],
  ATTACK: ['x', 'X', 'Enter'],
  DASH: ['Shift', 'ShiftLeft', 'ShiftRight'],
  
  // Abilities
  ABILITY_1: ['1'],
  ABILITY_2: ['2'],
  ABILITY_3: ['3'],
  ABILITY_4: ['4'],
  ABILITY_5: ['5'],
  ABILITY_ULTIMATE: ['6'],
  
  // UI
  INVENTORY: ['i', 'I'],
  SKILLS: ['k', 'K'],
  PAUSE: ['p', 'P', 'Escape'],
  MAP: ['m', 'M'],
  
  // Debug (development only)
  DEBUG_TOGGLE: ['F1'],
  DEBUG_GODMODE: ['F2'],
  DEBUG_NOCLIP: ['F3'],
  DEBUG_SPAWN_ENEMY: ['F4']
} as const;

// Color Palette
export const COLORS = {
  // UI Colors
  PRIMARY: '#8b5cf6',
  SECONDARY: '#a855f7',
  ACCENT: '#f59e42',
  BACKGROUND: '#1a0033',
  SURFACE: '#2d1b69',
  
  // Health/Mana
  HEALTH: '#dc2626',
  HEALTH_LOW: '#991b1b',
  MANA: '#3b82f6',
  MANA_LOW: '#1e40af',
  
  // Damage Types
  PHYSICAL_DAMAGE: '#ffffff',
  FIRE_DAMAGE: '#ff6b35',
  ICE_DAMAGE: '#4ecdc4',
  LIGHTNING_DAMAGE: '#ffff00',
  POISON_DAMAGE: '#22c55e',
  DARK_DAMAGE: '#8b5cf6',
  HOLY_DAMAGE: '#fbbf24',
  
  // Status Effects
  POISON_COLOR: '#22c55e',
  FREEZE_COLOR: '#60a5fa',
  BURN_COLOR: '#f97316',
  STUN_COLOR: '#fbbf24',
  REGENERATION_COLOR: '#10b981',
  
  // Rarity Colors
  EPIC_COLOR: '#a855f7',
  LEGENDARY_COLOR: '#f97316',
  ULTIMATE_COLOR: '#ef4444',
  
  // Environment
  NEON_PINK: '#ff1493',
  NEON_BLUE: '#00bfff',
  NEON_GREEN: '#39ff14',
  CYBER_PURPLE: '#8a2be2'
} as const;

// Animation Frame Data
export const ANIMATIONS = {
  PLAYER: {
    IDLE: { frames: 4, frameTime: 0.25 },
    WALK: { frames: 6, frameTime: 0.15 },
    RUN: { frames: 8, frameTime: 0.1 },
    JUMP: { frames: 3, frameTime: 0.2 },
    ATTACK: { frames: 5, frameTime: 0.1 },
    DASH: { frames: 3, frameTime: 0.05 },
    DEATH: { frames: 6, frameTime: 0.2 }
  },
  ENEMY: {
    IDLE: { frames: 2, frameTime: 0.5 },
    WALK: { frames: 4, frameTime: 0.2 },
    ATTACK: { frames: 3, frameTime: 0.15 },
    DEATH: { frames: 4, frameTime: 0.25 }
  },
  EFFECTS: {
    EXPLOSION: { frames: 8, frameTime: 0.08 },
    LIGHTNING: { frames: 4, frameTime: 0.05 },
    HEAL: { frames: 6, frameTime: 0.1 },
    SMOKE: { frames: 10, frameTime: 0.1 }
  }
} as const;

// Sound Effect IDs
export const SOUNDS = {
  // Player Actions
  PLAYER_JUMP: 'player_jump',
  PLAYER_LAND: 'player_land',
  PLAYER_ATTACK: 'player_attack',
  PLAYER_DASH: 'player_dash',
  PLAYER_HURT: 'player_hurt',
  PLAYER_DEATH: 'player_death',
  
  // Combat
  HIT_PHYSICAL: 'hit_physical',
  HIT_CRITICAL: 'hit_critical',
  BLOCK: 'block',
  PARRY: 'parry',
  
  // Magic/Abilities
  CAST_FIRE: 'cast_fire',
  CAST_ICE: 'cast_ice',
  CAST_LIGHTNING: 'cast_lightning',
  CAST_HEAL: 'cast_heal',
  ULTIMATE_CAST: 'ultimate_cast',
  
  // Environment
  FOOTSTEP_METAL: 'footstep_metal',
  FOOTSTEP_STONE: 'footstep_stone',
  DOOR_OPEN: 'door_open',
  ITEM_PICKUP: 'item_pickup',
  
  // UI
  MENU_SELECT: 'menu_select',
  MENU_CONFIRM: 'menu_confirm',
  MENU_CANCEL: 'menu_cancel',
  LEVEL_UP: 'level_up',
  
  // Music
  MUSIC_MENU: 'music_menu',
  MUSIC_LEVEL_1: 'music_level_1',
  MUSIC_BOSS: 'music_boss',
  MUSIC_VICTORY: 'music_victory'
} as const;

// Skill Tree Configuration
export const SKILL_TREE_CONFIG = {
  TIERS: 10,
  SKILLS_PER_TIER: 10,
  TOTAL_SKILLS_PER_CLASS: 100,
  ULTIMATE_TIER: 10,
  
  SKILL_TYPES: {
    ACTIVE: 'active',
    PASSIVE: 'passive',
    ATTACKING: 'attacking',
    DEFENSIVE: 'defensive',
    MAGIC: 'magic',
    ULTIMATE: 'ultimate'
  },
  
  REQUIREMENTS: {
    LEVEL: 'level',
    SKILL: 'skill',
    STAT: 'stat',
    QUEST: 'quest'
  }
} as const;

// Level Configuration
export const LEVEL_CONFIG = {
  TOTAL_LEVELS: 100,
  BOSS_LEVELS: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
  
  ENVIRONMENTS: {
    STREET: 'street',
    BUILDING: 'building',
    UNDERGROUND: 'underground',
    ROOFTOP: 'rooftop',
    FACTORY: 'factory',
    NEON_CITY: 'neon_city',
    CYBER_NIGHT: 'cyber_night',
    TOXIC_WASTELAND: 'toxic_wasteland',
    DIGITAL_REALM: 'digital_realm',
    VOID_SPACE: 'void_space'
  },
  
  SCALING: {
    ENEMY_HEALTH_PER_LEVEL: 10,
    ENEMY_DAMAGE_PER_LEVEL: 2,
    LOOT_QUALITY_PER_LEVEL: 0.01
  }
} as const;

// Equipment Configuration
export const EQUIPMENT_CONFIG = {
  WEAPON_TYPES: ['sword', 'bow', 'staff', 'dagger', 'hammer', 'spear', 'gun'],
  ARMOR_TYPES: ['helmet', 'chest', 'legs', 'boots', 'gloves'],
  ACCESSORY_TYPES: ['ring', 'necklace', 'charm'],
  
  ENCHANTMENT_SLOTS: {
    WEAPON: 3,
    ARMOR: 2,
    ACCESSORY: 1
  },
  
  DURABILITY: {
    MAX_DURABILITY: 100,
    REPAIR_COST_MULTIPLIER: 0.1,
    BREAK_PENALTY: 0.5
  }
} as const;

// Export utility functions for accessing constants
export class GameConstants {
  static getCharacterBaseStats(characterClass: string) {
    return GAME_CONFIG.CHARACTER_CLASSES[characterClass as keyof typeof GAME_CONFIG.CHARACTER_CLASSES];
  }
  
  static getDifficultyModifier(difficulty: string) {
    return GAME_CONFIG.DIFFICULTY_MODIFIERS[difficulty as keyof typeof GAME_CONFIG.DIFFICULTY_MODIFIERS];
  }
  
  static getExperienceRequired(level: number): number {
    return Math.floor(
      GAME_CONFIG.LEVEL_PROGRESSION.EXPERIENCE_BASE * 
      Math.pow(GAME_CONFIG.LEVEL_PROGRESSION.EXPERIENCE_MULTIPLIER, level - 1)
    );
  }
  
  static getRarityColor(rarity: string): string {
    switch (rarity) {
      case 'epic': return COLORS.EPIC_COLOR;
      case 'legendary': return COLORS.LEGENDARY_COLOR;
      case 'ultimate': return COLORS.ULTIMATE_COLOR;
      default: return COLORS.PRIMARY;
    }
  }
  
  static isKeyPressed(key: string, action: keyof typeof INPUT_KEYS): boolean {
    return INPUT_KEYS[action].includes(key);
  }
}