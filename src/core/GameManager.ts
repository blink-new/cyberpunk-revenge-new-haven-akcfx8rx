// Game Manager - Central game state and logic coordinator
// This class orchestrates all game systems and provides a clean interface for C++ porting

import { GameEngine, GameEntity, Vector2 } from './GameEngine';
import { AbilitySystem } from './AbilitySystem';
import { LevelSystem, LevelData } from './LevelSystem';
import { ComponentFactory } from './GameComponents';
import { GAME_CONFIG, GameConstants } from './GameConstants';
import { CharacterClass, Difficulty } from '../types/game';

export interface GameState {
  isRunning: boolean;
  isPaused: boolean;
  currentLevel: number;
  difficulty: Difficulty;
  score: number;
  gameTime: number;
  playerEntity: GameEntity | null;
  cameraPosition: Vector2;
  inputState: InputState;
}

export interface InputState {
  moveLeft: boolean;
  moveRight: boolean;
  moveUp: boolean;
  moveDown: boolean;
  jump: boolean;
  attack: boolean;
  dash: boolean;
  abilities: boolean[];
  lastInputTime: number;
}

export interface PlayerStats {
  characterClass: CharacterClass;
  level: number;
  experience: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  strength: number;
  agility: number;
  intelligence: number;
  vitality: number;
  defense: number;
  magic: number;
  luck: number;
  skillPoints: number;
  learnedSkills: string[];
  equippedAbilities: string[];
}

export class GameManager {
  private engine: GameEngine;
  private abilitySystem: AbilitySystem;
  private levelSystem: LevelSystem;
  private gameState: GameState;
  private playerStats: PlayerStats;
  private eventListeners: Map<string, Function[]> = new Map();

  constructor() {
    this.engine = new GameEngine();
    this.abilitySystem = new AbilitySystem();
    this.levelSystem = new LevelSystem();
    
    this.gameState = this.createInitialGameState();
    this.playerStats = this.createInitialPlayerStats();
    
    this.initializeEventListeners();
  }

  private createInitialGameState(): GameState {
    return {
      isRunning: false,
      isPaused: false,
      currentLevel: 1,
      difficulty: 'normal',
      score: 0,
      gameTime: 0,
      playerEntity: null,
      cameraPosition: { x: 0, y: 0 },
      inputState: {
        moveLeft: false,
        moveRight: false,
        moveUp: false,
        moveDown: false,
        jump: false,
        attack: false,
        dash: false,
        abilities: new Array(6).fill(false),
        lastInputTime: 0
      }
    };
  }

  private createInitialPlayerStats(): PlayerStats {
    return {
      characterClass: 'samurai',
      level: 1,
      experience: 0,
      health: 100,
      maxHealth: 100,
      mana: 50,
      maxMana: 50,
      strength: 15,
      agility: 12,
      intelligence: 10,
      vitality: 14,
      defense: 12,
      magic: 8,
      luck: 10,
      skillPoints: 1,
      learnedSkills: [],
      equippedAbilities: []
    };
  }

  private initializeEventListeners(): void {
    // Initialize event system for decoupled communication
    this.eventListeners.set('player_death', []);
    this.eventListeners.set('enemy_death', []);
    this.eventListeners.set('level_complete', []);
    this.eventListeners.set('ability_used', []);
    this.eventListeners.set('item_collected', []);
    this.eventListeners.set('damage_dealt', []);
    this.eventListeners.set('experience_gained', []);
  }

  // Game Lifecycle Methods
  public startGame(): void {
    if (this.gameState.isRunning) return;

    this.gameState.isRunning = true;
    this.gameState.isPaused = false;
    this.gameState.gameTime = 0;

    this.createPlayer();
    this.loadLevel(this.gameState.currentLevel);
    this.engine.start();

    this.emitEvent('game_started', {});
  }

  public pauseGame(): void {
    this.gameState.isPaused = true;
    this.emitEvent('game_paused', {});
  }

  public resumeGame(): void {
    this.gameState.isPaused = false;
    this.emitEvent('game_resumed', {});
  }

  public stopGame(): void {
    this.gameState.isRunning = false;
    this.gameState.isPaused = false;
    this.engine.stop();
    this.emitEvent('game_stopped', {});
  }

  public restartLevel(): void {
    this.loadLevel(this.gameState.currentLevel);
    this.resetPlayer();
    this.emitEvent('level_restarted', { level: this.gameState.currentLevel });
  }

