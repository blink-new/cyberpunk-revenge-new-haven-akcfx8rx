// Game Components - Data structures for entity components
// These can be easily translated to C++ structs/classes

import { Vector2 } from './GameEngine';
import { CharacterClass, Difficulty } from '../types/game';

// Physics Component - handles movement and physics properties
export interface PhysicsComponent {
  velocity: Vector2;
  acceleration: Vector2;
  maxSpeed: number;
  friction: number;
  useGravity: boolean;
  onGround: boolean;
  mass: number;
}

// Combat Component - handles health, damage, and combat stats
export interface CombatComponent {
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  damage: number;
  defense: number;
  attackRange: number;
  attackCooldown: number;
  maxAttackCooldown: number;
  statusEffects: StatusEffect[];
  immunities: string[];
  onDeath?: (entity: any) => void;
}

// Status Effect - temporary effects applied to entities
export interface StatusEffect {
  type: 'poison' | 'freeze' | 'burn' | 'stun' | 'slow' | 'regeneration' | 'shield' | 'berserk';
  duration: number;
  damage?: number;
  healAmount?: number;
  speedMultiplier?: number;
  damageMultiplier?: number;
  tickTimer: number;
  stackCount: number;
}

// AI Component - handles enemy AI behavior
export interface AIComponent {
  state: 'patrol' | 'chase' | 'attack' | 'flee' | 'stunned' | 'dead';
  target: any | null;
  detectionRange: number;
  attackRange: number;
  moveSpeed: number;
  patrolDirection: number;
  aggroLevel: number;
  lastKnownPlayerPosition: Vector2 | null;
  behaviorTree?: AIBehaviorNode;
}

// AI Behavior Tree Node
export interface AIBehaviorNode {
  type: 'sequence' | 'selector' | 'condition' | 'action';
  children?: AIBehaviorNode[];
  condition?: (entity: any) => boolean;
  action?: (entity: any, deltaTime: number) => void;
}

// Animation Component - handles sprite animations
export interface AnimationComponent {
  currentAnimation: string;
  animations: Map<string, AnimationData>;
  currentFrame: number;
  currentTime: number;
  frameTime: number;
  frameCount: number;
  loop: boolean;
  playing: boolean;
}

export interface AnimationData {
  frames: number[];
  frameTime: number;
  loop: boolean;
  onComplete?: () => void;
}

// Collider Component - handles collision detection
export interface ColliderComponent {
  type: 'player' | 'enemy' | 'projectile' | 'platform' | 'trigger' | 'pickup';
  layer: number;
  isTrigger: boolean;
  onCollisionEnter?: (other: any) => void;
  onCollisionExit?: (other: any) => void;
  onTriggerEnter?: (other: any) => void;
  onTriggerExit?: (other: any) => void;
}

// Player Component - specific to player entities
export interface PlayerComponent {
  characterClass: CharacterClass;
  level: number;
  experience: number;
  skillPoints: number;
  learnedSkills: string[];
  equippedAbilities: string[];
  inputBuffer: InputCommand[];
  comboState: ComboState;
  dashCooldown: number;
  canDoubleJump: boolean;
  hasDoubleJumped: boolean;
}

export interface InputCommand {
  type: 'move' | 'jump' | 'attack' | 'ability' | 'dash';
  direction?: Vector2;
  abilityId?: string;
  timestamp: number;
}

export interface ComboState {
  currentCombo: string[];
  comboTimer: number;
  maxComboTime: number;
  comboMultiplier: number;
}

// Projectile Component - for projectiles and spells
export interface ProjectileComponent {
  damage: number;
  speed: number;
  lifetime: number;
  piercing: boolean;
  homing: boolean;
  homingTarget?: any;
  homingStrength: number;
  onHit?: (target: any) => void;
  onExpire?: () => void;
  trail: boolean;
  trailColor: string;
}

// Particle Emitter Component - for visual effects
export interface ParticleEmitterComponent {
  particleCount: number;
  emissionRate: number;
  timer: number;
  particleLife: number;
  spread: number;
  color: string;
  size: number;
  gravity: number;
  texture?: string;
  blendMode: 'normal' | 'additive' | 'multiply';
}

