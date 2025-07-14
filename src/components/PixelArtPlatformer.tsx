import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGame } from '../contexts/GameContext';
import { SKILL_TREES } from '../data/skillTrees';
import { SkillNode } from '../data/skillTrees';

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  onGround: boolean;
  facingRight: boolean;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  isMoving: boolean;
  isAttacking: boolean;
  animationFrame: number;
}

interface Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  maxHealth: number;
  velocityX: number;
  velocityY: number;
  onGround: boolean;
  facingRight: boolean;
  type: 'thug' | 'enforcer' | 'boss';
  isAlive: boolean;
  attackCooldown: number;
  animationFrame: number;
  statusEffects: StatusEffect[];
}

interface StatusEffect {
  type: 'poison' | 'freeze' | 'burn' | 'stun' | 'slow';
  duration: number;
  damage?: number;
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'ground' | 'platform' | 'building';
}

interface AbilitySlot {
  skillId: string | null;
  cooldown: number;
  maxCooldown: number;
}

interface Projectile {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  damage: number;
  type: string;
  lifetime: number;
  skillId: string;
}

interface AbilityEffect {
  type: 'area_attack' | 'lightning' | 'meteor' | 'explosion' | 'smoke' | 'ultimate' | 'earthquake';
  x?: number;
  y?: number;
  radius?: number;
  lifetime: number;
}

