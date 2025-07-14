import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGame } from '../contexts/GameContext';
import { GameManager } from '../core/GameManager';
import { GAME_CONFIG, COLORS, GameConstants } from '../core/GameConstants';
import { CharacterClass } from '../types/game';

interface GameUIState {
  showPauseMenu: boolean;
  showSkillMenu: boolean;
  showInventory: boolean;
  showDebugInfo: boolean;
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  duration: number;
}

const EnhancedGame2D: React.FC = () => {
  const { gameState: contextGameState, setGameMode } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameManagerRef = useRef<GameManager | null>(null);
  const animationFrameRef = useRef<number>();
  
  const [uiState, setUIState] = useState<GameUIState>({
    showPauseMenu: false,
    showSkillMenu: false,
    showInventory: false,
    showDebugInfo: false,
    notifications: []
  });

  const [gameStats, setGameStats] = useState({
    fps: 60,
    entityCount: 0,
    activeEffects: 0,
    memoryUsage: 0
  });

  // Add notification helper
  const addNotification = useCallback((type: Notification['type'], message: string, duration: number) => {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      duration
    };
    
    setUIState(prev => ({
      ...prev,
      notifications: [...prev.notifications, notification]
    }));
    
    // Auto-remove notification
    setTimeout(() => {
      setUIState(prev => ({
        ...prev,
        notifications: prev.notifications.filter(n => n.id !== notification.id)
      }));
    }, duration);
  }, []);

  // Initialize game manager
  useEffect(() => {
    if (!gameManagerRef.current) {
      gameManagerRef.current = new GameManager();
      
      // Set up event listeners
      const gameManager = gameManagerRef.current;
      
      gameManager.addEventListener('level_complete', (data: { level: number }) => {
        addNotification('success', `Level ${data.level} Complete!`, 3000);
      });
      
      gameManager.addEventListener('player_death', () => {
        addNotification('error', 'You died! Press R to restart', 5000);
      });
      
      gameManager.addEventListener('level_up', (data: { newLevel: number }) => {
        addNotification('success', `Level Up! Now level ${data.newLevel}`, 3000);
      });
      
      gameManager.addEventListener('ability_used', (data: { abilityId: string }) => {
        addNotification('info', `Used ${data.abilityId}`, 1000);
      });
      
      gameManager.addEventListener('experience_gained', (data: { amount: number }) => {
        if (data.amount > 50) {
          addNotification('info', `+${data.amount} XP`, 1500);
        }
      });

      // Initialize with current character
      if (contextGameState.currentCharacter) {
        gameManager.updatePlayerStats({
          characterClass: contextGameState.currentCharacter.class,
          level: contextGameState.currentCharacter.level,
          experience: contextGameState.currentCharacter.experience,
          health: contextGameState.currentCharacter.health,
          maxHealth: contextGameState.currentCharacter.maxHealth,
          mana: contextGameState.currentCharacter.mana,
          maxMana: contextGameState.currentCharacter.maxMana,
          skillPoints: contextGameState.currentCharacter.skillPoints,
          learnedSkills: contextGameState.currentCharacter.learnedSkills.map(s => s.skillId),
          equippedAbilities: [], // Will be populated from learned skills
          strength: contextGameState.currentCharacter.stats.strength,
          agility: contextGameState.currentCharacter.stats.agility,
          intelligence: contextGameState.currentCharacter.stats.intelligence,
          vitality: contextGameState.currentCharacter.stats.vitality,
          defense: contextGameState.currentCharacter.stats.defense,
          magic: contextGameState.currentCharacter.stats.magic,
          luck: contextGameState.currentCharacter.stats.luck
        });
      }
    }
  }, [contextGameState.currentCharacter, addNotification]);

  // Game loop and stats update
  const updateGameStats = useCallback(() => {
    if (!gameManagerRef.current) return;

    const engine = gameManagerRef.current.getEngine();
    const entities = engine.getAllEntities();
    
    setGameStats(prev => ({
      ...prev,
      entityCount: entities.length,
      activeEffects: 0, // Would count active particle effects
      memoryUsage: Math.round((performance as any).memory?.usedJSHeapSize / 1024 / 1024) || 0
    }));
  }, []);

  const startGameLoop = useCallback(() => {
    const gameLoop = () => {
      if (gameManagerRef.current) {
        gameManagerRef.current.updateCamera();
        updateGameStats();
        render();
      }
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }, [updateGameStats]);

  // Start game when component mounts
  useEffect(() => {
    if (gameManagerRef.current) {
      gameManagerRef.current.startGame();
      startGameLoop();
    }

    return () => {
      if (gameManagerRef.current) {
        gameManagerRef.current.stopGame();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [startGameLoop]);

  // UI Helper Functions
  const togglePause = useCallback(() => {
    if (!gameManagerRef.current) return;
    
    const gameState = gameManagerRef.current.getGameState();
    if (gameState.isPaused) {
      gameManagerRef.current.resumeGame();
    } else {
      gameManagerRef.current.pauseGame();
    }
    
    setUIState(prev => ({ ...prev, showPauseMenu: !prev.showPauseMenu }));
  }, []);

  const toggleInventory = useCallback(() => {
    setUIState(prev => ({ ...prev, showInventory: !prev.showInventory }));
  }, []);

  const toggleSkillMenu = useCallback(() => {
    setUIState(prev => ({ ...prev, showSkillMenu: !prev.showSkillMenu }));
  }, []);

  // Input handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameManagerRef.current) return;

      const key = e.key;
      
      // Check for specific actions
      if (GameConstants.isKeyPressed(key, 'MOVE_LEFT')) {
        gameManagerRef.current.handleInput('move_left', true);
      } else if (GameConstants.isKeyPressed(key, 'MOVE_RIGHT')) {
        gameManagerRef.current.handleInput('move_right', true);
      } else if (GameConstants.isKeyPressed(key, 'MOVE_UP')) {
        gameManagerRef.current.handleInput('move_up', true);
      } else if (GameConstants.isKeyPressed(key, 'MOVE_DOWN')) {
        gameManagerRef.current.handleInput('move_down', true);
      } else if (GameConstants.isKeyPressed(key, 'JUMP')) {
        gameManagerRef.current.handleInput('jump', true);
        e.preventDefault();
      } else if (GameConstants.isKeyPressed(key, 'ATTACK')) {
        gameManagerRef.current.handleInput('attack', true);
      } else if (GameConstants.isKeyPressed(key, 'DASH')) {
        gameManagerRef.current.handleInput('dash', true);
      } else if (GameConstants.isKeyPressed(key, 'ABILITY_1')) {
        gameManagerRef.current.handleInput('ability_0', true);
      } else if (GameConstants.isKeyPressed(key, 'ABILITY_2')) {
        gameManagerRef.current.handleInput('ability_1', true);
      } else if (GameConstants.isKeyPressed(key, 'ABILITY_3')) {
        gameManagerRef.current.handleInput('ability_2', true);
      } else if (GameConstants.isKeyPressed(key, 'ABILITY_4')) {
        gameManagerRef.current.handleInput('ability_3', true);
      } else if (GameConstants.isKeyPressed(key, 'ABILITY_5')) {
        gameManagerRef.current.handleInput('ability_4', true);
      } else if (GameConstants.isKeyPressed(key, 'ABILITY_ULTIMATE')) {
        gameManagerRef.current.handleInput('ability_5', true);
      } else if (GameConstants.isKeyPressed(key, 'PAUSE')) {
        togglePause();
      } else if (GameConstants.isKeyPressed(key, 'INVENTORY')) {
        toggleInventory();
      } else if (GameConstants.isKeyPressed(key, 'SKILLS')) {
        toggleSkillMenu();
      }

      // Debug keys
      if (GameConstants.isKeyPressed(key, 'DEBUG_TOGGLE')) {
        setUIState(prev => ({ ...prev, showDebugInfo: !prev.showDebugInfo }));
      }

      // Restart key
      if (key === 'r' || key === 'R') {
        gameManagerRef.current.restartLevel();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!gameManagerRef.current) return;

      const key = e.key;
      
      if (GameConstants.isKeyPressed(key, 'MOVE_LEFT')) {
        gameManagerRef.current.handleInput('move_left', false);
      } else if (GameConstants.isKeyPressed(key, 'MOVE_RIGHT')) {
        gameManagerRef.current.handleInput('move_right', false);
      } else if (GameConstants.isKeyPressed(key, 'MOVE_UP')) {
        gameManagerRef.current.handleInput('move_up', false);
      } else if (GameConstants.isKeyPressed(key, 'MOVE_DOWN')) {
        gameManagerRef.current.handleInput('move_down', false);
      } else if (GameConstants.isKeyPressed(key, 'JUMP')) {
        gameManagerRef.current.handleInput('jump', false);
      } else if (GameConstants.isKeyPressed(key, 'ATTACK')) {
        gameManagerRef.current.handleInput('attack', false);
      } else if (GameConstants.isKeyPressed(key, 'DASH')) {
        gameManagerRef.current.handleInput('dash', false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [toggleInventory, togglePause, toggleSkillMenu]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameManagerRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get game state
    const gameState = gameManagerRef.current.getGameState();
    const playerStats = gameManagerRef.current.getPlayerStats();
    const engine = gameManagerRef.current.getEngine();
    const camera = gameManagerRef.current.getCameraPosition();

    // Apply camera transform
    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    // Render background
    renderBackground(ctx);

    // Render platforms
    renderPlatforms(ctx, engine);

    // Render entities
    renderEntities(ctx, engine);

    // Render effects
    renderEffects(ctx);

    // Restore camera transform
    ctx.restore();

    // Render UI
    renderUI(ctx, gameState, playerStats);

    // Render notifications
    renderNotifications(ctx);

    // Render debug info
    if (uiState.showDebugInfo) {
      renderDebugInfo(ctx, gameState, playerStats);
    }
  }, [uiState.showDebugInfo]);

  const renderBackground = (ctx: CanvasRenderingContext2D) => {
    // Cyberpunk gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, GAME_CONFIG.WORLD_HEIGHT);
    gradient.addColorStop(0, '#1a0033');
    gradient.addColorStop(0.3, '#2d1b69');
    gradient.addColorStop(0.7, '#8b5cf6');
    gradient.addColorStop(1, '#4c1d95');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, GAME_CONFIG.WORLD_WIDTH, GAME_CONFIG.WORLD_HEIGHT);

    // Add neon grid pattern
    ctx.strokeStyle = COLORS.NEON_BLUE;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.1;
    
    for (let x = 0; x < GAME_CONFIG.WORLD_WIDTH; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, GAME_CONFIG.WORLD_HEIGHT);
      ctx.stroke();
    }
    
    for (let y = 0; y < GAME_CONFIG.WORLD_HEIGHT; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(GAME_CONFIG.WORLD_WIDTH, y);
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
  };

  const renderPlatforms = (ctx: CanvasRenderingContext2D, engine: { getEntitiesWithComponent: (type: string) => any[] }) => {
    const platforms = engine.getEntitiesWithComponent('platform');
    
    platforms.forEach((platform: any) => {
      const platformComp = platform.components.get('platform');
      
      // Set color based on material
      switch (platformComp.material) {
        case 'metal':
          ctx.fillStyle = COLORS.SURFACE;
          break;
        case 'energy':
          ctx.fillStyle = COLORS.NEON_BLUE;
          break;
        case 'lava':
          ctx.fillStyle = COLORS.BURN_COLOR;
          break;
        default:
          ctx.fillStyle = COLORS.SURFACE;
      }
      
      ctx.fillRect(platform.bounds.x, platform.bounds.y, platform.bounds.width, platform.bounds.height);
      
      // Add neon outline
      ctx.strokeStyle = COLORS.PRIMARY;
      ctx.lineWidth = 2;
      ctx.strokeRect(platform.bounds.x, platform.bounds.y, platform.bounds.width, platform.bounds.height);
    });
  };

  const renderEntities = (ctx: CanvasRenderingContext2D, engine: { getAllEntities: () => any[] }) => {
    const entities = engine.getAllEntities();
    
    entities.forEach((entity: any) => {
      if (!entity.active) return;

      // Render based on entity type
      if (entity.id === 'player') {
        renderPlayer(ctx, entity);
      } else if (entity.components.has('ai')) {
        renderEnemy(ctx, entity);
      } else if (entity.components.has('loot')) {
        renderPickup(ctx, entity);
      }
    });
  };

  const renderPlayer = (ctx: CanvasRenderingContext2D, player: any) => {
    const combat = player.components.get('combat');
    const playerComp = player.components.get('player');
    
    // Get character class color
    const classColors: Record<CharacterClass, string> = {
      samurai: COLORS.EPIC_COLOR,
      ninja: COLORS.NEON_BLUE,
      warrior: COLORS.LEGENDARY_COLOR,
      hunter: COLORS.NEON_GREEN,
      mage: COLORS.NEON_PINK,
      necromancer: COLORS.DARK_DAMAGE,
      druid: COLORS.REGENERATION_COLOR
    };
    
    const characterClass = playerComp?.characterClass || 'samurai';
    ctx.fillStyle = classColors[characterClass];
    ctx.fillRect(player.bounds.x, player.bounds.y, player.bounds.width, player.bounds.height);
    
    // Player outline
    ctx.strokeStyle = COLORS.PRIMARY;
    ctx.lineWidth = 2;
    ctx.strokeRect(player.bounds.x, player.bounds.y, player.bounds.width, player.bounds.height);
    
    // Health bar above player
    if (combat) {
      const healthBarWidth = player.bounds.width;
      const healthWidth = (combat.health / combat.maxHealth) * healthBarWidth;
      
      ctx.fillStyle = COLORS.HEALTH_LOW;
      ctx.fillRect(player.bounds.x, player.bounds.y - 15, healthBarWidth, 6);
      ctx.fillStyle = COLORS.HEALTH;
      ctx.fillRect(player.bounds.x, player.bounds.y - 15, healthWidth, 6);
    }
  };

  const renderEnemy = (ctx: CanvasRenderingContext2D, enemy: any) => {
    const combat = enemy.components.get('combat');
    const ai = enemy.components.get('ai');
    
    // Enemy color based on AI state
    let enemyColor = COLORS.HEALTH;
    if (ai) {
      switch (ai.state) {
        case 'patrol':
          enemyColor = '#dc2626';
          break;
        case 'chase':
          enemyColor = '#ea580c';
          break;
        case 'attack':
          enemyColor = '#991b1b';
          break;
      }
    }
    
    ctx.fillStyle = enemyColor;
    ctx.fillRect(enemy.bounds.x, enemy.bounds.y, enemy.bounds.width, enemy.bounds.height);
    
    // Enemy outline
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(enemy.bounds.x, enemy.bounds.y, enemy.bounds.width, enemy.bounds.height);
    
    // Health bar
    if (combat) {
      const healthBarWidth = enemy.bounds.width;
      const healthWidth = (combat.health / combat.maxHealth) * healthBarWidth;
      
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(enemy.bounds.x, enemy.bounds.y - 12, healthBarWidth, 6);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(enemy.bounds.x, enemy.bounds.y - 12, healthWidth, 6);
    }
  };

  const renderPickup = (ctx: CanvasRenderingContext2D, pickup: any) => {
    // Pickup glow effect
    ctx.save();
    ctx.shadowColor = COLORS.NEON_GREEN;
    ctx.shadowBlur = 10;
    
    ctx.fillStyle = COLORS.NEON_GREEN;
    ctx.fillRect(pickup.bounds.x, pickup.bounds.y, pickup.bounds.width, pickup.bounds.height);
    
    ctx.restore();
  };

  const renderEffects = (ctx: CanvasRenderingContext2D) => {
    // Render particle effects, projectiles, etc.
    // This would be implemented with the particle system
  };

  const renderUI = (ctx: CanvasRenderingContext2D, gameState: any, playerStats: any) => {
    // Set UI font
    ctx.font = 'bold 16px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    
    // Health bar
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(20, 20, 200, 20);
    ctx.fillStyle = COLORS.HEALTH;
    ctx.fillRect(20, 20, (playerStats.health / playerStats.maxHealth) * 200, 20);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`HP: ${playerStats.health}/${playerStats.maxHealth}`, 25, 35);
    
    // Mana bar
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(20, 45, 200, 15);
    ctx.fillStyle = COLORS.MANA;
    ctx.fillRect(20, 45, (playerStats.mana / playerStats.maxMana) * 200, 15);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`MP: ${Math.floor(playerStats.mana)}/${playerStats.maxMana}`, 25, 57);
    
    // Player info
    ctx.fillText(`Level: ${playerStats.level}`, 20, 80);
    ctx.fillText(`XP: ${playerStats.experience}`, 20, 100);
    ctx.fillText(`Score: ${gameState.score}`, 20, 120);
    ctx.fillText(`Class: ${playerStats.characterClass.toUpperCase()}`, 20, 140);
    
    // Level info
    const currentLevel = gameManagerRef.current?.getCurrentLevel();
    if (currentLevel) {
      ctx.fillStyle = COLORS.PRIMARY;
      ctx.font = '20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(currentLevel.name, 600, 40);
      
      ctx.font = '14px monospace';
      ctx.fillText(`${currentLevel.environment.toUpperCase()} - ${gameState.difficulty.toUpperCase()}`, 600, 60);
    }
    
    // Controls
    ctx.fillStyle = COLORS.SECONDARY;
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    const controlsY = 500;
    ctx.fillText('WASD/Arrows: Move', 20, controlsY);
    ctx.fillText('Space: Jump', 20, controlsY + 15);
    ctx.fillText('X/Enter: Attack', 20, controlsY + 30);
    ctx.fillText('Shift: Dash', 20, controlsY + 45);
    ctx.fillText('1-6: Abilities', 20, controlsY + 60);
    ctx.fillText('ESC: Pause | I: Inventory | K: Skills', 20, controlsY + 75);
  };

  const renderNotifications = (ctx: CanvasRenderingContext2D) => {
    uiState.notifications.forEach((notification, index) => {
      const y = 100 + (index * 40);
      const alpha = Math.min(1, notification.duration / 1000);
      
      ctx.save();
      ctx.globalAlpha = alpha;
      
      // Background
      ctx.fillStyle = notification.type === 'error' ? COLORS.HEALTH : 
                      notification.type === 'success' ? COLORS.REGENERATION_COLOR :
                      notification.type === 'warning' ? COLORS.LEGENDARY_COLOR :
                      COLORS.PRIMARY;
      ctx.fillRect(400, y, 400, 30);
      
      // Text
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(notification.message, 600, y + 20);
      
      ctx.restore();
    });
  };

  const renderDebugInfo = (ctx: CanvasRenderingContext2D, gameState: any, playerStats: any) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(1000, 20, 180, 200);
    
    ctx.fillStyle = '#00ff00';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    
    let y = 40;
    ctx.fillText(`FPS: ${gameStats.fps}`, 1010, y);
    y += 15;
    ctx.fillText(`Entities: ${gameStats.entityCount}`, 1010, y);
    y += 15;
    ctx.fillText(`Memory: ${gameStats.memoryUsage}MB`, 1010, y);
    y += 15;
    ctx.fillText(`Level: ${gameState.currentLevel}`, 1010, y);
    y += 15;
    ctx.fillText(`Difficulty: ${gameState.difficulty}`, 1010, y);
    y += 15;
    
    const player = gameManagerRef.current?.getPlayerEntity();
    if (player) {
      ctx.fillText(`Player X: ${Math.floor(player.transform.position.x)}`, 1010, y);
      y += 15;
      ctx.fillText(`Player Y: ${Math.floor(player.transform.position.y)}`, 1010, y);
      y += 15;
      
      const physics = player.components.get('physics');
      if (physics) {
        ctx.fillText(`Vel X: ${physics.velocity.x.toFixed(1)}`, 1010, y);
        y += 15;
        ctx.fillText(`Vel Y: ${physics.velocity.y.toFixed(1)}`, 1010, y);
        y += 15;
        ctx.fillText(`On Ground: ${physics.onGround}`, 1010, y);
      }
    }
  };

  const handleBackToLobby = useCallback(() => {
    if (gameManagerRef.current) {
      gameManagerRef.current.stopGame();
    }
    setGameMode('lobby');
  }, [setGameMode]);

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={1200}
          height={600}
          className="border-2 border-purple-500 rounded-lg shadow-2xl"
          style={{ imageRendering: 'pixelated' }}
        />
        
        {/* Game Title Overlay */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
          <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            NEW HAVEN CYBERPUNK REVENGE
          </h1>
          <p className="text-purple-300 text-sm">
            Enhanced Engine - Full Feature Set
          </p>
        </div>

        {/* Pause Menu */}
        {uiState.showPauseMenu && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
            <div className="bg-gray-900 border-2 border-purple-500 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-6">GAME PAUSED</h2>
              <div className="space-y-4">
                <button
                  onClick={togglePause}
                  className="block w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Resume Game
                </button>
                <button
                  onClick={() => gameManagerRef.current?.restartLevel()}
                  className="block w-full px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                >
                  Restart Level
                </button>
                <button
                  onClick={handleBackToLobby}
                  className="block w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Back to Lobby
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-purple-300 pointer-events-none">
          <p className="mb-2">🎮 Enhanced Cyberpunk Experience with Full Feature Set</p>
          <p>💫 Modular architecture ready for C++ porting to Godot!</p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedGame2D;