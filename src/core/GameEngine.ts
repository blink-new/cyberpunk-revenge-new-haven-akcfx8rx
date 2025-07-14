// Core Game Engine - Modular architecture for easy C++ porting
// This file contains the main game engine logic that can be easily translated to Godot/C++

export interface Vector2 {
  x: number;
  y: number;
}

export interface Transform {
  position: Vector2;
  rotation: number;
  scale: Vector2;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GameEntity {
  id: string;
  transform: Transform;
  bounds: Bounds;
  active: boolean;
  components: Map<string, any>;
}

export class GameEngine {
  private entities: Map<string, GameEntity> = new Map();
  private systems: Map<string, GameSystem> = new Map();
  private deltaTime: number = 0;
  private lastFrameTime: number = 0;
  private isRunning: boolean = false;

  // Core engine constants
  static readonly GRAVITY = 0.8;
  static readonly TERMINAL_VELOCITY = 20;
  static readonly WORLD_WIDTH = 2000;
  static readonly WORLD_HEIGHT = 600;
  static readonly TILE_SIZE = 32;

  constructor() {
    this.initializeSystems();
  }

  private initializeSystems(): void {
    this.systems.set('physics', new PhysicsSystem());
    this.systems.set('collision', new CollisionSystem());
    this.systems.set('combat', new CombatSystem());
    this.systems.set('ai', new AISystem());
    this.systems.set('animation', new AnimationSystem());
    this.systems.set('audio', new AudioSystem());
    this.systems.set('particles', new ParticleSystem());
  }

  public start(): void {
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.gameLoop();
  }

  public stop(): void {
    this.isRunning = false;
  }

  private gameLoop(): void {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    this.deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;

    this.update();
    requestAnimationFrame(() => this.gameLoop());
  }

  private update(): void {
    // Update all systems in order
    this.systems.get('physics')?.update(this.deltaTime, this.entities);
    this.systems.get('collision')?.update(this.deltaTime, this.entities);
    this.systems.get('combat')?.update(this.deltaTime, this.entities);
    this.systems.get('ai')?.update(this.deltaTime, this.entities);
    this.systems.get('animation')?.update(this.deltaTime, this.entities);
    this.systems.get('particles')?.update(this.deltaTime, this.entities);
    this.systems.get('audio')?.update(this.deltaTime, this.entities);
  }

  public createEntity(id: string, transform: Transform, bounds: Bounds): GameEntity {
    const entity: GameEntity = {
      id,
      transform,
      bounds,
      active: true,
      components: new Map()
    };
    
    this.entities.set(id, entity);
    return entity;
  }

  public destroyEntity(id: string): void {
    this.entities.delete(id);
  }

  public getEntity(id: string): GameEntity | undefined {
    return this.entities.get(id);
  }

  public getAllEntities(): GameEntity[] {
    return Array.from(this.entities.values());
  }

  public getEntitiesWithComponent(componentType: string): GameEntity[] {
    return Array.from(this.entities.values()).filter(entity => 
      entity.components.has(componentType)
    );
  }

  public addComponent(entityId: string, componentType: string, component: any): void {
    const entity = this.entities.get(entityId);
    if (entity) {
      entity.components.set(componentType, component);
    }
  }

  public removeComponent(entityId: string, componentType: string): void {
    const entity = this.entities.get(entityId);
    if (entity) {
      entity.components.delete(componentType);
    }
  }

  public getComponent<T>(entityId: string, componentType: string): T | undefined {
    const entity = this.entities.get(entityId);
    return entity?.components.get(componentType) as T;
  }