// Audio Component - for sound effects and music
export interface AudioComponent {
  soundId: string;
  volume: number;
  pitch: number;
  loop: boolean;
  is3D: boolean;
  maxDistance: number;
  rolloffFactor: number;
  pendingEvents: AudioEvent[];
}

export interface AudioEvent {
  type: 'play' | 'stop' | 'pause' | 'resume';
  soundId: string;
  volume?: number;
  pitch?: number;
}

// Loot Component - for items and pickups
export interface LootComponent {
  itemId: string;
  rarity: 'epic' | 'legendary' | 'ultimate';
  autoPickup: boolean;
  pickupRange: number;
  value: number;
  onPickup?: (player: any) => void;
  glowEffect: boolean;
  bobAnimation: boolean;
}

// Platform Component - for platforms and terrain
export interface PlatformComponent {
  type: 'solid' | 'oneway' | 'moving' | 'breakable' | 'hazard';
  material: 'metal' | 'stone' | 'wood' | 'energy' | 'ice';
  movementPath?: Vector2[];
  movementSpeed: number;
  currentPathIndex: number;
  breakable: boolean;
  health: number;
  hazardDamage: number;
}

// Ability Component - for active abilities and spells
export interface AbilityComponent {
  abilityId: string;
  cooldown: number;
  maxCooldown: number;
  manaCost: number;
  damage: number;
  range: number;
  areaOfEffect: number;
  castTime: number;
  channelTime: number;
  charges: number;
  maxCharges: number;
  effects: AbilityEffect[];
}

export interface AbilityEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'teleport' | 'summon' | 'transform';
  value: number;
  duration: number;
  target: 'self' | 'enemy' | 'ally' | 'area' | 'all';
  statusEffect?: StatusEffect;
  animation?: string;
  sound?: string;
  particles?: string;
}

// Equipment Component - for weapons and armor
export interface EquipmentComponent {
  weaponSlot?: EquipmentSlot;
  armorSlot?: EquipmentSlot;
  accessorySlots: EquipmentSlot[];
  setBonus?: SetBonus;
}

export interface EquipmentSlot {
  itemId: string;
  enchantments: Enchantment[];
  durability: number;
  maxDurability: number;
}

export interface Enchantment {
  type: string;
  level: number;
  effect: any;
}

export interface SetBonus {
  setId: string;
  piecesEquipped: number;
  bonuses: Map<number, any>;
}

// Level Component - for level progression and scaling
export interface LevelComponent {
  currentLevel: number;
  difficulty: Difficulty;
  enemyScaling: number;
  lootScaling: number;
  experienceScaling: number;
  environmentEffects: EnvironmentEffect[];
}

export interface EnvironmentEffect {
  type: 'gravity' | 'wind' | 'temperature' | 'radiation' | 'darkness';
  strength: number;
  area?: Vector2[];
}

// Boss Component - for boss-specific behavior
export interface BossComponent {
  phases: BossPhase[];
  currentPhase: number;
  phaseTransitionHealth: number[];
  enrageTimer: number;
  specialAttacks: SpecialAttack[];
  minions: string[];
  arenaCenter: Vector2;
  arenaRadius: number;
}

export interface BossPhase {
  healthPercentage: number;
  attackPattern: string[];
  moveSpeed: number;
  damageMultiplier: number;
  specialAbilities: string[];
  onEnter?: () => void;
  onExit?: () => void;
}

export interface SpecialAttack {
  id: string;
  cooldown: number;
  maxCooldown: number;
  damage: number;
  pattern: AttackPattern;
  warning: WarningIndicator;
}

export interface AttackPattern {
  type: 'line' | 'circle' | 'cone' | 'random' | 'spiral';
  count: number;
  spread: number;
  delay: number;
}

export interface WarningIndicator {
  duration: number;
  color: string;
  shape: 'circle' | 'rectangle' | 'line';
  animation: 'pulse' | 'fade' | 'grow';
}

// Inventory Component - for item management
export interface InventoryComponent {
  slots: InventorySlot[];
  maxSlots: number;
  currency: number;
  autoSort: boolean;
  filters: ItemFilter[];
}

export interface InventorySlot {
  itemId: string | null;
  quantity: number;
  locked: boolean;
}