  // Player Management
  public createPlayer(): void {
    const playerTransform = {
      position: { x: 100, y: 200 },
      rotation: 0,
      scale: { x: 1, y: 1 }
    };

    const playerBounds = {
      x: 100,
      y: 200,
      width: GAME_CONFIG.PLAYER_WIDTH,
      height: GAME_CONFIG.PLAYER_HEIGHT
    };

    this.gameState.playerEntity = this.engine.createEntity('player', playerTransform, playerBounds);

    // Add components
    const classStats = GameConstants.getCharacterBaseStats(this.playerStats.characterClass.toUpperCase());
    
    this.engine.addComponent('player', 'physics', ComponentFactory.createPhysicsComponent({
      maxSpeed: classStats?.BASE_SPEED || GAME_CONFIG.PLAYER_SPEED * 25,
      friction: 0.8,
      useGravity: true
    }));

    this.engine.addComponent('player', 'combat', ComponentFactory.createCombatComponent({
      health: this.playerStats.health,
      maxHealth: this.playerStats.maxHealth,
      mana: this.playerStats.mana,
      maxMana: this.playerStats.maxMana,
      damage: classStats?.BASE_DAMAGE || 25,
      defense: classStats?.BASE_DEFENSE || 10
    }));

    this.engine.addComponent('player', 'player', ComponentFactory.createPlayerComponent({
      characterClass: this.playerStats.characterClass,
      level: this.playerStats.level,
      experience: this.playerStats.experience,
      skillPoints: this.playerStats.skillPoints,
      learnedSkills: this.playerStats.learnedSkills,
      equippedAbilities: this.playerStats.equippedAbilities
    }));

    this.engine.addComponent('player', 'collider', ComponentFactory.createColliderComponent({
      type: 'player',
      layer: 1
    }));

    this.engine.addComponent('player', 'animation', ComponentFactory.createAnimationComponent({
      currentAnimation: 'idle'
    }));
  }

  public resetPlayer(): void {
    if (!this.gameState.playerEntity) return;

    // Reset position
    this.gameState.playerEntity.transform.position = { x: 100, y: 200 };

    // Reset health and mana
    const combat = this.engine.getComponent('player', 'combat');
    if (combat) {
      combat.health = combat.maxHealth;
      combat.mana = combat.maxMana;
      combat.statusEffects = [];
    }

    // Reset physics
    const physics = this.engine.getComponent('player', 'physics');
    if (physics) {
      physics.velocity = { x: 0, y: 0 };
      physics.onGround = false;
    }
  }

  public updatePlayerStats(newStats: Partial<PlayerStats>): void {
    this.playerStats = { ...this.playerStats, ...newStats };

    // Update entity components
    if (this.gameState.playerEntity) {
      const combat = this.engine.getComponent('player', 'combat');
      if (combat) {
        combat.maxHealth = this.playerStats.maxHealth;
        combat.maxMana = this.playerStats.maxMana;
        combat.health = Math.min(combat.health, combat.maxHealth);
        combat.mana = Math.min(combat.mana, combat.maxMana);
      }

      const player = this.engine.getComponent('player', 'player');
      if (player) {
        player.level = this.playerStats.level;
        player.experience = this.playerStats.experience;
        player.skillPoints = this.playerStats.skillPoints;
        player.learnedSkills = this.playerStats.learnedSkills;
        player.equippedAbilities = this.playerStats.equippedAbilities;
      }
    }
  }

  // Level Management
  public loadLevel(levelId: number): boolean {
    const success = this.levelSystem.loadLevel(levelId);
    if (!success) return false;

    this.gameState.currentLevel = levelId;
    const levelData = this.levelSystem.getCurrentLevel();
    if (!levelData) return false;

    // Clear existing entities (except player)
    this.clearLevelEntities();

    // Create level entities
    this.createLevelPlatforms(levelData);
    this.createLevelEnemies(levelData);
    this.createLevelPickups(levelData);

    this.emitEvent('level_loaded', { levelId, levelData });
    return true;
  }

  private clearLevelEntities(): void {
    const allEntities = this.engine.getAllEntities();
    allEntities.forEach(entity => {
      if (entity.id !== 'player') {
        this.engine.destroyEntity(entity.id);
      }
    });
  }