  public getDeltaTime(): number {
    return this.deltaTime;
  }
}

// Base System class - all game systems inherit from this
export abstract class GameSystem {
  abstract update(deltaTime: number, entities: Map<string, GameEntity>): void;
}

// Physics System - handles movement, gravity, and basic physics
export class PhysicsSystem extends GameSystem {
  update(deltaTime: number, entities: Map<string, GameEntity>): void {
    entities.forEach(entity => {
      const physics = entity.components.get('physics');
      if (!physics) return;

      // Apply gravity
      if (!physics.onGround && physics.useGravity) {
        physics.velocity.y += GameEngine.GRAVITY;
        physics.velocity.y = Math.min(physics.velocity.y, GameEngine.TERMINAL_VELOCITY);
      }

      // Apply friction
      if (physics.onGround) {
        physics.velocity.x *= physics.friction || 0.8;
      }

      // Update position
      entity.transform.position.x += physics.velocity.x * deltaTime * 60;
      entity.transform.position.y += physics.velocity.y * deltaTime * 60;

      // Update bounds
      entity.bounds.x = entity.transform.position.x;
      entity.bounds.y = entity.transform.position.y;
    });
  }
}

// Collision System - handles all collision detection and response
export class CollisionSystem extends GameSystem {
  update(deltaTime: number, entities: Map<string, GameEntity>): void {
    const physicsEntities = Array.from(entities.values()).filter(e => 
      e.components.has('physics') && e.components.has('collider')
    );

    // Check collisions between all physics entities
    for (let i = 0; i < physicsEntities.length; i++) {
      for (let j = i + 1; j < physicsEntities.length; j++) {
        const entityA = physicsEntities[i];
        const entityB = physicsEntities[j];
        
        if (this.checkCollision(entityA.bounds, entityB.bounds)) {
          this.resolveCollision(entityA, entityB);
        }
      }
    }

    // Check platform collisions
    const platforms = Array.from(entities.values()).filter(e => 
      e.components.has('platform')
    );
    
    physicsEntities.forEach(entity => {
      const physics = entity.components.get('physics');
      physics.onGround = false;
      
      platforms.forEach(platform => {
        if (this.checkCollision(entity.bounds, platform.bounds)) {
          this.resolvePlatformCollision(entity, platform);
        }
      });
    });
  }

  private checkCollision(boundsA: Bounds, boundsB: Bounds): boolean {
    return boundsA.x < boundsB.x + boundsB.width &&
           boundsA.x + boundsA.width > boundsB.x &&
           boundsA.y < boundsB.y + boundsB.height &&
           boundsA.y + boundsA.height > boundsB.y;
  }

  private resolveCollision(entityA: GameEntity, entityB: GameEntity): void {
    const colliderA = entityA.components.get('collider');
    const colliderB = entityB.components.get('collider');
    
    if (colliderA.type === 'player' && colliderB.type === 'enemy') {
      // Handle player-enemy collision
      this.handlePlayerEnemyCollision(entityA, entityB);
    } else if (colliderA.type === 'projectile' && colliderB.type === 'enemy') {
      // Handle projectile-enemy collision
      this.handleProjectileEnemyCollision(entityA, entityB);
    }
  }

  private resolvePlatformCollision(entity: GameEntity, platform: GameEntity): void {
    const physics = entity.components.get('physics');
    const entityBounds = entity.bounds;
    const platformBounds = platform.bounds;

    // Landing on top of platform
    if (physics.velocity.y > 0 && entityBounds.y < platformBounds.y) {
      entity.transform.position.y = platformBounds.y - entityBounds.height;
      physics.velocity.y = 0;
      physics.onGround = true;
    }
    // Hitting platform from below
    else if (physics.velocity.y < 0 && entityBounds.y > platformBounds.y) {
      entity.transform.position.y = platformBounds.y + platformBounds.height;
      physics.velocity.y = 0;
    }
    // Hitting platform from side
    else if (physics.velocity.x > 0 && entityBounds.x < platformBounds.x) {
      entity.transform.position.x = platformBounds.x - entityBounds.width;
      physics.velocity.x = 0;
    }
    else if (physics.velocity.x < 0 && entityBounds.x > platformBounds.x) {
      entity.transform.position.x = platformBounds.x + platformBounds.width;
      physics.velocity.x = 0;
    }
  }

  private handlePlayerEnemyCollision(player: GameEntity, enemy: GameEntity): void {
    // Emit collision event for combat system to handle
    const combatEvent = {
      type: 'collision',
      attacker: enemy,
      target: player,
      damage: enemy.components.get('combat')?.damage || 10
    };
    
    // This would be handled by an event system in a full implementation
    console.log('Player-Enemy collision detected');
  }