export interface ItemFilter {
  type: string;
  rarity: string[];
  category: string[];
  enabled: boolean;
}

// Quest Component - for quest tracking
export interface QuestComponent {
  activeQuests: Quest[];
  completedQuests: string[];
  questProgress: Map<string, any>;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  objectives: QuestObjective[];
  rewards: QuestReward[];
  prerequisites: string[];
  timeLimit?: number;
}

export interface QuestObjective {
  id: string;
  description: string;
  type: 'kill' | 'collect' | 'reach' | 'interact' | 'survive';
  target: string;
  current: number;
  required: number;
  completed: boolean;
}

export interface QuestReward {
  type: 'experience' | 'currency' | 'item' | 'skill';
  value: number;
  itemId?: string;
  skillId?: string;
}

// Dialogue Component - for NPC interactions
export interface DialogueComponent {
  dialogueTree: DialogueNode;
  currentNode: string;
  variables: Map<string, any>;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  choices: DialogueChoice[];
  conditions?: DialogueCondition[];
  actions?: DialogueAction[];
}

export interface DialogueChoice {
  text: string;
  nextNode: string;
  conditions?: DialogueCondition[];
  actions?: DialogueAction[];
}

export interface DialogueCondition {
  type: 'variable' | 'quest' | 'item' | 'level';
  key: string;
  operator: '==' | '!=' | '>' | '<' | '>=' | '<=';
  value: any;
}

export interface DialogueAction {
  type: 'setVariable' | 'giveItem' | 'startQuest' | 'completeQuest';
  key: string;
  value: any;
}

// Factory functions for creating components with default values
export class ComponentFactory {
  static createPhysicsComponent(overrides: Partial<PhysicsComponent> = {}): PhysicsComponent {
    return {
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      maxSpeed: 300,
      friction: 0.8,
      useGravity: true,
      onGround: false,
      mass: 1,
      ...overrides
    };
  }

  static createCombatComponent(overrides: Partial<CombatComponent> = {}): CombatComponent {
    return {
      health: 100,
      maxHealth: 100,
      mana: 50,
      maxMana: 50,
      damage: 25,
      defense: 5,
      attackRange: 50,
      attackCooldown: 0,
      maxAttackCooldown: 1.0,
      statusEffects: [],
      immunities: [],
      ...overrides
    };
  }

  static createAIComponent(overrides: Partial<AIComponent> = {}): AIComponent {
    return {
      state: 'patrol',
      target: null,
      detectionRange: 200,
      attackRange: 60,
      moveSpeed: 100,
      patrolDirection: 1,
      aggroLevel: 0,
      lastKnownPlayerPosition: null,
      ...overrides
    };
  }

  static createPlayerComponent(overrides: Partial<PlayerComponent> = {}): PlayerComponent {
    return {
      characterClass: 'samurai',
      level: 1,
      experience: 0,
      skillPoints: 0,
      learnedSkills: [],
      equippedAbilities: [],
      inputBuffer: [],
      comboState: {
        currentCombo: [],
        comboTimer: 0,
        maxComboTime: 2.0,
        comboMultiplier: 1.0
      },
      dashCooldown: 0,
      canDoubleJump: false,
      hasDoubleJumped: false,
      ...overrides
    };
  }

  static createProjectileComponent(overrides: Partial<ProjectileComponent> = {}): ProjectileComponent {
    return {
      damage: 25,
      speed: 300,
      lifetime: 3.0,
      piercing: false,
      homing: false,
      homingStrength: 0.5,
      trail: false,
      trailColor: '#ffffff',
      ...overrides
    };
  }

  static createColliderComponent(overrides: Partial<ColliderComponent> = {}): ColliderComponent {
    return {
      type: 'enemy',
      layer: 0,
      isTrigger: false,
      ...overrides
    };
  }

  static createAnimationComponent(overrides: Partial<AnimationComponent> = {}): AnimationComponent {
    return {
      currentAnimation: 'idle',
      animations: new Map(),
      currentFrame: 0,
      currentTime: 0,
      frameTime: 0.1,
      frameCount: 1,
      loop: true,
      playing: true,
      ...overrides
    };
  }
}