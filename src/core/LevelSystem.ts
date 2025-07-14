// Level System - Complete level generation and management
// Modular design for easy C++ porting

import { GameEntity, Vector2 } from './GameEngine';
import { GAME_CONFIG, LEVEL_CONFIG } from './GameConstants';
import { CharacterClass, Difficulty } from '../types/game';

export interface LevelData {
  id: number;
  name: string;
  description: string;
  environment: EnvironmentType;
  difficulty: Difficulty;
  requiredLevel: number;
  isBossLevel: boolean;
  enemies: EnemySpawnData[];
  platforms: PlatformData[];
  pickups: PickupData[];
  objectives: LevelObjective[];
  backgroundMusic: string;
  ambientSounds: string[];
  weatherEffects: WeatherEffect[];
  lighting: LightingData;
  bounds: LevelBounds;
}

export type EnvironmentType = 
  | 'street' 
  | 'building' 
  | 'underground' 
  | 'rooftop' 
  | 'factory' 
  | 'neon_city' 
  | 'cyber_night' 
  | 'toxic_wasteland' 
  | 'digital_realm' 
  | 'void_space';

export interface EnemySpawnData {
  enemyType: string;
  position: Vector2;
  level: number;
  health: number;
  damage: number;
  aiType: string;
  lootTable: string[];
  spawnDelay: number;
  respawnTime: number;
  patrolPath?: Vector2[];
  triggerCondition?: SpawnCondition;
}

export interface SpawnCondition {
  type: 'time' | 'player_position' | 'enemy_death' | 'objective_complete';
  value: any;
}

export interface PlatformData {
  position: Vector2;
  size: Vector2;
  type: PlatformType;
  material: MaterialType;
  properties: PlatformProperties;
  movementPath?: Vector2[];
  movementSpeed?: number;
}

export type PlatformType = 'solid' | 'oneway' | 'moving' | 'breakable' | 'hazard' | 'teleporter';
export type MaterialType = 'metal' | 'stone' | 'wood' | 'energy' | 'ice' | 'lava' | 'glass';

export interface PlatformProperties {
  friction: number;
  bounce: number;
  damage?: number;
  statusEffect?: string;
  breakable?: boolean;
  health?: number;
  teleportTarget?: Vector2;
}

export interface PickupData {
  type: 'health' | 'mana' | 'currency' | 'equipment' | 'consumable' | 'key';
  position: Vector2;
  itemId?: string;
  value: number;
  respawnTime: number;
  hidden: boolean;
  requiresKey?: string;
}

export interface LevelObjective {
  id: string;
  type: 'kill_all' | 'kill_boss' | 'reach_exit' | 'collect_items' | 'survive_time' | 'protect_npc';
  description: string;
  target: string | number;
  current: number;
  required: number;
  completed: boolean;
  optional: boolean;
  reward?: ObjectiveReward;
}

export interface ObjectiveReward {
  experience: number;
  currency: number;
  items: string[];
  skillPoints: number;
}

export interface WeatherEffect {
  type: 'rain' | 'snow' | 'fog' | 'storm' | 'acid_rain' | 'cyber_storm';
  intensity: number;
  duration: number;
  effects: EnvironmentEffect[];
}

export interface EnvironmentEffect {
  type: 'visibility' | 'movement' | 'damage' | 'healing' | 'mana_regen';
  value: number;
  area?: Vector2[];
}

export interface LightingData {
  ambientColor: string;
  ambientIntensity: number;
  lightSources: LightSource[];
  shadows: boolean;
  dynamicLighting: boolean;
}

export interface LightSource {
  position: Vector2;
  color: string;
  intensity: number;
  range: number;
  type: 'point' | 'directional' | 'spot';
  flickering: boolean;
  animated: boolean;
}

export interface LevelBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  deathZones: DeathZone[];
}

export interface DeathZone {
  bounds: { x: number; y: number; width: number; height: number };
  damage: number;
  respawnPoint: Vector2;
}