  private createLevelPlatforms(levelData: LevelData): void {
    levelData.platforms.forEach((platformData, index) => {
      const platformId = `platform_${index}`;
      const transform = {
        position: platformData.position,
        rotation: 0,
        scale: { x: 1, y: 1 }
      };
      const bounds = {
        x: platformData.position.x,
        y: platformData.position.y,
        width: platformData.size.x,
        height: platformData.size.y
      };

      const platform = this.engine.createEntity(platformId, transform, bounds);
      this.engine.addComponent(platformId, 'platform', {
        type: platformData.type,
        material: platformData.material,
        properties: platformData.properties,
        movementPath: platformData.movementPath,
        movementSpeed: platformData.movementSpeed
      });

      this.engine.addComponent(platformId, 'collider', ComponentFactory.createColliderComponent({
        type: 'platform',
        layer: 0
      }));
    });
  }

  private createLevelEnemies(levelData: LevelData): void {
    levelData.enemies.forEach((enemyData, index) => {
      const enemyId = `enemy_${index}`;
      const transform = {
        position: enemyData.position,
        rotation: 0,
        scale: { x: 1, y: 1 }
      };
      const bounds = {
        x: enemyData.position.x,
        y: enemyData.position.y,
        width: 48,
        height: 64
      };

      const enemy = this.engine.createEntity(enemyId, transform, bounds);

      this.engine.addComponent(enemyId, 'physics', ComponentFactory.createPhysicsComponent({
        maxSpeed: 100,
        friction: 0.8,
        useGravity: true
      }));

      this.engine.addComponent(enemyId, 'combat', ComponentFactory.createCombatComponent({
        health: enemyData.health,
        maxHealth: enemyData.health,
        damage: enemyData.damage,
        defense: Math.floor(enemyData.level * 2),
        onDeath: (entity: GameEntity) => this.handleEnemyDeath(entity)
      }));

      this.engine.addComponent(enemyId, 'ai', ComponentFactory.createAIComponent({
        state: 'patrol',
        detectionRange: 200,
        attackRange: 60,
        moveSpeed: 80
      }));

      this.engine.addComponent(enemyId, 'collider', ComponentFactory.createColliderComponent({
        type: 'enemy',
        layer: 1
      }));

      this.engine.addComponent(enemyId, 'animation', ComponentFactory.createAnimationComponent({
        currentAnimation: 'idle'
      }));
    });
  }

  private createLevelPickups(levelData: LevelData): void {
    levelData.pickups.forEach((pickupData, index) => {
      const pickupId = `pickup_${index}`;
      const transform = {
        position: pickupData.position,
        rotation: 0,
        scale: { x: 1, y: 1 }
      };
      const bounds = {
        x: pickupData.position.x,
        y: pickupData.position.y,
        width: 24,
        height: 24
      };

      const pickup = this.engine.createEntity(pickupId, transform, bounds);

      this.engine.addComponent(pickupId, 'loot', {
        itemId: pickupData.itemId || pickupData.type,
        rarity: 'epic',
        autoPickup: true,
        pickupRange: 50,
        value: pickupData.value,
        onPickup: (player: GameEntity) => this.handleItemPickup(pickupData, player)
      });

      this.engine.addComponent(pickupId, 'collider', ComponentFactory.createColliderComponent({
        type: 'pickup',
        layer: 2,
        isTrigger: true
      }));
    });
  }

  // Input Handling
  public handleInput(inputType: string, pressed: boolean): void {
    const currentTime = performance.now();
    this.gameState.inputState.lastInputTime = currentTime;

    switch (inputType) {
      case 'move_left':
        this.gameState.inputState.moveLeft = pressed;
        break;
      case 'move_right':
        this.gameState.inputState.moveRight = pressed;
        break;
      case 'move_up':
        this.gameState.inputState.moveUp = pressed;
        break;
      case 'move_down':
        this.gameState.inputState.moveDown = pressed;
        break;
      case 'jump':
        this.gameState.inputState.jump = pressed;
        if (pressed) this.handleJump();
        break;
      case 'attack':
        this.gameState.inputState.attack = pressed;
        if (pressed) this.handleAttack();
        break;
      case 'dash':
        this.gameState.inputState.dash = pressed;
        if (pressed) this.handleDash();
        break;
      default:
        // Handle ability inputs (ability_0 through ability_5)
        if (inputType.startsWith('ability_')) {
          const abilityIndex = parseInt(inputType.split('_')[1]);
          if (abilityIndex >= 0 && abilityIndex < 6) {
            this.gameState.inputState.abilities[abilityIndex] = pressed;
            if (pressed) this.handleAbility(abilityIndex);
          }
        }
        break;
    }

    // Update player movement
    this.updatePlayerMovement();
  }

