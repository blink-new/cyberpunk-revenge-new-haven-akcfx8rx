import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGame } from '../contexts/GameContext';
import { LEVEL_BACKGROUNDS } from '../data/levels';
import ComboSystem, { useComboSystem } from './ComboSystem';

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
  isMoving: boolean;
  isAttacking: boolean;
  combo: number;
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'ground' | 'platform' | 'building';
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
}

const PlatformerGame: React.FC = () => {
  const { gameState, setGameMode, addExperience } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const keysRef = useRef<Set<string>>(new Set());
  const comboSystem = useComboSystem();

  const [player, setPlayer] = useState<Player>({
    x: 100,
    y: 300,
    width: 32,
    height: 48,
    velocityX: 0,
    velocityY: 0,
    onGround: false,
    facingRight: true,
    health: 100,
    maxHealth: 100,
    isMoving: false,
    isAttacking: false,
    combo: 0
  });

  const [enemies, setEnemies] = useState<Enemy[]>([
    { x: 400, y: 300, width: 32, height: 48, health: 50, maxHealth: 50, velocityX: 0, velocityY: 0, onGround: false, facingRight: false, type: 'thug', isAlive: true, attackCooldown: 0 },
    { x: 600, y: 300, width: 32, height: 48, health: 75, maxHealth: 75, velocityX: 0, velocityY: 0, onGround: false, facingRight: false, type: 'enforcer', isAlive: true, attackCooldown: 0 },
    { x: 800, y: 300, width: 40, height: 56, health: 150, maxHealth: 150, velocityX: 0, velocityY: 0, onGround: false, facingRight: false, type: 'boss', isAlive: true, attackCooldown: 0 }
  ]);

  const [platforms] = useState<Platform[]>([
    // Ground platforms
    { x: 0, y: 450, width: 1200, height: 100, type: 'ground' },
    // Building platforms
    { x: 200, y: 350, width: 150, height: 20, type: 'platform' },
    { x: 450, y: 280, width: 150, height: 20, type: 'platform' },
    { x: 700, y: 200, width: 150, height: 20, type: 'platform' },
    { x: 950, y: 350, width: 150, height: 20, type: 'platform' },
    // Buildings
    { x: 0, y: 350, width: 100, height: 100, type: 'building' },
    { x: 500, y: 200, width: 80, height: 250, type: 'building' },
    { x: 1000, y: 250, width: 120, height: 200, type: 'building' }
  ]);

  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [, setGameTime] = useState(0);

  // Game constants
  const GRAVITY = 0.5;
  const JUMP_FORCE = 15;
  const MOVE_SPEED = 5;
  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 600;

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
      if (newPlayer.x + newPlayer.width > CANVAS_WIDTH * 2) newPlayer.x = CANVAS_WIDTH * 2 - newPlayer.width;
      if (newPlayer.y > CANVAS_HEIGHT) {
        newPlayer.y = 300;
        newPlayer.x = 100;
        newPlayer.health = Math.max(0, newPlayer.health - 20);
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
        if (distanceToPlayer < 200 && enemy.onGround) {
          if (player.x < enemy.x) {
            newEnemy.velocityX = -1;
            newEnemy.facingRight = false;
          } else {
            newEnemy.velocityX = 1;
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
        
        return newEnemy;
      });
    });
    
    // Update combo
    const combo = comboSystem.getCombo();
    setPlayer(prevPlayer => {
      const newPlayer = { ...prevPlayer };
      newPlayer.combo = combo;
      return newPlayer;
    });
    
    // Update camera to follow player
    setCamera(() => ({
      x: Math.max(0, Math.min(player.x - CANVAS_WIDTH / 2, CANVAS_WIDTH)),
      y: 0
    }));
    
    setGameTime(prev => prev + 1);
  }, [player.x, platforms]);

  // Combat system
  useEffect(() => {
    if (player.isAttacking) {
      let hitEnemy = false;
      
      setEnemies(prevEnemies => {
        return prevEnemies.map(enemy => {
          if (!enemy.isAlive) return enemy;
          
          const distance = Math.abs(player.x - enemy.x);
          if (distance < 60 && Math.abs(player.y - enemy.y) < 50) {
            hitEnemy = true;
            addHit(); // Add to combo when hitting enemy
            
            const damage = 25 + Math.floor(Math.random() * 15);
            const damageMultiplier = getDamageMultiplier();
            const finalDamage = Math.floor(damage * damageMultiplier);
            const newHealth = Math.max(0, enemy.health - finalDamage);
            
            if (newHealth <= 0) {
              setScore(prev => prev + enemy.maxHealth);
              addExperience(enemy.maxHealth);
              return { ...enemy, health: 0, isAlive: false };
            }
            
            return { ...enemy, health: newHealth };
          }
          
          return enemy;
        });
      });
      
      // Break combo if attacking but not hitting any enemy
      if (!hitEnemy) {
        // Small delay before breaking combo to allow for close misses
        setTimeout(() => {
          if (!hitEnemy) {
            breakCombo();
          }
        }, 100);
      }
    }
  }, [player.isAttacking, addExperience, addHit, getDamageMultiplier, breakCombo]);

  // Enemy attacks
  useEffect(() => {
    enemies.forEach(enemy => {
      if (!enemy.isAlive) return;
      
      const distance = Math.abs(player.x - enemy.x);
      if (distance < 50 && Math.abs(player.y - enemy.y) < 50 && enemy.attackCooldown === 0) {
        setPlayer(prevPlayer => {
          const damage = 10 + Math.floor(Math.random() * 10);
          return {
            ...prevPlayer,
            health: Math.max(0, prevPlayer.health - damage)
          };
        });
        
        setEnemies(prevEnemies => {
          return prevEnemies.map(e => {
            if (e === enemy) {
              return { ...e, attackCooldown: 60 };
            }
            return e;
          });
        });
      }
    });
  }, [enemies, player.x, player.y]);

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
    
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Save context for camera
    ctx.save();
    ctx.translate(-camera.x, -camera.y);
    
    // Draw dynamic background based on current level
    const currentLevel = gameState.currentLevel || 1;
    let backgroundEnv = 'street';
    
    if (currentLevel <= 10) backgroundEnv = 'street';
    else if (currentLevel <= 20) backgroundEnv = 'building';
    else if (currentLevel <= 30) backgroundEnv = 'underground';
    else if (currentLevel <= 40) backgroundEnv = 'rooftop';
    else if (currentLevel <= 50) backgroundEnv = 'factory';
    else if (currentLevel <= 60) backgroundEnv = 'neon_city';
    else if (currentLevel <= 70) backgroundEnv = 'cyber_night';
    else if (currentLevel <= 80) backgroundEnv = 'toxic_wasteland';
    else if (currentLevel <= 90) backgroundEnv = 'digital_realm';
    else backgroundEnv = 'void_space';
    
    const bgImage = new Image();
    bgImage.src = LEVEL_BACKGROUNDS[backgroundEnv as keyof typeof LEVEL_BACKGROUNDS];
    
    // Draw background with tiling
    if (bgImage.complete) {
      const pattern = ctx.createPattern(bgImage, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, CANVAS_WIDTH * 2, CANVAS_HEIGHT);
      }
    } else {
      // Fallback gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      if (currentLevel <= 25) {
        gradient.addColorStop(0, '#1a0033');
        gradient.addColorStop(0.5, '#2d1b69');
        gradient.addColorStop(1, '#8b5cf6');
      } else if (currentLevel <= 50) {
        gradient.addColorStop(0, '#0f0f0f');
        gradient.addColorStop(0.5, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
      } else if (currentLevel <= 75) {
        gradient.addColorStop(0, '#2d1b69');
        gradient.addColorStop(0.5, '#8b5cf6');
        gradient.addColorStop(1, '#ec4899');
      } else {
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(0.5, '#1a0033');
        gradient.addColorStop(1, '#4c1d95');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, CANVAS_WIDTH * 2, CANVAS_HEIGHT);
    }
    
    // Draw platforms
    platforms.forEach(platform => {
      if (platform.type === 'ground') {
        ctx.fillStyle = '#4c1d95';
      } else if (platform.type === 'platform') {
        ctx.fillStyle = '#7c3aed';
      } else {
        ctx.fillStyle = '#5b21b6';
      }
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      
      // Platform outline
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
    });
    
    // Draw player
    ctx.fillStyle = gameState.currentCharacter?.class === 'samurai' ? '#ff6b6b' : 
                    gameState.currentCharacter?.class === 'ninja' ? '#4ecdc4' : '#ffd93d';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Player outline
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
    
    // Player direction indicator
    ctx.fillStyle = '#ffffff';
    if (player.facingRight) {
      ctx.fillRect(player.x + player.width - 4, player.y + 10, 4, 8);
    } else {
      ctx.fillRect(player.x, player.y + 10, 4, 8);
    }
    
    // Draw enemies
    enemies.forEach(enemy => {
      if (!enemy.isAlive) return;
      
      ctx.fillStyle = enemy.type === 'thug' ? '#ef4444' : 
                      enemy.type === 'enforcer' ? '#f97316' : '#dc2626';
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      
      // Enemy outline
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
      
      // Enemy health bar
      const healthWidth = (enemy.health / enemy.maxHealth) * enemy.width;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(enemy.x, enemy.y - 10, enemy.width, 4);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(enemy.x, enemy.y - 10, healthWidth, 4);
    });
    
    // Restore context
    ctx.restore();
    
    // Draw UI
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px monospace';
    ctx.fillText(`Health: ${player.health}/${player.maxHealth}`, 20, 60);
    ctx.fillText(`Score: ${score}`, 20, 90);
    ctx.fillText(`Level: ${gameState.currentCharacter?.level || 1}`, 20, 120);
    
    // Controls
    ctx.fillStyle = '#a855f7';
    ctx.font = '14px monospace';
    ctx.fillText('Arrow Keys/WASD: Move', 20, CANVAS_HEIGHT - 100);
    ctx.fillText('Space/Up: Jump', 20, CANVAS_HEIGHT - 80);
    ctx.fillText('X/Enter: Attack', 20, CANVAS_HEIGHT - 60);
    ctx.fillText('ESC: Back to Lobby', 20, CANVAS_HEIGHT - 40);
    
    // Game over check
    if (player.health <= 0) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#ff6b6b';
      ctx.font = '48px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.fillStyle = '#ffffff';
      ctx.font = '24px monospace';
      ctx.fillText('Press ESC to return to lobby', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
      ctx.textAlign = 'left';
    }
    
    // Victory check
    const aliveEnemies = enemies.filter(e => e.isAlive);
    if (aliveEnemies.length === 0) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#22c55e';
      ctx.font = '48px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('VICTORY!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.fillStyle = '#ffffff';
      ctx.font = '24px monospace';
      ctx.fillText(`Final Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
      ctx.fillText('Press ESC to return to lobby', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 80);
      ctx.textAlign = 'left';
    }
  }, [player, enemies, platforms, camera, score, gameState.currentCharacter, player.health, gameState.currentLevel]);

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
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            NEW HAVEN CYBERPUNK REVENGE
          </h1>
          <p className="text-purple-300 text-sm">
            {gameState.currentCharacter?.class.toUpperCase()} - {gameState.difficulty.toUpperCase()} MODE
          </p>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-center text-purple-300">
        <p className="mb-2">Use WASD or Arrow Keys to move, Space to jump, X to attack</p>
        <p>Defeat all enemies to complete the level!</p>
      </div>
      <ComboSystem />
    </div>
  );
};

export default PlatformerGame;