const PixelArtPlatformer: React.FC = () => {
  const { gameState, setGameMode, addExperience } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const keysRef = useRef<Set<string>>(new Set());
  const backgroundImageRef = useRef<HTMLImageElement>();
  const playerImageRef = useRef<HTMLImageElement>();
  
  // Ability system state
  const [selectedAbilities, setSelectedAbilities] = useState<AbilitySlot[]>([
    { skillId: null, cooldown: 0, maxCooldown: 0 },
    { skillId: null, cooldown: 0, maxCooldown: 0 },
    { skillId: null, cooldown: 0, maxCooldown: 0 },
    { skillId: null, cooldown: 0, maxCooldown: 0 },
    { skillId: null, cooldown: 0, maxCooldown: 0 },
    { skillId: null, cooldown: 0, maxCooldown: 0 }, // Ultimate slot
  ]);
  
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [abilityEffects, setAbilityEffects] = useState<AbilityEffect[]>([]);
  
  const [player, setPlayer] = useState<Player>({
    x: 100,
    y: 200,
    width: 48,
    height: 64,
    velocityX: 0,
    velocityY: 0,
    onGround: false,
    facingRight: true,
    health: 100,
    maxHealth: 100,
    mana: 100,
    maxMana: 100,
    isMoving: false,
    isAttacking: false,
    animationFrame: 0
  });

  const [enemies, setEnemies] = useState<Enemy[]>([
    { x: 400, y: 200, width: 48, height: 64, health: 50, maxHealth: 50, velocityX: 0, velocityY: 0, onGround: false, facingRight: false, type: 'thug', isAlive: true, attackCooldown: 0, animationFrame: 0, statusEffects: [] },
    { x: 700, y: 200, width: 48, height: 64, health: 100, maxHealth: 100, velocityX: 0, velocityY: 0, onGround: false, facingRight: false, type: 'enforcer', isAlive: true, attackCooldown: 0, animationFrame: 0, statusEffects: [] },
    { x: 1000, y: 200, width: 56, height: 72, health: 200, maxHealth: 200, velocityX: 0, velocityY: 0, onGround: false, facingRight: false, type: 'boss', isAlive: true, attackCooldown: 0, animationFrame: 0, statusEffects: [] }
  ]);

  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameFrame, setGameFrame] = useState(0);

  // Game constants
  const GRAVITY = 0.8;
  const JUMP_FORCE = 18;
  const MOVE_SPEED = 4;
  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 600;
  const WORLD_WIDTH = 2000;

  // Pixel art platforms based on the cyberpunk cityscape
  const [platforms] = useState<Platform[]>([
    // Ground level
    { x: 0, y: 500, width: WORLD_WIDTH, height: 100, type: 'ground' },
    
    // Building platforms - lower level
    { x: 150, y: 400, width: 200, height: 30, type: 'building' },
    { x: 450, y: 380, width: 180, height: 30, type: 'building' },
    { x: 750, y: 420, width: 150, height: 30, type: 'building' },
    { x: 1050, y: 390, width: 200, height: 30, type: 'building' },
    { x: 1350, y: 410, width: 180, height: 30, type: 'building' },
    
    // Mid-level platforms
    { x: 200, y: 300, width: 150, height: 25, type: 'platform' },
    { x: 500, y: 280, width: 120, height: 25, type: 'platform' },
    { x: 800, y: 320, width: 140, height: 25, type: 'platform' },
    { x: 1100, y: 290, width: 160, height: 25, type: 'platform' },
    { x: 1400, y: 310, width: 130, height: 25, type: 'platform' },
    
    // High-level platforms
    { x: 250, y: 200, width: 100, height: 20, type: 'platform' },
    { x: 550, y: 180, width: 80, height: 20, type: 'platform' },
    { x: 850, y: 220, width: 90, height: 20, type: 'platform' },
    { x: 1150, y: 190, width: 110, height: 20, type: 'platform' },
    { x: 1450, y: 210, width: 100, height: 20, type: 'platform' },
    
    // Tall buildings
    { x: 100, y: 250, width: 80, height: 250, type: 'building' },
    { x: 650, y: 200, width: 100, height: 300, type: 'building' },
    { x: 1250, y: 180, width: 90, height: 320, type: 'building' },
    { x: 1600, y: 150, width: 120, height: 350, type: 'building' }
  ]);

  // Initialize abilities based on learned skills
  useEffect(() => {
    if (!gameState.currentCharacter) return;
    
    const characterClass = gameState.currentCharacter.class;
    const availableSkills = SKILL_TREES[characterClass] || [];
    const learnedSkills = gameState.currentCharacter.learnedSkills || [];
    
    // Auto-assign learned attacking/magic/active skills to ability slots
    const attackingSkills = availableSkills.filter(skill => 
      ['attacking', 'magic', 'active'].includes(skill.type) &&
      learnedSkills.some(learned => learned.skillId === skill.id)
    );
    
    // Find ultimate skill
    const ultimateSkill = availableSkills.find(skill => 
      skill.type === 'ultimate' &&
      learnedSkills.some(learned => learned.skillId === skill.id)
    );
    
    setSelectedAbilities(prev => {
      const newAbilities = [...prev];
      
      // Assign first 5 attacking skills to slots 0-4
      for (let i = 0; i < 5 && i < attackingSkills.length; i++) {
        const skill = attackingSkills[i];
        newAbilities[i] = {
          skillId: skill.id,
          cooldown: 0,
          maxCooldown: Math.max(60, (skill.manaCost || 20) * 2) // Cooldown based on mana cost
        };
      }
      
      // Assign ultimate to slot 5
      if (ultimateSkill) {
        newAbilities[5] = {
          skillId: ultimateSkill.id,
          cooldown: 0,
          maxCooldown: 600 // 10 second cooldown for ultimate
        };
      }
      
      return newAbilities;
    });
  }, [gameState.currentCharacter?.learnedSkills]);

  // Get skill data by ID
  const getSkillById = (skillId: string): SkillNode | null => {
    if (!gameState.currentCharacter) return null;
    const characterClass = gameState.currentCharacter.class;
    const availableSkills = SKILL_TREES[characterClass] || [];
    return availableSkills.find(skill => skill.id === skillId) || null;
  };



  // Execute ability based on skill type and effects
  const executeAbility = useCallback((skill: SkillNode) => {
    const damage = skill.damage || 0;
    const range = skill.type === 'magic' ? 200 : 80;
    
    switch (skill.id) {
      // Samurai abilities
      case 'sam_basic_slash':
      case 'sam_swift_strike':
        performMeleeAttack(damage, range);
        break;
      case 'sam_wind_slash':
        createProjectile(damage, 'wind', 300);
        break;
      case 'sam_whirlwind':
        performAreaAttack(damage, 120);
        break;
      case 'sam_double_strike':
        performMeleeAttack(damage / 2, range);
        setTimeout(() => performMeleeAttack(damage / 2, range), 200);
        break;
      
      // Ninja abilities
      case 'nin_shadow_strike':
        performTeleportAttack(damage);
        break;
      case 'nin_throwing_stars':
        for (let i = 0; i < 3; i++) {
          setTimeout(() => createProjectile(damage / 3, 'star', 250), i * 100);
        }
        break;
      case 'nin_smoke_bomb':
        createSmokeEffect();
        break;
      
      // Mage abilities
      case 'mag_fireball':
        createProjectile(damage, 'fireball', 200);
        break;
      case 'mag_ice_shard':
        createProjectile(damage, 'ice', 250);
        break;
      case 'mag_lightning':
        performLightningStrike(damage);
        break;
      case 'mag_meteor':
        createMeteorStrike(damage);
        break;
      
      // Hunter abilities
      case 'hun_precise_shot':
        createProjectile(damage, 'arrow', 400);
        break;
      case 'hun_explosive_arrow':
        createProjectile(damage, 'explosive_arrow', 300);
        break;
      case 'hun_multi_shot':
        for (let i = 0; i < 3; i++) {
          createProjectile(damage / 3, 'arrow', 350, i * 15 - 15);
        }
        break;
      
      // Warrior abilities
      case 'war_power_strike':
        performMeleeAttack(damage, range, true);
        break;
      case 'war_charge':
        performChargeAttack(damage);
        break;
      case 'war_whirlwind':
        performAreaAttack(damage, 100);
        break;
      
      // Necromancer abilities
      case 'nec_bone_spear':
        createProjectile(damage, 'bone', 250);
        break;
      case 'nec_corpse_explosion':
        performCorpseExplosion(damage);
        break;
      case 'nec_death_nova':
        performAreaAttack(damage, 150);
        break;
      
      // Druid abilities
      case 'dru_thorn_volley':
        for (let i = 0; i < 5; i++) {
          setTimeout(() => createProjectile(damage / 5, 'thorn', 200), i * 50);
        }
        break;
      case 'dru_earthquake':
        performEarthquake(damage);
        break;
      
      // Ultimate abilities
      case 'sam_reality_cut':
      case 'nin_void_step':
      case 'war_apocalypse':
      case 'hun_world_ender':
      case 'mag_reality_break':
      case 'nec_end_of_all':
      case 'dru_gaia_awakening':
        performUltimateAttack();
        break;
      
      default:
        performMeleeAttack(damage, range);
        break;
    }
  }, []);

  // Ability execution functions
  const performMeleeAttack = useCallback((damage: number, range: number, knockback = false) => {
    setEnemies(prevEnemies => {
      return prevEnemies.map(enemy => {
        if (!enemy.isAlive) return enemy;
        
        const distance = Math.abs(player.x - enemy.x);
        if (distance < range && Math.abs(player.y - enemy.y) < 70) {
          const finalDamage = damage + Math.floor(Math.random() * 10);
          const newHealth = Math.max(0, enemy.health - finalDamage);
          
          if (knockback) {
            const knockDirection = player.x < enemy.x ? 1 : -1;
            enemy.x += knockDirection * 30;
          }
          
          if (newHealth <= 0) {
            setScore(prev => prev + enemy.maxHealth * 10);
            addExperience(enemy.maxHealth);
            return { ...enemy, health: 0, isAlive: false };
          }
          
          return { ...enemy, health: newHealth };
        }
        
        return enemy;
      });
    });
  }, [player.x, player.y, addExperience]);

  const createProjectile = useCallback((damage: number, type: string, speed: number, angleOffset = 0) => {
    const angle = angleOffset * (Math.PI / 180);
    const direction = player.facingRight ? 1 : -1;
    
    setProjectiles(prev => [...prev, {
      x: player.x + (player.facingRight ? player.width : 0),
      y: player.y + player.height / 2,
      velocityX: Math.cos(angle) * speed * direction,
      velocityY: Math.sin(angle) * speed,
      damage,
      type,
      lifetime: 120,
      skillId: type
    }]);
  }, [player.x, player.y, player.facingRight, player.width, player.height]);

  const performAreaAttack = useCallback((damage: number, radius: number) => {
    setEnemies(prevEnemies => {
      return prevEnemies.map(enemy => {
        if (!enemy.isAlive) return enemy;
        
        const distance = Math.sqrt(
          Math.pow(player.x - enemy.x, 2) + Math.pow(player.y - enemy.y, 2)
        );
        
        if (distance < radius) {
          const finalDamage = damage + Math.floor(Math.random() * 15);
          const newHealth = Math.max(0, enemy.health - finalDamage);
          
          if (newHealth <= 0) {
            setScore(prev => prev + enemy.maxHealth * 10);
            addExperience(enemy.maxHealth);
            return { ...enemy, health: 0, isAlive: false };
          }
          
          return { ...enemy, health: newHealth };
        }
        
        return enemy;
      });
    });
    
    // Add visual effect
    setAbilityEffects(prev => [...prev, {
      type: 'area_attack',
      x: player.x,
      y: player.y,
      radius,
      lifetime: 30
    }]);
  }, [player.x, player.y, addExperience]);

  const performTeleportAttack = useCallback((damage: number) => {
    // Find nearest enemy
    const nearestEnemy = enemies.find(enemy => enemy.isAlive);
    if (nearestEnemy) {
      // Teleport behind enemy
      setPlayer(prev => ({
        ...prev,
        x: nearestEnemy.x + (nearestEnemy.facingRight ? -60 : 60),
        y: nearestEnemy.y
      }));
      
      // Deal damage
      setTimeout(() => performMeleeAttack(damage, 80), 100);
    }
  }, [enemies, performMeleeAttack]);

  const performLightningStrike = useCallback((damage: number) => {
    // Find nearest enemy and strike instantly
    const nearestEnemy = enemies.find(enemy => enemy.isAlive);
    if (nearestEnemy) {
      setEnemies(prevEnemies => {
        return prevEnemies.map(enemy => {
          if (enemy === nearestEnemy) {
            const newHealth = Math.max(0, enemy.health - damage);
            if (newHealth <= 0) {
              setScore(prev => prev + enemy.maxHealth * 10);
              addExperience(enemy.maxHealth);
              return { ...enemy, health: 0, isAlive: false };
            }
            return { ...enemy, health: newHealth };
          }
          return enemy;
        });
      });
      
      // Add lightning effect
      setAbilityEffects(prev => [...prev, {
        type: 'lightning',
        x: nearestEnemy.x,
        y: nearestEnemy.y,
        lifetime: 20
      }]);
    }
  }, [enemies, addExperience]);

  const createMeteorStrike = useCallback((damage: number) => {
    // Target area around player
    const targetX = player.x + (player.facingRight ? 150 : -150);
    const targetY = player.y;
    
    setTimeout(() => {
      setEnemies(prevEnemies => {
        return prevEnemies.map(enemy => {
          if (!enemy.isAlive) return enemy;
          
          const distance = Math.sqrt(
            Math.pow(targetX - enemy.x, 2) + Math.pow(targetY - enemy.y, 2)
          );
          
          if (distance < 100) {
            const finalDamage = damage + Math.floor(Math.random() * 20);
            const newHealth = Math.max(0, enemy.health - finalDamage);
            
            if (newHealth <= 0) {
              setScore(prev => prev + enemy.maxHealth * 10);
              addExperience(enemy.maxHealth);
              return { ...enemy, health: 0, isAlive: false };
            }
            
            return { ...enemy, health: newHealth };
          }
          
          return enemy;
        });
      });
      
      // Add meteor effect
      setAbilityEffects(prev => [...prev, {
        type: 'meteor',
        x: targetX,
        y: targetY,
        lifetime: 60
      }]);
    }, 1000); // 1 second delay
  }, [player.x, player.y, player.facingRight, addExperience]);

  const performChargeAttack = useCallback((damage: number) => {
    const chargeDistance = 150;
    const direction = player.facingRight ? 1 : -1;
    
    // Move player forward
    setPlayer(prev => ({
      ...prev,
      x: prev.x + chargeDistance * direction
    }));
    
    // Damage enemies in path
    setTimeout(() => performAreaAttack(damage, 80), 200);
  }, [player.facingRight, performAreaAttack]);

  const performCorpseExplosion = useCallback((damage: number) => {
    // Find dead enemies and explode them
    enemies.forEach(enemy => {
      if (!enemy.isAlive) {
        setAbilityEffects(prev => [...prev, {
          type: 'explosion',
          x: enemy.x,
          y: enemy.y,
          lifetime: 30
        }]);
        
        // Damage nearby living enemies
        setEnemies(prevEnemies => {
          return prevEnemies.map(livingEnemy => {
            if (!livingEnemy.isAlive) return livingEnemy;
            
            const distance = Math.sqrt(
              Math.pow(enemy.x - livingEnemy.x, 2) + Math.pow(enemy.y - livingEnemy.y, 2)
            );
            
            if (distance < 100) {
              const finalDamage = damage;
              const newHealth = Math.max(0, livingEnemy.health - finalDamage);
              
              if (newHealth <= 0) {
                setScore(prev => prev + livingEnemy.maxHealth * 10);
                addExperience(livingEnemy.maxHealth);
                return { ...livingEnemy, health: 0, isAlive: false };
              }
              
              return { ...livingEnemy, health: newHealth };
            }
            
            return livingEnemy;
          });
        });
      }
    });
  }, [enemies, addExperience]);

  const performEarthquake = useCallback((damage: number) => {
    // Damage all grounded enemies
    setEnemies(prevEnemies => {
      return prevEnemies.map(enemy => {
        if (!enemy.isAlive || !enemy.onGround) return enemy;
        
        const finalDamage = damage;
        const newHealth = Math.max(0, enemy.health - finalDamage);
        
        if (newHealth <= 0) {
          setScore(prev => prev + enemy.maxHealth * 10);
          addExperience(enemy.maxHealth);
          return { ...enemy, health: 0, isAlive: false };
        }
        
        return { ...enemy, health: newHealth };
      });
    });
    
    // Add screen shake effect
    setAbilityEffects(prev => [...prev, {
      type: 'earthquake',
      lifetime: 90
    }]);
  }, [addExperience]);

  const createSmokeEffect = useCallback(() => {
    setAbilityEffects(prev => [...prev, {
      type: 'smoke',
      x: player.x,
      y: player.y,
      lifetime: 180
    }]);
  }, [player.x, player.y]);

  const performUltimateAttack = useCallback(() => {
    // Ultimate attacks hit all enemies
    setEnemies(prevEnemies => {
      return prevEnemies.map(enemy => {
        if (!enemy.isAlive) return enemy;
        
        setScore(prev => prev + enemy.maxHealth * 10);
        addExperience(enemy.maxHealth);
        return { ...enemy, health: 0, isAlive: false };
      });
    });
    
    // Add ultimate effect
    setAbilityEffects(prev => [...prev, {
      type: 'ultimate',
      lifetime: 120
    }]);
  }, [addExperience]);

  // Load pixel art assets
  useEffect(() => {
    const loadImages = async () => {
      // Load background
      const bgImg = new Image();
      bgImg.src = '/cyberpunk-bg.png';
      bgImg.onload = () => {
        backgroundImageRef.current = bgImg;
      };
      
      // Load player sprite based on character class
      const playerImg = new Image();
      const characterClass = gameState.currentCharacter?.class || 'samurai';
      switch (characterClass) {
        case 'samurai':
          playerImg.src = '/samurai.gif';
          break;
        case 'ninja':
          playerImg.src = '/ninja.gif';
          break;
        case 'hunter':
          playerImg.src = '/archer.gif';
          break;
        default:
          playerImg.src = '/samurai.gif';
      }
      playerImg.onload = () => {
        playerImageRef.current = playerImg;
      };
    };
    
    loadImages();
  }, [gameState.currentCharacter?.class]);

  // Input handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key.toLowerCase());
      if (e.key === ' ') e.preventDefault();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Collision detection
  const checkCollision = (rect1: { x: number; y: number; width: number; height: number }, rect2: { x: number; y: number; width: number; height: number }) => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  };

  // Physics update
  const updatePhysics = useCallback(() => {
    const keys = keysRef.current;
    
    setPlayer(prevPlayer => {
      const newPlayer = { ...prevPlayer };
      
      // Handle input
      newPlayer.isMoving = false;
      newPlayer.isAttacking = false;
      
      if (keys.has('arrowleft') || keys.has('a')) {
        newPlayer.velocityX = -MOVE_SPEED;
        newPlayer.facingRight = false;
        newPlayer.isMoving = true;
      } else if (keys.has('arrowright') || keys.has('d')) {
        newPlayer.velocityX = MOVE_SPEED;
        newPlayer.facingRight = true;
        newPlayer.isMoving = true;
      } else {
        newPlayer.velocityX *= 0.8; // Friction
      }
      
      if ((keys.has('arrowup') || keys.has('w') || keys.has(' ')) && newPlayer.onGround) {
        newPlayer.velocityY = -JUMP_FORCE;
        newPlayer.onGround = false;
      }
      
      if (keys.has('x') || keys.has('enter')) {
        newPlayer.isAttacking = true;
      }
      
      // Apply gravity
      if (!newPlayer.onGround) {
        newPlayer.velocityY += GRAVITY;
      }
      
      // Update position
      newPlayer.x += newPlayer.velocityX;
      newPlayer.y += newPlayer.velocityY;
      
      // Platform collision
      newPlayer.onGround = false;
      for (const platform of platforms) {
        if (checkCollision(newPlayer, platform)) {
          // Landing on top of platform
          if (newPlayer.velocityY > 0 && newPlayer.y < platform.y) {
            newPlayer.y = platform.y - newPlayer.height;
            newPlayer.velocityY = 0;
            newPlayer.onGround = true;
          }
          // Hitting platform from below
          else if (newPlayer.velocityY < 0 && newPlayer.y > platform.y) {
            newPlayer.y = platform.y + platform.height;
            newPlayer.velocityY = 0;
          }
          // Hitting platform from side
          else if (newPlayer.velocityX > 0 && newPlayer.x < platform.x) {
            newPlayer.x = platform.x - newPlayer.width;
            newPlayer.velocityX = 0;
          }
          else if (newPlayer.velocityX < 0 && newPlayer.x > platform.x) {
            newPlayer.x = platform.x + platform.width;
            newPlayer.velocityX = 0;
          }
        }
      }
      
      // Keep player in bounds
      if (newPlayer.x < 0) newPlayer.x = 0;
      if (newPlayer.x + newPlayer.width > WORLD_WIDTH) newPlayer.x = WORLD_WIDTH - newPlayer.width;
      if (newPlayer.y > CANVAS_HEIGHT) {
        newPlayer.y = 200;
        newPlayer.x = 100;
        newPlayer.health = Math.max(0, newPlayer.health - 20);
      }
      
      // Update animation frame
      if (newPlayer.isMoving) {
        newPlayer.animationFrame = (newPlayer.animationFrame + 1) % 60;
      }
      
      return newPlayer;
    });
    
    // Update enemies
    setEnemies(prevEnemies => {
      return prevEnemies.map(enemy => {
        if (!enemy.isAlive) return enemy;
        
        const newEnemy = { ...enemy };
        
        // Simple AI: move towards player
        const distanceToPlayer = Math.abs(player.x - enemy.x);
        if (distanceToPlayer < 300 && enemy.onGround) {
          if (player.x < enemy.x) {
            newEnemy.velocityX = -1.5;
            newEnemy.facingRight = false;
          } else {
            newEnemy.velocityX = 1.5;
            newEnemy.facingRight = true;
          }
        } else {
          newEnemy.velocityX *= 0.9;
        }
        
        // Apply gravity
        if (!newEnemy.onGround) {
          newEnemy.velocityY += GRAVITY;
        }
        
        // Update position
        newEnemy.x += newEnemy.velocityX;
        newEnemy.y += newEnemy.velocityY;
        
        // Platform collision for enemies
        newEnemy.onGround = false;
        for (const platform of platforms) {
          if (checkCollision(newEnemy, platform)) {
            if (newEnemy.velocityY > 0 && newEnemy.y < platform.y) {
              newEnemy.y = platform.y - newEnemy.height;
              newEnemy.velocityY = 0;
              newEnemy.onGround = true;
            }
          }
        }
        
        // Attack cooldown
        if (newEnemy.attackCooldown > 0) {
          newEnemy.attackCooldown--;
        }
        
        // Update animation
        newEnemy.animationFrame = (newEnemy.animationFrame + 1) % 60;
        
        return newEnemy;
      });
    });
    
    // Update camera to follow player
    setCamera(() => ({
      x: Math.max(0, Math.min(player.x - CANVAS_WIDTH / 2, WORLD_WIDTH - CANVAS_WIDTH)),
      y: 0
    }));
    
    setGameFrame(prev => prev + 1);
  }, [player.x, platforms]);

  // Combat system
  useEffect(() => {
    if (player.isAttacking) {
      setEnemies(prevEnemies => {
        return prevEnemies.map(enemy => {
          if (!enemy.isAlive) return enemy;
          
          const distance = Math.abs(player.x - enemy.x);
          if (distance < 80 && Math.abs(player.y - enemy.y) < 70) {
            const damage = 25 + Math.floor(Math.random() * 20);
            const newHealth = Math.max(0, enemy.health - damage);
            
            if (newHealth <= 0) {
              setScore(prev => prev + enemy.maxHealth * 10);
              addExperience(enemy.maxHealth);
              return { ...enemy, health: 0, isAlive: false };
            }
            
            return { ...enemy, health: newHealth };
          }
          
          return enemy;
        });
      });
    }
  }, [player.isAttacking, addExperience]);

  // Enemy attacks
  useEffect(() => {
    enemies.forEach(enemy => {
      if (!enemy.isAlive) return;
      
      const distance = Math.abs(player.x - enemy.x);
      if (distance < 60 && Math.abs(player.y - enemy.y) < 60 && enemy.attackCooldown === 0) {
        setPlayer(prevPlayer => {
          const damage = 8 + Math.floor(Math.random() * 12);
          return {
            ...prevPlayer,
            health: Math.max(0, prevPlayer.health - damage)
          };
        });
        
        setEnemies(prevEnemies => {
          return prevEnemies.map(e => {
            if (e === enemy) {
              return { ...e, attackCooldown: 90 };
            }
            return e;
          });
        });
      }
    });
  }, [enemies, player.x, player.y]);

  // Update cooldowns and projectiles
  useEffect(() => {
    const interval = setInterval(() => {
      // Update ability cooldowns
      setSelectedAbilities(prev => 
        prev.map(ability => ({
          ...ability,
          cooldown: Math.max(0, ability.cooldown - 1)
        }))
      );
      
      // Update projectiles
      setProjectiles(prev => {
        return prev.map(projectile => ({
          ...projectile,
          x: projectile.x + projectile.velocityX,
          y: projectile.y + projectile.velocityY,
          lifetime: projectile.lifetime - 1
        })).filter(projectile => projectile.lifetime > 0);
      });
      
      // Update ability effects
      setAbilityEffects(prev => 
        prev.map(effect => ({
          ...effect,
          lifetime: effect.lifetime - 1
        })).filter(effect => effect.lifetime > 0)
      );
      
      // Regenerate mana
      setPlayer(prev => ({
        ...prev,
        mana: Math.min(prev.maxMana, prev.mana + 0.5)
      }));
    }, 16); // 60 FPS
    
    return () => clearInterval(interval);
  }, []);

  // Handle projectile collisions
  useEffect(() => {
    setProjectiles(prevProjectiles => {
      return prevProjectiles.filter(projectile => {
        let hit = false;
        
        setEnemies(prevEnemies => {
          return prevEnemies.map(enemy => {
            if (!enemy.isAlive || hit) return enemy;
            
            const distance = Math.sqrt(
              Math.pow(projectile.x - enemy.x, 2) + Math.pow(projectile.y - enemy.y, 2)
            );
            
            if (distance < 30) {
              hit = true;
              const finalDamage = projectile.damage + Math.floor(Math.random() * 5);
              const newHealth = Math.max(0, enemy.health - finalDamage);
              
              if (newHealth <= 0) {
                setScore(prev => prev + enemy.maxHealth * 10);
                addExperience(enemy.maxHealth);
                return { ...enemy, health: 0, isAlive: false };
              }
              
              return { ...enemy, health: newHealth };
            }
            
            return enemy;
          });
        });
        
        return !hit;
      });
    });
  }, [projectiles, addExperience]);

  // Handle ability input (1-6 keys)
  useEffect(() => {
    const handleAbilityKeys = (e: KeyboardEvent) => {
      const key = e.key;
      if (['1', '2', '3', '4', '5', '6'].includes(key)) {
        const slotIndex = parseInt(key) - 1;
        const abilitySlot = selectedAbilities[slotIndex];
        if (!abilitySlot.skillId || abilitySlot.cooldown > 0) return;
        
        const skill = getSkillById(abilitySlot.skillId);
        if (!skill) return;
        
        // Check mana cost
        if (skill.manaCost && player.mana < skill.manaCost) return;
        
        // Consume mana
        if (skill.manaCost) {
          setPlayer(prev => ({
            ...prev,
            mana: Math.max(0, prev.mana - skill.manaCost!)
          }));
        }
        
        // Set cooldown
        setSelectedAbilities(prev => {
          const newAbilities = [...prev];
          newAbilities[slotIndex] = {
            ...newAbilities[slotIndex],
            cooldown: newAbilities[slotIndex].maxCooldown
          };
          return newAbilities;
        });
        
        // Execute ability effect
        executeAbility(skill);
      }
    };
    
    window.addEventListener('keydown', handleAbilityKeys);
    return () => window.removeEventListener('keydown', handleAbilityKeys);
  }, [selectedAbilities, player.mana, executeAbility]);

  // Game loop
  useEffect(() => {
    const gameLoop = () => {
      updatePhysics();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [updatePhysics]);

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Disable image smoothing for pixel art
    ctx.imageSmoothingEnabled = false;
    
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Save context for camera
    ctx.save();
    ctx.translate(-camera.x, -camera.y);
    
    // Draw background
    if (backgroundImageRef.current) {
      // Scale and repeat the background
      const bgWidth = backgroundImageRef.current.width;
      const bgHeight = backgroundImageRef.current.height;
      const scale = CANVAS_HEIGHT / bgHeight;
      const scaledWidth = bgWidth * scale;
      
      for (let x = 0; x < WORLD_WIDTH; x += scaledWidth) {
        ctx.drawImage(
          backgroundImageRef.current,
          x, 0,
          scaledWidth, CANVAS_HEIGHT
        );
      }
    } else {
      // Fallback cyberpunk gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      gradient.addColorStop(0, '#1a0033');
      gradient.addColorStop(0.3, '#2d1b69');
      gradient.addColorStop(0.7, '#8b5cf6');
      gradient.addColorStop(1, '#4c1d95');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, WORLD_WIDTH, CANVAS_HEIGHT);
    }
    
    // Draw platforms with pixel art style
    platforms.forEach(platform => {
      if (platform.type === 'ground') {
        ctx.fillStyle = '#2d1b69';
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        // Add neon outline
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
      } else if (platform.type === 'platform') {
        ctx.fillStyle = '#4c1d95';
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 1;
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
      } else {
        ctx.fillStyle = '#1e1065';
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        ctx.strokeStyle = '#6d28d9';
        ctx.lineWidth = 1;
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
      }
    });
    
    // Draw projectiles
    projectiles.forEach(projectile => {
      ctx.fillStyle = projectile.type === 'fireball' ? '#ff6b35' :
                      projectile.type === 'ice' ? '#4ecdc4' :
                      projectile.type === 'arrow' ? '#8b4513' :
                      projectile.type === 'star' ? '#ffd700' :
                      projectile.type === 'bone' ? '#f5f5dc' :
                      projectile.type === 'thorn' ? '#228b22' :
                      '#ffffff';
      ctx.fillRect(projectile.x - 3, projectile.y - 3, 6, 6);
    });
    
    // Draw ability effects
    abilityEffects.forEach(effect => {
      ctx.save();
      ctx.globalAlpha = effect.lifetime / 60;
      
      switch (effect.type) {
        case 'area_attack':
          ctx.strokeStyle = '#ff6b35';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(effect.x || 0, effect.y || 0, effect.radius || 50, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case 'lightning':
          ctx.strokeStyle = '#ffff00';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(effect.x || 0, 0);
          ctx.lineTo(effect.x || 0, effect.y || 0);
          ctx.stroke();
          break;
        case 'meteor':
          ctx.fillStyle = '#ff4500';
          ctx.fillRect((effect.x || 0) - 20, (effect.y || 0) - 20, 40, 40);
          break;
        case 'explosion':
          ctx.fillStyle = '#ff6b35';
          ctx.beginPath();
          ctx.arc(effect.x || 0, effect.y || 0, 30, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'smoke':
          ctx.fillStyle = '#808080';
          ctx.beginPath();
          ctx.arc(effect.x || 0, effect.y || 0, 40, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'ultimate':
          ctx.fillStyle = '#ff00ff';
          ctx.fillRect(0, 0, WORLD_WIDTH, CANVAS_HEIGHT);
          break;
      }
      
      ctx.restore();
    });
    
    // Draw player
    if (playerImageRef.current) {
      ctx.save();
      if (!player.facingRight) {
        ctx.scale(-1, 1);
        ctx.drawImage(
          playerImageRef.current,
          -(player.x + player.width), player.y,
          player.width, player.height
        );
      } else {
        ctx.drawImage(
          playerImageRef.current,
          player.x, player.y,
          player.width, player.height
        );
      }
      ctx.restore();
    } else {
      // Fallback pixel art player
      ctx.fillStyle = gameState.currentCharacter?.class === 'samurai' ? '#ff6b6b' : 
                      gameState.currentCharacter?.class === 'ninja' ? '#4ecdc4' : '#ffd93d';
      ctx.fillRect(player.x, player.y, player.width, player.height);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(player.x, player.y, player.width, player.height);
    }
    
    // Draw enemies
    enemies.forEach(enemy => {
      if (!enemy.isAlive) return;
      
      ctx.fillStyle = enemy.type === 'thug' ? '#dc2626' : 
                      enemy.type === 'enforcer' ? '#ea580c' : '#991b1b';
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      
      // Enemy outline
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
      
      // Enemy health bar
      const healthBarWidth = enemy.width;
      const healthWidth = (enemy.health / enemy.maxHealth) * healthBarWidth;
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(enemy.x, enemy.y - 12, healthBarWidth, 6);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(enemy.x, enemy.y - 12, healthWidth, 6);
    });
    
    // Restore context
    ctx.restore();
    
    // Draw UI with pixel art font style
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'left';
    
    // Health bar
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(20, 20, 200, 20);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(20, 20, (player.health / player.maxHealth) * 200, 20);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`HP: ${player.health}/${player.maxHealth}`, 25, 35);
    
    // Mana bar
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(20, 45, 200, 15);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(20, 45, (player.mana / player.maxMana) * 200, 15);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`MP: ${Math.floor(player.mana)}/${player.maxMana}`, 25, 57);
    
    // Score and level
    ctx.fillText(`Score: ${score}`, 20, 80);
    ctx.fillText(`Level: ${gameState.currentCharacter?.level || 1}`, 20, 100);
    ctx.fillText(`Class: ${gameState.currentCharacter?.class.toUpperCase() || 'SAMURAI'}`, 20, 120);
    
    // Controls
    ctx.fillStyle = '#a855f7';
    ctx.font = '12px monospace';
    ctx.fillText('WASD/Arrows: Move', 20, CANVAS_HEIGHT - 80);
    ctx.fillText('Space: Jump', 20, CANVAS_HEIGHT - 65);
    ctx.fillText('X/Enter: Attack', 20, CANVAS_HEIGHT - 50);
    ctx.fillText('1-6: Abilities', 20, CANVAS_HEIGHT - 35);
    ctx.fillText('ESC: Back to Lobby', 20, CANVAS_HEIGHT - 20);
    
    // Game over check
    if (player.health <= 0) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#ff6b6b';
      ctx.font = 'bold 48px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px monospace';
      ctx.fillText('Press ESC to return to lobby', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
    }
    
    // Victory check
    const aliveEnemies = enemies.filter(e => e.isAlive);
    if (aliveEnemies.length === 0) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 48px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('VICTORY!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px monospace';
      ctx.fillText(`Final Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
      ctx.fillText('Press ESC to return to lobby', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 80);
    }
    
    ctx.textAlign = 'left';
  }, [player, enemies, platforms, camera, score, gameState.currentCharacter, gameFrame, projectiles, abilityEffects]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGameMode('lobby');
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [setGameMode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-2 border-purple-500 rounded-lg shadow-2xl"
          style={{ imageRendering: 'pixelated' }}
        />
        
        {/* Game title overlay */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
          <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            NEW HAVEN CYBERPUNK REVENGE
          </h1>
          <p className="text-purple-300 text-sm">
            {gameState.currentCharacter?.class.toUpperCase()} - {gameState.difficulty.toUpperCase()} MODE
          </p>
        </div>

        {/* Ability Buttons UI */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {selectedAbilities.map((ability, index) => {
            const skill = ability.skillId ? getSkillById(ability.skillId) : null;
            const isOnCooldown = ability.cooldown > 0;
            const canAfford = !skill?.manaCost || player.mana >= skill.manaCost;
            const isUltimate = index === 5;
            
            return (
              <div
                key={index}
                className={`relative w-12 h-12 rounded border-2 flex items-center justify-center text-lg font-bold cursor-pointer transition-all ${
                  isUltimate 
                    ? 'border-yellow-400 bg-yellow-900/50' 
                    : 'border-purple-400 bg-purple-900/50'
                } ${
                  isOnCooldown || !canAfford 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-purple-700/50'
                }`}
                onClick={() => {
                  const abilitySlot = selectedAbilities[index];
                  if (!abilitySlot.skillId || abilitySlot.cooldown > 0) return;
                  
                  const skill = getSkillById(abilitySlot.skillId);
                  if (!skill) return;
                  
                  // Check mana cost
                  if (skill.manaCost && player.mana < skill.manaCost) return;
                  
                  // Consume mana
                  if (skill.manaCost) {
                    setPlayer(prev => ({
                      ...prev,
                      mana: Math.max(0, prev.mana - skill.manaCost!)
                    }));
                  }
                  
                  // Set cooldown
                  setSelectedAbilities(prev => {
                    const newAbilities = [...prev];
                    newAbilities[index] = {
                      ...newAbilities[index],
                      cooldown: newAbilities[index].maxCooldown
                    };
                    return newAbilities;
                  });
                  
                  // Execute ability effect
                  executeAbility(skill);
                }}
                title={skill ? `${skill.name} (${skill.manaCost || 0} MP)` : 'Empty Slot'}
              >
                <span className="text-white text-xs absolute top-0 left-1">
                  {index + 1}
                </span>
                {skill ? (
                  <span className="text-white">{skill.icon}</span>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
                {isOnCooldown && (
                  <div className="absolute inset-0 bg-black/70 rounded flex items-center justify-center">
                    <span className="text-white text-xs">
                      {Math.ceil(ability.cooldown / 60)}
                    </span>
                  </div>
                )}
                {skill?.manaCost && player.mana < skill.manaCost && (
                  <div className="absolute inset-0 bg-red-900/70 rounded"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-center text-purple-300">
        <p className="mb-2">Navigate the cyberpunk cityscape and defeat the Shimoto gang!</p>
        <p>Use your learned abilities (1-6 keys) to unleash devastating attacks!</p>
      </div>
    </div>
  );
};

export default PixelArtPlatformer;