export class LevelSystem {
  private levels: Map<number, LevelData> = new Map();
  private currentLevel: LevelData | null = null;
  private spawnedEnemies: Map<string, GameEntity> = new Map();
  private activeObjectives: LevelObjective[] = [];
  private levelProgress: Map<number, LevelProgress> = new Map();

  constructor() {
    this.generateAllLevels();
  }

  private generateAllLevels(): void {
    for (let i = 1; i <= LEVEL_CONFIG.TOTAL_LEVELS; i++) {
      const levelData = this.generateLevel(i);
      this.levels.set(i, levelData);
    }
  }

  private generateLevel(levelId: number): LevelData {
    const isBossLevel = LEVEL_CONFIG.BOSS_LEVELS.includes(levelId);
    const environment = this.getEnvironmentForLevel(levelId);
    const difficulty = this.getDifficultyForLevel(levelId);

    return {
      id: levelId,
      name: this.generateLevelName(levelId, environment, isBossLevel),
      description: this.generateLevelDescription(levelId, environment, isBossLevel),
      environment,
      difficulty,
      requiredLevel: Math.max(1, levelId - 2),
      isBossLevel,
      enemies: this.generateEnemies(levelId, environment, isBossLevel),
      platforms: this.generatePlatforms(levelId, environment),
      pickups: this.generatePickups(levelId, environment),
      objectives: this.generateObjectives(levelId, isBossLevel),
      backgroundMusic: this.getBackgroundMusic(environment, isBossLevel),
      ambientSounds: this.getAmbientSounds(environment),
      weatherEffects: this.generateWeatherEffects(environment),
      lighting: this.generateLighting(environment),
      bounds: this.generateLevelBounds(levelId)
    };
  }

  private getEnvironmentForLevel(levelId: number): EnvironmentType {
    const environments: EnvironmentType[] = [
      'street', 'building', 'underground', 'rooftop', 'factory',
      'neon_city', 'cyber_night', 'toxic_wasteland', 'digital_realm', 'void_space'
    ];

    if (levelId <= 10) return 'street';
    if (levelId <= 20) return 'building';
    if (levelId <= 30) return 'underground';
    if (levelId <= 40) return 'rooftop';
    if (levelId <= 50) return 'factory';
    if (levelId <= 60) return 'neon_city';
    if (levelId <= 70) return 'cyber_night';
    if (levelId <= 80) return 'toxic_wasteland';
    if (levelId <= 90) return 'digital_realm';
    return 'void_space';
  }

  private getDifficultyForLevel(levelId: number): Difficulty {
    if (levelId <= 25) return 'normal';
    if (levelId <= 75) return 'difficult';
    return 'impossible';
  }

  private generateLevelName(levelId: number, environment: EnvironmentType, isBoss: boolean): string {
    const environmentNames = {
      street: ['Neon Streets', 'Cyber Alley', 'Gang Territory', 'Downtown Chaos'],
      building: ['Corporate Tower', 'Mega Building', 'Shimoto HQ', 'Tech Facility'],
      underground: ['Sewer System', 'Underground Base', 'Hidden Tunnels', 'Cyber Catacombs'],
      rooftop: ['Sky Bridge', 'Rooftop Chase', 'High Rise', 'Aerial Platform'],
      factory: ['Industrial Zone', 'Manufacturing Plant', 'Robot Factory', 'Assembly Line'],
      neon_city: ['Neon District', 'Electric Avenue', 'Hologram Plaza', 'Cyber Market'],
      cyber_night: ['Night Sector', 'Dark Web', 'Shadow District', 'Midnight Zone'],
      toxic_wasteland: ['Toxic Ruins', 'Radiation Zone', 'Wasteland Outpost', 'Dead Sector'],
      digital_realm: ['Data Stream', 'Virtual Space', 'Code Matrix', 'Digital Void'],
      void_space: ['Void Dimension', 'Null Space', 'Reality Tear', 'Absolute Zero']
    };

    const names = environmentNames[environment];
    const baseName = names[levelId % names.length];

    if (isBoss) {
      return `Boss: ${baseName} Overlord`;
    }

    return `${baseName} - Level ${levelId}`;
  }