  private handleProjectileEnemyCollision(projectile: GameEntity, enemy: GameEntity): void {
    const combatEvent = {
      type: 'projectile_hit',
      attacker: projectile,
      target: enemy,
      damage: projectile.components.get('combat')?.damage || 25
    };
    
    // Mark projectile for destruction
    projectile.active = false;
    console.log('Projectile-Enemy collision detected');
  }
}

// Combat System - handles damage, health, and combat mechanics
export class CombatSystem extends GameSystem {
  update(deltaTime: number, entities: Map<string, GameEntity>): void {
    entities.forEach(entity => {
      const combat = entity.components.get('combat');
      if (!combat) return;

      // Update cooldowns
      if (combat.attackCooldown > 0) {
        combat.attackCooldown -= deltaTime;
      }

      // Update status effects
      if (combat.statusEffects) {
        combat.statusEffects = combat.statusEffects.filter((effect: any) => {
          effect.duration -= deltaTime;
          
          // Apply effect damage
          if (effect.type === 'poison' && effect.tickTimer <= 0) {
            combat.health -= effect.damage;
            effect.tickTimer = 1.0; // 1 second tick
          } else if (effect.tickTimer > 0) {
            effect.tickTimer -= deltaTime;
          }
          
          return effect.duration > 0;
        });
      }

      // Check for death
      if (combat.health <= 0 && entity.active) {
        entity.active = false;
        this.handleEntityDeath(entity);
      }
    });
  }

  private handleEntityDeath(entity: GameEntity): void {
    const combat = entity.components.get('combat');
    if (combat?.onDeath) {
      combat.onDeath(entity);
    }
  }

  public dealDamage(attacker: GameEntity, target: GameEntity, damage: number): void {
    const targetCombat = target.components.get('combat');
    if (!targetCombat) return;

    const finalDamage = Math.max(1, damage - (targetCombat.defense || 0));
    targetCombat.health -= finalDamage;

    // Emit damage event for UI updates
    console.log(`${attacker.id} dealt ${finalDamage} damage to ${target.id}`);
  }

  public applyStatusEffect(target: GameEntity, effect: any): void {
    const combat = target.components.get('combat');
    if (!combat) return;

    if (!combat.statusEffects) {
      combat.statusEffects = [];
    }

    combat.statusEffects.push(effect);
  }
}

// AI System - handles enemy AI behavior
export class AISystem extends GameSystem {
  update(deltaTime: number, entities: Map<string, GameEntity>): void {
    const aiEntities = Array.from(entities.values()).filter(e => 
      e.components.has('ai') && e.active
    );

    const players = Array.from(entities.values()).filter(e => 
      e.components.has('player') && e.active
    );

    if (players.length === 0) return;
    const player = players[0];

    aiEntities.forEach(entity => {
      const ai = entity.components.get('ai');
      const physics = entity.components.get('physics');
      const combat = entity.components.get('combat');
      
      if (!ai || !physics) return;

      const distanceToPlayer = this.getDistance(entity.transform.position, player.transform.position);
      
      switch (ai.state) {
        case 'patrol':
          this.handlePatrolState(entity, ai, physics);
          if (distanceToPlayer < ai.detectionRange) {
            ai.state = 'chase';
            ai.target = player;
          }
          break;
          
        case 'chase':
          this.handleChaseState(entity, ai, physics, player);
          if (distanceToPlayer > ai.detectionRange * 1.5) {
            ai.state = 'patrol';
            ai.target = null;
          } else if (distanceToPlayer < ai.attackRange && combat?.attackCooldown <= 0) {
            ai.state = 'attack';
          }
          break;
          
        case 'attack':
          this.handleAttackState(entity, ai, combat, player);
          ai.state = 'chase';
          break;
      }
    });
  }