  private updatePlayerMovement(): void {
    if (!this.gameState.playerEntity) return;

    const physics = this.engine.getComponent('player', 'physics');
    if (!physics) return;

    const input = this.gameState.inputState;
    let moveX = 0;

    if (input.moveLeft) moveX -= 1;
    if (input.moveRight) moveX += 1;

    physics.velocity.x = moveX * GAME_CONFIG.PLAYER_SPEED;

    // Update facing direction
    if (moveX !== 0) {
      this.gameState.playerEntity.transform.rotation = moveX > 0 ? 0 : 180;
    }
  }

  private handleJump(): void {
    if (!this.gameState.playerEntity) return;

    const physics = this.engine.getComponent('player', 'physics');
    const player = this.engine.getComponent('player', 'player');
    
    if (!physics || !player) return;

    if (physics.onGround) {
      physics.velocity.y = -GAME_CONFIG.JUMP_FORCE;
      physics.onGround = false;
    } else if (player.canDoubleJump && !player.hasDoubleJumped) {
      physics.velocity.y = -GAME_CONFIG.DOUBLE_JUMP_FORCE;
      player.hasDoubleJumped = true;
    }
  }

  private handleAttack(): void {
    if (!this.gameState.playerEntity) return;

    const combat = this.engine.getComponent('player', 'combat');
    if (!combat || combat.attackCooldown > 0) return;

    // Basic attack
    const damage = combat.damage + Math.floor(Math.random() * 10);
    const range = 80;

    // Find enemies in range
    const enemies = this.engine.getEntitiesWithComponent('ai');
    enemies.forEach(enemy => {
      const distance = this.getDistance(
        this.gameState.playerEntity!.transform.position,
        enemy.transform.position
      );

      if (distance < range) {
        this.dealDamage(this.gameState.playerEntity!, enemy, damage);
      }
    });

    combat.attackCooldown = combat.maxAttackCooldown;
    this.emitEvent('player_attack', { damage, range });
  }

  private handleDash(): void {
    if (!this.gameState.playerEntity) return;

    const player = this.engine.getComponent('player', 'player');
    const physics = this.engine.getComponent('player', 'physics');
    
    if (!player || !physics || player.dashCooldown > 0) return;

    const dashDirection = this.gameState.playerEntity.transform.rotation === 0 ? 1 : -1;
    const dashDistance = GAME_CONFIG.DASH_DISTANCE;

    this.gameState.playerEntity.transform.position.x += dashDirection * dashDistance;
    player.dashCooldown = GAME_CONFIG.DASH_COOLDOWN;

    this.emitEvent('player_dash', { direction: dashDirection, distance: dashDistance });
  }

  private handleAbility(abilityIndex: number): void {
    if (!this.gameState.playerEntity) return;

    const player = this.engine.getComponent('player', 'player');
    if (!player || abilityIndex >= player.equippedAbilities.length) return;

    const abilityId = player.equippedAbilities[abilityIndex];
    if (!abilityId) return;

    const success = this.abilitySystem.useAbility(abilityId, this.gameState.playerEntity);
    if (success) {
      this.emitEvent('ability_used', { abilityId, abilityIndex });
    }
  }

  // Combat System
  private dealDamage(attacker: GameEntity, target: GameEntity, damage: number): void {
    const targetCombat = target.components.get('combat');
    if (!targetCombat) return;

    const finalDamage = Math.max(1, damage - (targetCombat.defense || 0));
    targetCombat.health -= finalDamage;

    this.emitEvent('damage_dealt', { attacker: attacker.id, target: target.id, damage: finalDamage });

    if (targetCombat.health <= 0) {
      target.active = false;
      if (target.components.has('ai')) {
        this.handleEnemyDeath(target);
      } else if (target.id === 'player') {
        this.handlePlayerDeath();
      }
    }
  }

  private handleEnemyDeath(enemy: GameEntity): void {
    const combat = enemy.components.get('combat');
    const ai = enemy.components.get('ai');
    
    if (combat) {
      // Award experience
      const experience = combat.maxHealth;
      this.addExperience(experience);

      // Award score
      this.gameState.score += combat.maxHealth * 10;
    }

    // Check level completion
    this.checkLevelCompletion();

    this.emitEvent('enemy_death', { enemyId: enemy.id });
  }

  private handlePlayerDeath(): void {
    this.gameState.isPaused = true;
    this.emitEvent('player_death', {});
  }