  private generateLevelDescription(levelId: number, environment: EnvironmentType, isBoss: boolean): string {
    if (isBoss) {
      return `Face the powerful boss of ${environment}. Prepare for an intense battle!`;
    }

    const descriptions = {
      street: 'Navigate the dangerous neon-lit streets filled with gang members.',
      building: 'Infiltrate the corporate building and fight through security.',
      underground: 'Explore the dark underground tunnels and hidden passages.',
      rooftop: 'Battle across the city rooftops with stunning views.',
      factory: 'Fight through the automated factory filled with robots.',
      neon_city: 'Experience the vibrant neon city with its unique challenges.',
      cyber_night: 'Survive the dangerous cyber night filled with digital threats.',
      toxic_wasteland: 'Traverse the toxic wasteland avoiding radiation and mutants.',
      digital_realm: 'Enter the digital realm where reality bends to code.',
      void_space: 'Face the ultimate challenge in the void between realities.'
    };

    return descriptions[environment];
  }

  private generateEnemies(levelId: number, environment: EnvironmentType, isBoss: boolean): EnemySpawnData[] {
    const enemies: EnemySpawnData[] = [];
    const baseHealth = 50 + (levelId * LEVEL_CONFIG.SCALING.ENEMY_HEALTH_PER_LEVEL);
    const baseDamage = 15 + (levelId * LEVEL_CONFIG.SCALING.ENEMY_DAMAGE_PER_LEVEL);

    if (isBoss) {
      // Generate boss enemy
      enemies.push({
        enemyType: this.getBossTypeForLevel(levelId),
        position: { x: 1500, y: 300 },
        level: levelId,
        health: baseHealth * 5,
        damage: baseDamage * 2,
        aiType: 'boss',
        lootTable: ['legendary_weapon', 'ultimate_armor', 'skill_book'],
        spawnDelay: 0,
        respawnTime: 0
      });

      // Add some minions
      for (let i = 0; i < 3; i++) {
        enemies.push({
          enemyType: this.getRegularEnemyType(environment),
          position: { x: 800 + (i * 200), y: 400 },
          level: levelId - 2,
          health: baseHealth * 0.7,
          damage: baseDamage * 0.8,
          aiType: 'aggressive',
          lootTable: ['health_potion', 'mana_potion'],
          spawnDelay: 5 + (i * 3),
          respawnTime: 0
        });
      }
    } else {
      // Generate regular enemies
      const enemyCount = Math.min(5, 2 + Math.floor(levelId / 10));
      
      for (let i = 0; i < enemyCount; i++) {
        enemies.push({
          enemyType: this.getRegularEnemyType(environment),
          position: { x: 400 + (i * 300), y: 400 },
          level: levelId,
          health: baseHealth + (Math.random() * 20 - 10),
          damage: baseDamage + (Math.random() * 5 - 2),
          aiType: Math.random() > 0.7 ? 'aggressive' : 'patrol',
          lootTable: this.generateLootTable(levelId),
          spawnDelay: i * 2,
          respawnTime: 0,
          patrolPath: this.generatePatrolPath(i)
        });
      }
    }

    return enemies;
  }

  private getBossTypeForLevel(levelId: number): string {
    const bossTypes = [
      'lieutenant_kazuo', 'enforcer_mech', 'phantom_assassin', 'data_wraith',
      'storm_lord', 'void_hunter', 'tech_shaman', 'death_knight',
      'dragon_mech', 'shimoto_boss', 'quantum_overlord', 'shadow_emperor',
      'cyber_god', 'nightmare_king', 'final_destroyer', 'ultimate_nemesis',
      'chaos_incarnate', 'infinity_warden', 'genesis_destroyer', 'absolute_zero'
    ];

    const bossIndex = Math.floor((levelId - 1) / 5);
    return bossTypes[Math.min(bossIndex, bossTypes.length - 1)];
  }