  private getDistance(pos1: Vector2, pos2: Vector2): number {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private handlePatrolState(entity: GameEntity, ai: any, physics: any): void {
    // Simple patrol behavior
    if (!ai.patrolDirection) {
      ai.patrolDirection = Math.random() > 0.5 ? 1 : -1;
    }
    
    physics.velocity.x = ai.patrolDirection * ai.moveSpeed * 0.5;
    
    // Change direction occasionally
    if (Math.random() < 0.01) {
      ai.patrolDirection *= -1;
    }
  }

  private handleChaseState(entity: GameEntity, ai: any, physics: any, target: GameEntity): void {
    const direction = target.transform.position.x > entity.transform.position.x ? 1 : -1;
    physics.velocity.x = direction * ai.moveSpeed;
    
    // Jump if target is above
    if (target.transform.position.y < entity.transform.position.y - 50 && physics.onGround) {
      physics.velocity.y = -15;
    }
  }

  private handleAttackState(entity: GameEntity, ai: any, combat: any, target: GameEntity): void {
    // Perform attack
    if (combat) {
      combat.attackCooldown = combat.maxAttackCooldown || 2.0;
      // Deal damage to target
      const targetCombat = target.components.get('combat');
      if (targetCombat) {
        targetCombat.health -= combat.damage || 10;
      }
    }
  }
}

// Animation System - handles sprite animations
export class AnimationSystem extends GameSystem {
  update(deltaTime: number, entities: Map<string, GameEntity>): void {
    entities.forEach(entity => {
      const animation = entity.components.get('animation');
      if (!animation) return;

      animation.currentTime += deltaTime;
      
      if (animation.currentTime >= animation.frameTime) {
        animation.currentFrame = (animation.currentFrame + 1) % animation.frameCount;
        animation.currentTime = 0;
      }
    });
  }
}

// Audio System - handles sound effects and music
export class AudioSystem extends GameSystem {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();

  constructor() {
    super();
    this.initializeAudio();
  }

  private initializeAudio(): void {
    try {
      this.audioContext = new AudioContext();
    } catch (error) {
      console.warn('Audio not supported');
    }
  }

  update(deltaTime: number, entities: Map<string, GameEntity>): void {
    // Handle audio events and 3D positioning
    entities.forEach(entity => {
      const audio = entity.components.get('audio');
      if (!audio) return;

      // Process audio events
      if (audio.pendingEvents) {
        audio.pendingEvents.forEach((event: any) => {
          this.playSound(event.soundId, entity.transform.position);
        });
        audio.pendingEvents = [];
      }
    });
  }

  public playSound(soundId: string, position?: Vector2): void {
    if (!this.audioContext) return;

    const buffer = this.sounds.get(soundId);
    if (!buffer) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    
    if (position) {
      // 3D audio positioning would go here
    }
    
    source.connect(this.audioContext.destination);
    source.start();
  }
}

// Particle System - handles visual effects
export class ParticleSystem extends GameSystem {
  private particles: any[] = [];

  update(deltaTime: number, entities: Map<string, GameEntity>): void {
    // Update existing particles
    this.particles = this.particles.filter(particle => {
      particle.life -= deltaTime;
      particle.position.x += particle.velocity.x * deltaTime;
      particle.position.y += particle.velocity.y * deltaTime;
      particle.velocity.y += particle.gravity * deltaTime;
      
      return particle.life > 0;
    });

    // Check for new particle emissions
    entities.forEach(entity => {
      const emitter = entity.components.get('particleEmitter');
      if (!emitter) return;

      emitter.timer -= deltaTime;
      if (emitter.timer <= 0) {
        this.emitParticles(entity, emitter);
        emitter.timer = emitter.emissionRate;
      }
    });
  }

  private emitParticles(entity: GameEntity, emitter: any): void {
    for (let i = 0; i < emitter.particleCount; i++) {
      const particle = {
        position: { ...entity.transform.position },
        velocity: {
          x: (Math.random() - 0.5) * emitter.spread,
          y: (Math.random() - 0.5) * emitter.spread
        },
        life: emitter.particleLife,
        maxLife: emitter.particleLife,
        color: emitter.color,
        size: emitter.size,
        gravity: emitter.gravity || 0
      };
      
      this.particles.push(particle);
    }
  }

  public getParticles(): any[] {
    return this.particles;
  }
}