  private handleItemPickup(pickupData: any, player: GameEntity): void {
    switch (pickupData.type) {
      case 'health':
        const combat = player.components.get('combat');
        if (combat) {
          combat.health = Math.min(combat.maxHealth, combat.health + pickupData.value);
        }
        break;
      case 'mana':
        const playerCombat = player.components.get('combat');
        if (playerCombat) {
          playerCombat.mana = Math.min(playerCombat.maxMana, playerCombat.mana + pickupData.value);
        }
        break;
      case 'currency':
        this.gameState.score += pickupData.value;
        break;
      case 'equipment':
        // Handle equipment pickup
        break;
    }

    this.emitEvent('item_collected', { type: pickupData.type, value: pickupData.value });
  }

  // Experience and Leveling
  public addExperience(amount: number): void {
    this.playerStats.experience += amount;
    
    const requiredExp = GameConstants.getExperienceRequired(this.playerStats.level + 1);
    if (this.playerStats.experience >= requiredExp && this.playerStats.level < GAME_CONFIG.LEVEL_PROGRESSION.MAX_LEVEL) {
      this.levelUp();
    }

    this.emitEvent('experience_gained', { amount, total: this.playerStats.experience });
  }

  private levelUp(): void {
    this.playerStats.level++;
    this.playerStats.skillPoints += GAME_CONFIG.LEVEL_PROGRESSION.SKILL_POINTS_PER_LEVEL;

    // Increase stats
    const statIncrease = GAME_CONFIG.LEVEL_PROGRESSION.STAT_POINTS_PER_LEVEL;
    this.playerStats.strength += Math.floor(statIncrease * 0.2);
    this.playerStats.agility += Math.floor(statIncrease * 0.15);
    this.playerStats.intelligence += Math.floor(statIncrease * 0.15);
    this.playerStats.vitality += Math.floor(statIncrease * 0.2);
    this.playerStats.defense += Math.floor(statIncrease * 0.15);
    this.playerStats.magic += Math.floor(statIncrease * 0.1);
    this.playerStats.luck += Math.floor(statIncrease * 0.05);

    // Increase health and mana
    const healthIncrease = this.playerStats.vitality * 5;
    const manaIncrease = this.playerStats.intelligence * 3;
    
    this.playerStats.maxHealth += healthIncrease;
    this.playerStats.maxMana += manaIncrease;
    this.playerStats.health = this.playerStats.maxHealth;
    this.playerStats.mana = this.playerStats.maxMana;

    this.updatePlayerStats(this.playerStats);
    this.emitEvent('level_up', { newLevel: this.playerStats.level });
  }

  // Utility Methods
  private getDistance(pos1: Vector2, pos2: Vector2): number {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private checkLevelCompletion(): void {
    const aliveEnemies = this.engine.getEntitiesWithComponent('ai').filter(e => e.active);
    if (aliveEnemies.length === 0) {
      this.completeLevel();
    }
  }

  private completeLevel(): void {
    this.gameState.isPaused = true;
    
    const levelData = this.levelSystem.getCurrentLevel();
    if (levelData) {
      // Award completion bonuses
      this.gameState.score += 1000;
      this.addExperience(200 + (this.gameState.currentLevel * 50));
    }

    this.emitEvent('level_complete', { level: this.gameState.currentLevel });
  }

  // Event System
  public addEventListener(eventType: string, callback: Function): void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);
    }
    this.eventListeners.get(eventType)!.push(callback);
  }

  public removeEventListener(eventType: string, callback: Function): void {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emitEvent(eventType: string, data: any): void {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  // Public Getters
  public getGameState(): GameState {
    return { ...this.gameState };
  }

  public getPlayerStats(): PlayerStats {
    return { ...this.playerStats };
  }

  public getEngine(): GameEngine {
    return this.engine;
  }

  public getAbilitySystem(): AbilitySystem {
    return this.abilitySystem;
  }

  public getLevelSystem(): LevelSystem {
    return this.levelSystem;
  }

  public getCurrentLevel(): LevelData | null {
    return this.levelSystem.getCurrentLevel();
  }

  public getPlayerEntity(): GameEntity | null {
    return this.gameState.playerEntity;
  }

  public getCameraPosition(): Vector2 {
    return { ...this.gameState.cameraPosition };
  }

  public updateCamera(): void {
    if (this.gameState.playerEntity) {
      this.gameState.cameraPosition.x = Math.max(
        0,
        Math.min(
          this.gameState.playerEntity.transform.position.x - 600,
          GAME_CONFIG.WORLD_WIDTH - 1200
        )
      );
    }
  }
}