  private getRegularEnemyType(environment: EnvironmentType): string {
    const enemyTypes = {
      street: ['street_thug', 'cyber_punk', 'gang_enforcer'],
      building: ['security_guard', 'corporate_soldier', 'cyber_soldier'],
      underground: ['sewer_mutant', 'underground_fighter', 'tunnel_rat'],
      rooftop: ['roof_sniper', 'flying_drone', 'parkour_assassin'],
      factory: ['security_robot', 'worker_bot', 'assembly_drone'],
      neon_city: ['neon_warrior', 'hologram_fighter', 'cyber_citizen'],
      cyber_night: ['night_stalker', 'shadow_operative', 'digital_ghost'],
      toxic_wasteland: ['mutant_beast', 'radiation_zombie', 'toxic_crawler'],
      digital_realm: ['data_construct', 'virus_entity', 'code_guardian'],
      void_space: ['void_entity', 'null_being', 'reality_fragment']
    };

    const types = enemyTypes[environment];
    return types[Math.floor(Math.random() * types.length)];
  }

  private generateLootTable(levelId: number): string[] {
    const loot = ['health_potion', 'mana_potion'];
    
    if (levelId >= 10) loot.push('epic_weapon', 'epic_armor');
    if (levelId >= 25) loot.push('legendary_weapon', 'legendary_armor');
    if (levelId >= 50) loot.push('ultimate_weapon', 'ultimate_armor');
    if (levelId >= 75) loot.push('skill_book', 'stat_crystal');

    return loot;
  }

  private generatePatrolPath(index: number): Vector2[] {
    const baseX = 400 + (index * 300);
    return [
      { x: baseX - 100, y: 400 },
      { x: baseX + 100, y: 400 },
      { x: baseX, y: 350 },
      { x: baseX, y: 450 }
    ];
  }

  private generatePlatforms(levelId: number, environment: EnvironmentType): PlatformData[] {
    const platforms: PlatformData[] = [];

    // Ground platform
    platforms.push({
      position: { x: 0, y: 500 },
      size: { x: GAME_CONFIG.WORLD_WIDTH, y: 100 },
      type: 'solid',
      material: this.getMaterialForEnvironment(environment),
      properties: { friction: 0.8, bounce: 0 }
    });

    // Generate additional platforms based on level
    const platformCount = Math.min(15, 5 + Math.floor(levelId / 5));
    
    for (let i = 0; i < platformCount; i++) {
      const x = 150 + (i * 200);
      const y = 400 - (Math.random() * 200);
      const width = 100 + (Math.random() * 100);
      
      platforms.push({
        position: { x, y },
        size: { x: width, y: 30 },
        type: Math.random() > 0.8 ? 'moving' : 'solid',
        material: this.getMaterialForEnvironment(environment),
        properties: this.generatePlatformProperties(environment),
        movementPath: Math.random() > 0.8 ? [
          { x, y },
          { x: x + 100, y },
          { x, y: y - 50 }
        ] : undefined,
        movementSpeed: 50
      });
    }

    // Add hazard platforms for higher levels
    if (levelId >= 20) {
      platforms.push({
        position: { x: 600, y: 480 },
        size: { x: 100, y: 20 },
        type: 'hazard',
        material: 'lava',
        properties: { friction: 0.5, bounce: 0, damage: 10, statusEffect: 'burn' }
      });
    }

    return platforms;
  }

  private getMaterialForEnvironment(environment: EnvironmentType): MaterialType {
    const materials = {
      street: 'stone',
      building: 'metal',
      underground: 'stone',
      rooftop: 'metal',
      factory: 'metal',
      neon_city: 'energy',
      cyber_night: 'energy',
      toxic_wasteland: 'stone',
      digital_realm: 'energy',
      void_space: 'energy'
    };

    return materials[environment];
  }

  private generatePlatformProperties(environment: EnvironmentType): PlatformProperties {
    const baseProperties = { friction: 0.8, bounce: 0 };

    switch (environment) {
      case 'ice':
        return { ...baseProperties, friction: 0.2 };
      case 'toxic_wasteland':
        return { ...baseProperties, damage: 5, statusEffect: 'poison' };
      case 'digital_realm':
        return { ...baseProperties, bounce: 0.3 };
      default:
        return baseProperties;
    }
  }

  private generatePickups(levelId: number, environment: EnvironmentType): PickupData[] {
    const pickups: PickupData[] = [];

    // Health pickups
    for (let i = 0; i < 3; i++) {
      pickups.push({
        type: 'health',
        position: { x: 300 + (i * 400), y: 350 },
        value: 50,
        respawnTime: 30,
        hidden: false
      });
    }

    // Mana pickups
    for (let i = 0; i < 2; i++) {
      pickups.push({
        type: 'mana',
        position: { x: 500 + (i * 600), y: 300 },
        value: 30,
        respawnTime: 25,
        hidden: false
      });
    }

    // Currency
    pickups.push({
      type: 'currency',
      position: { x: 1200, y: 250 },
      value: 100 + (levelId * 10),
      respawnTime: 0,
      hidden: false
    });

    // Equipment (rare)
    if (Math.random() > 0.7) {
      pickups.push({
        type: 'equipment',
        position: { x: 800, y: 200 },
        itemId: this.generateRandomEquipment(levelId),
        value: 0,
        respawnTime: 0,
        hidden: true
      });
    }

    return pickups;
  }

  private generateRandomEquipment(levelId: number): string {
    const rarities = ['epic', 'legendary', 'ultimate'];
    const rarity = rarities[Math.min(Math.floor(levelId / 25), 2)];
    const types = ['weapon', 'armor', 'accessory'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return `${rarity}_${type}_${levelId}`;
  }

  private generateObjectives(levelId: number, isBoss: boolean): LevelObjective[] {
    const objectives: LevelObjective[] = [];

    if (isBoss) {
      objectives.push({
        id: 'kill_boss',
        type: 'kill_boss',
        description: 'Defeat the boss',
        target: 'boss',
        current: 0,
        required: 1,
        completed: false,
        optional: false,
        reward: {
          experience: 500 + (levelId * 50),
          currency: 1000 + (levelId * 100),
          items: ['legendary_weapon'],
          skillPoints: 3
        }
      });
    } else {
      objectives.push({
        id: 'kill_all_enemies',
        type: 'kill_all',
        description: 'Eliminate all enemies',
        target: 'all',
        current: 0,
        required: this.getEnemyCountForLevel(levelId),
        completed: false,
        optional: false,
        reward: {
          experience: 100 + (levelId * 20),
          currency: 200 + (levelId * 20),
          items: [],
          skillPoints: 1
        }
      });
    }

    // Optional objectives
    objectives.push({
      id: 'no_damage',
      type: 'survive_time',
      description: 'Complete without taking damage',
      target: 'player',
      current: 0,
      required: 1,
      completed: false,
      optional: true,
      reward: {
        experience: 200,
        currency: 500,
        items: ['health_potion'],
        skillPoints: 1
      }
    });

    return objectives;
  }

  private getEnemyCountForLevel(levelId: number): number {
    return Math.min(5, 2 + Math.floor(levelId / 10));
  }

  private getBackgroundMusic(environment: EnvironmentType, isBoss: boolean): string {
    if (isBoss) return 'boss_battle_theme';

    const musicTracks = {
      street: 'cyberpunk_streets',
      building: 'corporate_infiltration',
      underground: 'dark_tunnels',
      rooftop: 'sky_high_action',
      factory: 'industrial_beats',
      neon_city: 'neon_nights',
      cyber_night: 'digital_darkness',
      toxic_wasteland: 'wasteland_winds',
      digital_realm: 'data_stream_symphony',
      void_space: 'void_ambience'
    };

    return musicTracks[environment];
  }

  private getAmbientSounds(environment: EnvironmentType): string[] {
    const ambientSounds = {
      street: ['traffic', 'city_noise', 'neon_hum'],
      building: ['air_conditioning', 'elevator_ding', 'keyboard_typing'],
      underground: ['water_drip', 'echo_footsteps', 'pipe_creaking'],
      rooftop: ['wind_howling', 'distant_traffic', 'helicopter'],
      factory: ['machinery_hum', 'steam_hiss', 'metal_clanking'],
      neon_city: ['electronic_buzz', 'hologram_flicker', 'crowd_chatter'],
      cyber_night: ['digital_static', 'data_flow', 'cyber_whispers'],
      toxic_wasteland: ['geiger_counter', 'toxic_bubbling', 'wind_through_ruins'],
      digital_realm: ['data_processing', 'digital_wind', 'code_compilation'],
      void_space: ['void_silence', 'reality_tear', 'dimensional_shift']
    };

    return ambientSounds[environment];
  }

  private generateWeatherEffects(environment: EnvironmentType): WeatherEffect[] {
    const effects: WeatherEffect[] = [];

    switch (environment) {
      case 'cyber_night':
        effects.push({
          type: 'cyber_storm',
          intensity: 0.7,
          duration: 60,
          effects: [
            { type: 'visibility', value: 0.5 },
            { type: 'mana_regen', value: 1.5 }
          ]
        });
        break;
      case 'toxic_wasteland':
        effects.push({
          type: 'acid_rain',
          intensity: 0.8,
          duration: 120,
          effects: [
            { type: 'damage', value: 2 },
            { type: 'visibility', value: 0.7 }
          ]
        });
        break;
      case 'digital_realm':
        effects.push({
          type: 'storm',
          intensity: 0.6,
          duration: 90,
          effects: [
            { type: 'movement', value: 1.2 }
          ]
        });
        break;
    }

    return effects;
  }

  private generateLighting(environment: EnvironmentType): LightingData {
    const baseLighting: LightingData = {
      ambientColor: '#404040',
      ambientIntensity: 0.3,
      lightSources: [],
      shadows: true,
      dynamicLighting: true
    };

    switch (environment) {
      case 'neon_city':
        baseLighting.ambientColor = '#ff00ff';
        baseLighting.ambientIntensity = 0.5;
        baseLighting.lightSources = [
          { position: { x: 200, y: 100 }, color: '#ff1493', intensity: 1.0, range: 200, type: 'point', flickering: true, animated: true },
          { position: { x: 800, y: 150 }, color: '#00bfff', intensity: 0.8, range: 150, type: 'point', flickering: false, animated: true },
          { position: { x: 1400, y: 120 }, color: '#39ff14', intensity: 0.9, range: 180, type: 'point', flickering: true, animated: false }
        ];
        break;
      case 'void_space':
        baseLighting.ambientColor = '#000000';
        baseLighting.ambientIntensity = 0.1;
        baseLighting.lightSources = [
          { position: { x: 1000, y: 300 }, color: '#8a2be2', intensity: 2.0, range: 300, type: 'point', flickering: false, animated: true }
        ];
        break;
      default:
        baseLighting.lightSources = [
          { position: { x: 500, y: 100 }, color: '#ffffff', intensity: 0.8, range: 250, type: 'point', flickering: false, animated: false },
          { position: { x: 1500, y: 100 }, color: '#ffffff', intensity: 0.8, range: 250, type: 'point', flickering: false, animated: false }
        ];
    }

    return baseLighting;
  }

  private generateLevelBounds(levelId: number): LevelBounds {
    return {
      minX: 0,
      maxX: GAME_CONFIG.WORLD_WIDTH,
      minY: 0,
      maxY: GAME_CONFIG.WORLD_HEIGHT,
      deathZones: [
        {
          bounds: { x: 0, y: GAME_CONFIG.WORLD_HEIGHT, width: GAME_CONFIG.WORLD_WIDTH, height: 100 },
          damage: 9999,
          respawnPoint: { x: 100, y: 200 }
        }
      ]
    };
  }

  // Public API methods
  public getLevel(levelId: number): LevelData | undefined {
    return this.levels.get(levelId);
  }

  public getCurrentLevel(): LevelData | null {
    return this.currentLevel;
  }

  public loadLevel(levelId: number): boolean {
    const level = this.levels.get(levelId);
    if (!level) return false;

    this.currentLevel = level;
    this.activeObjectives = [...level.objectives];
    this.spawnedEnemies.clear();

    return true;
  }

  public unloadLevel(): void {
    this.currentLevel = null;
    this.activeObjectives = [];
    this.spawnedEnemies.clear();
  }

  public getObjectives(): LevelObjective[] {
    return this.activeObjectives;
  }

  public updateObjective(objectiveId: string, progress: number): void {
    const objective = this.activeObjectives.find(obj => obj.id === objectiveId);
    if (objective) {
      objective.current = Math.min(objective.required, objective.current + progress);
      objective.completed = objective.current >= objective.required;
    }
  }

  public isLevelComplete(): boolean {
    return this.activeObjectives
      .filter(obj => !obj.optional)
      .every(obj => obj.completed);
  }

  public getLevelProgress(levelId: number): LevelProgress | undefined {
    return this.levelProgress.get(levelId);
  }

  public setLevelProgress(levelId: number, progress: LevelProgress): void {
    this.levelProgress.set(levelId, progress);
  }

  public getUnlockedLevels(playerLevel: number): number[] {
    const unlockedLevels: number[] = [];
    
    for (const [levelId, levelData] of this.levels.entries()) {
      if (playerLevel >= levelData.requiredLevel) {
        unlockedLevels.push(levelId);
      }
    }

    return unlockedLevels.sort((a, b) => a - b);
  }

  public getNextLevel(currentLevelId: number): LevelData | undefined {
    return this.levels.get(currentLevelId + 1);
  }

  public getPreviousLevel(currentLevelId: number): LevelData | undefined {
    return this.levels.get(currentLevelId - 1);
  }

  public getBossLevels(): LevelData[] {
    return Array.from(this.levels.values()).filter(level => level.isBossLevel);
  }

  public getLevelsByEnvironment(environment: EnvironmentType): LevelData[] {
    return Array.from(this.levels.values()).filter(level => level.environment === environment);
  }

  public getLevelsByDifficulty(difficulty: Difficulty): LevelData[] {
    return Array.from(this.levels.values()).filter(level => level.difficulty === difficulty);
  }

  public calculateLevelRating(levelId: number, completionTime: number, damagesTaken: number): LevelRating {
    const level = this.levels.get(levelId);
    if (!level) return { stars: 0, score: 0, bonuses: [] };

    let score = 1000;
    let stars = 1;
    const bonuses: string[] = [];

    // Time bonus
    const expectedTime = 300; // 5 minutes
    if (completionTime < expectedTime * 0.5) {
      score += 500;
      bonuses.push('Speed Demon');
    } else if (completionTime < expectedTime * 0.75) {
      score += 250;
      bonuses.push('Quick Clear');
    }

    // No damage bonus
    if (damagesTaken === 0) {
      score += 1000;
      bonuses.push('Flawless Victory');
      stars = Math.max(stars, 3);
    } else if (damagesTaken < 3) {
      score += 500;
      bonuses.push('Minimal Damage');
      stars = Math.max(stars, 2);
    }

    // All objectives bonus
    const completedObjectives = this.activeObjectives.filter(obj => obj.completed).length;
    const totalObjectives = this.activeObjectives.length;
    if (completedObjectives === totalObjectives) {
      score += 300;
      bonuses.push('Perfect Clear');
      stars = Math.max(stars, 2);
    }

    // Calculate final stars
    if (score >= 2000) stars = 3;
    else if (score >= 1500) stars = 2;

    return { stars, score, bonuses };
  }
}

export interface LevelProgress {
  completed: boolean;
  bestTime: number;
  bestScore: number;
  stars: number;
  objectivesCompleted: string[];
  attempts: number;
  lastPlayed: number;
}

export interface LevelRating {
  stars: number;
  score: number;
  bonuses: string[];
}