import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGame } from '../contexts/GameContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Target, 
  Zap, 
  Sword,
  Shield,
  Trophy,
  Activity
} from 'lucide-react';

interface TrainingDummy {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  maxHealth: number;
  type: 'basic' | 'armored' | 'agile' | 'boss';
  isActive: boolean;
  isDestroyed: boolean;
  lastHit: number;
  armor: number;
  color: string;
}

interface TrainingStats {
  damage: number;
  hits: number;
  misses: number;
  criticalHits: number;
  totalTime: number;
  dps: number;
  accuracy: number;
}

const TrainingRoom: React.FC = () => {
  const { gameState, setGameMode } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const keysRef = useRef<Set<string>>(new Set());
  
  const [player, setPlayer] = useState({
    x: 100,
    y: 300,
    width: 32,
    height: 48,
    velocityX: 0,
    velocityY: 0,
    onGround: false,
    facingRight: true,
    isMoving: false,
    isAttacking: false,
    health: 100,
    maxHealth: 100,
    mana: 100,
    maxMana: 100,
    specialAbilityCooldown: 0,
    animationFrame: 0
  });

  const [dummies, setDummies] = useState<TrainingDummy[]>([
    {
      id: 'dummy1',
      x: 300,
      y: 300,
      width: 32,
      height: 48,
      health: 100,
      maxHealth: 100,
      type: 'basic',
      isActive: true,
      isDestroyed: false,
      lastHit: 0,
      armor: 0,
      color: '#8b5cf6'
    },
    {
      id: 'dummy2',
      x: 500,
      y: 300,
      width: 32,
      height: 48,
      health: 150,
      maxHealth: 150,
      type: 'armored',
      isActive: true,
      isDestroyed: false,
      lastHit: 0,
      armor: 25,
      color: '#fbbf24'
    },
    {
      id: 'dummy3',
      x: 700,
      y: 300,
      width: 32,
      height: 48,
      health: 80,
      maxHealth: 80,
      type: 'agile',
      isActive: true,
      isDestroyed: false,
      lastHit: 0,
      armor: 5,
      color: '#10b981'
    },
    {
      id: 'boss_dummy',
      x: 900,
      y: 280,
      width: 48,
      height: 68,
      health: 300,
      maxHealth: 300,
      type: 'boss',
      isActive: true,
      isDestroyed: false,
      lastHit: 0,
      armor: 50,
      color: '#ef4444'
    }
  ]);

  const [trainingStats, setTrainingStats] = useState<TrainingStats>({
    damage: 0,
    hits: 0,
    misses: 0,
    criticalHits: 0,
    totalTime: 0,
    dps: 0,
    accuracy: 0
  });

  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const [isTraining, setIsTraining] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 600;
  const GRAVITY = 0.6;
  const JUMP_FORCE = 14;
  const MOVE_SPEED = 5;

  // Get character abilities
  const getCharacterAbilities = (characterClass: string) => {
    const abilities = {
      samurai: { name: 'Dash Strike', manaCost: 15, cooldown: 120, color: '#ff6b6b' },
      ninja: { name: 'Shadow Strike', manaCost: 20, cooldown: 180, color: '#4ecdc4' },
      hunter: { name: 'Piercing Shot', manaCost: 12, cooldown: 90, color: '#6bcf7f' },
      warrior: { name: 'Shield Bash', manaCost: 25, cooldown: 150, color: '#ffd93d' },
      mage: { name: 'Fireball', manaCost: 18, cooldown: 100, color: '#ff9f43' },
      necromancer: { name: 'Soul Drain', manaCost: 22, cooldown: 130, color: '#8e44ad' },
      druid: { name: 'Nature\'s Wrath', manaCost: 20, cooldown: 140, color: '#27ae60' }
    };
    return abilities[characterClass as keyof typeof abilities] || abilities.samurai;
  };

  const currentAbility = getCharacterAbilities(gameState.currentCharacter?.class || 'samurai');

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



  // Reset training session
  const resetTraining = () => {
    setDummies(prev => prev.map(dummy => ({
      ...dummy,
      health: dummy.maxHealth,
      isDestroyed: false,
      lastHit: 0
    })));
    setTrainingStats({
      damage: 0,
      hits: 0,
      misses: 0,
      criticalHits: 0,
      totalTime: 0,
      dps: 0,
      accuracy: 0
    });
    setSessionStartTime(Date.now());
    setIsTraining(true);
  };

  // Physics update
  const updatePhysics = useCallback(() => {
    const keys = keysRef.current;
    
    setPlayer(prevPlayer => {
      const newPlayer = { ...prevPlayer };
      
      // Handle input
      newPlayer.isMoving = false;
      newPlayer.isAttacking = false;
      
      // Horizontal movement
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
      
      // Jumping
      if ((keys.has('arrowup') || keys.has('w') || keys.has(' ')) && newPlayer.onGround) {
        newPlayer.velocityY = -JUMP_FORCE;
        newPlayer.onGround = false;
      }
      
      // Attack
      if (keys.has('x') || keys.has('enter')) {
        newPlayer.isAttacking = true;
      }
      
      // Special ability
      if ((keys.has('z') || keys.has('shift')) && newPlayer.specialAbilityCooldown === 0 && newPlayer.mana >= currentAbility.manaCost) {
        newPlayer.mana -= currentAbility.manaCost;
        newPlayer.specialAbilityCooldown = currentAbility.cooldown;
        newPlayer.isAttacking = true; // Special abilities also count as attacks
      }
      
      // Apply gravity
      if (!newPlayer.onGround) {
        newPlayer.velocityY += GRAVITY;
      }
      
      // Update position
      newPlayer.x += newPlayer.velocityX;
      newPlayer.y += newPlayer.velocityY;
      
      // Ground collision (simple floor at y=348)
      if (newPlayer.y + newPlayer.height > 348) {
        newPlayer.y = 348 - newPlayer.height;
        newPlayer.velocityY = 0;
        newPlayer.onGround = true;
      }
      
      // Keep player in bounds
      if (newPlayer.x < 0) newPlayer.x = 0;
      if (newPlayer.x + newPlayer.width > CANVAS_WIDTH) newPlayer.x = CANVAS_WIDTH - newPlayer.width;
      
      // Update cooldowns
      if (newPlayer.specialAbilityCooldown > 0) newPlayer.specialAbilityCooldown--;
      
      // Mana regeneration
      if (newPlayer.mana < newPlayer.maxMana) {
        newPlayer.mana = Math.min(newPlayer.maxMana, newPlayer.mana + 0.2);
      }
      
      // Update animation frame
      if (newPlayer.isMoving) {
        newPlayer.animationFrame = (newPlayer.animationFrame + 1) % 60;
      }
      
      return newPlayer;
    });
  }, [currentAbility]);

  // Combat system
  useEffect(() => {
    if (player.isAttacking && isTraining) {
      setDummies(prevDummies => {
        return prevDummies.map(dummy => {
          if (dummy.isDestroyed) return dummy;
          
          const distance = Math.abs(player.x - dummy.x);
          const verticalDistance = Math.abs(player.y - dummy.y);
          
          // Check if player is in range to hit dummy
          if (distance < 80 && verticalDistance < 60) {
            const isCritical = Math.random() < 0.15; // 15% crit chance
            const baseDamage = 25 + Math.floor(Math.random() * 15);
            const critMultiplier = isCritical ? 2 : 1;
            const totalDamage = baseDamage * critMultiplier;
            const finalDamage = Math.max(1, totalDamage - dummy.armor);
            
            const newHealth = Math.max(0, dummy.health - finalDamage);
            
            // Update training stats
            setTrainingStats(prev => ({
              ...prev,
              damage: prev.damage + finalDamage,
              hits: prev.hits + 1,
              criticalHits: prev.criticalHits + (isCritical ? 1 : 0),
              totalTime: (Date.now() - sessionStartTime) / 1000,
              dps: (prev.damage + finalDamage) / Math.max(1, (Date.now() - sessionStartTime) / 1000),
              accuracy: ((prev.hits + 1) / (prev.hits + prev.misses + 1)) * 100
            }));
            
            return {
              ...dummy,
              health: newHealth,
              isDestroyed: newHealth <= 0,
              lastHit: Date.now()
            };
          }
          
          return dummy;
        });
      });
      
      // If attack missed all dummies, count as miss
      const anyHit = dummies.some(dummy => {
        const distance = Math.abs(player.x - dummy.x);
        const verticalDistance = Math.abs(player.y - dummy.y);
        return !dummy.isDestroyed && distance < 80 && verticalDistance < 60;
      });
      
      if (!anyHit) {
        setTrainingStats(prev => ({
          ...prev,
          misses: prev.misses + 1,
          accuracy: (prev.hits / (prev.hits + prev.misses + 1)) * 100
        }));
      }
    }
  }, [player.isAttacking, isTraining, player.x, player.y, dummies, sessionStartTime]);

  // Game loop
  useEffect(() => {
    if (!isTraining) return;
    
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
  }, [updatePhysics, isTraining]);

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw training room background
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw grid pattern
    ctx.strokeStyle = '#ffffff10';
    ctx.lineWidth = 1;
    for (let x = 0; x < CANVAS_WIDTH; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y < CANVAS_HEIGHT; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }
    
    // Draw ground
    ctx.fillStyle = '#2a2a3e';
    ctx.fillRect(0, 350, CANVAS_WIDTH, 250);
    
    // Draw training dummies
    dummies.forEach(dummy => {
      if (dummy.isDestroyed) return;
      
      // Dummy body
      ctx.fillStyle = dummy.color;
      ctx.fillRect(dummy.x, dummy.y, dummy.width, dummy.height);
      
      // Dummy outline
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(dummy.x, dummy.y, dummy.width, dummy.height);
      
      // Dummy type indicator
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(dummy.type.toUpperCase(), dummy.x + dummy.width/2, dummy.y - 10);
      
      // Health bar
      const healthBarWidth = dummy.width;
      const healthWidth = (dummy.health / dummy.maxHealth) * healthBarWidth;
      ctx.fillStyle = '#333333';
      ctx.fillRect(dummy.x, dummy.y - 25, healthBarWidth, 8);
      ctx.fillStyle = dummy.health > dummy.maxHealth * 0.5 ? '#22c55e' : '#ef4444';
      ctx.fillRect(dummy.x, dummy.y - 25, healthWidth, 8);
      
      // Damage indicator
      if (Date.now() - dummy.lastHit < 200) {
        ctx.fillStyle = '#ff6b6b';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('HIT!', dummy.x + dummy.width/2, dummy.y - 35);
      }
      
      // Armor indicator
      if (dummy.armor > 0) {
        ctx.fillStyle = '#fbbf24';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`ARM: ${dummy.armor}`, dummy.x + dummy.width/2, dummy.y + dummy.height + 15);
      }
    });
    
    // Draw player
    const characterClass = gameState.currentCharacter?.class || 'samurai';
    const playerColor = currentAbility.color;
    
    ctx.fillStyle = playerColor;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Player outline
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
    
    // Player direction indicator
    ctx.fillStyle = '#ffffff';
    if (player.facingRight) {
      ctx.fillRect(player.x + player.width - 6, player.y + 10, 6, 12);
    } else {
      ctx.fillRect(player.x, player.y + 10, 6, 12);
    }
    
    // Attack indicator
    if (player.isAttacking) {
      ctx.strokeStyle = playerColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (player.facingRight) {
        ctx.moveTo(player.x + player.width, player.y + player.height/2);
        ctx.lineTo(player.x + player.width + 60, player.y + player.height/2);
      } else {
        ctx.moveTo(player.x, player.y + player.height/2);
        ctx.lineTo(player.x - 60, player.y + player.height/2);
      }
      ctx.stroke();
    }
    
    // Draw UI
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'left';
    
    // Player stats
    ctx.fillText(`${gameState.currentCharacter?.name || 'Warrior'}`, 20, 30);
    ctx.fillText(`Class: ${characterClass.toUpperCase()}`, 20, 50);
    
    // Mana bar
    const manaWidth = (player.mana / player.maxMana) * 200;
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(20, 60, 200, 15);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(20, 60, manaWidth, 15);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 60, 200, 15);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.fillText(`MP: ${Math.floor(player.mana)}/${player.maxMana}`, 25, 72);
    
    // Special ability UI
    const abilityReady = player.specialAbilityCooldown === 0 && player.mana >= currentAbility.manaCost;
    ctx.fillStyle = abilityReady ? currentAbility.color : '#666666';
    ctx.fillRect(20, 90, 200, 30);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 90, 200, 30);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.fillText(`[Z] ${currentAbility.name}`, 25, 110);
    
    if (player.specialAbilityCooldown > 0) {
      ctx.fillStyle = '#ff6b6b';
      ctx.font = '10px monospace';
      ctx.fillText(`Cooldown: ${Math.ceil(player.specialAbilityCooldown / 60)}s`, 25, 85);
    }
    
    // Training stats
    if (isTraining) {
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'right';
      
      ctx.fillText(`Damage: ${trainingStats.damage}`, CANVAS_WIDTH - 20, 30);
      ctx.fillText(`Hits: ${trainingStats.hits}`, CANVAS_WIDTH - 20, 50);
      ctx.fillText(`Misses: ${trainingStats.misses}`, CANVAS_WIDTH - 20, 70);
      ctx.fillText(`Critical: ${trainingStats.criticalHits}`, CANVAS_WIDTH - 20, 90);
      ctx.fillText(`DPS: ${trainingStats.dps.toFixed(1)}`, CANVAS_WIDTH - 20, 110);
      ctx.fillText(`Accuracy: ${trainingStats.accuracy.toFixed(1)}%`, CANVAS_WIDTH - 20, 130);
      
      const elapsedTime = (Date.now() - sessionStartTime) / 1000;
      ctx.fillText(`Time: ${elapsedTime.toFixed(1)}s`, CANVAS_WIDTH - 20, 150);
    }
    
    // Controls
    ctx.fillStyle = '#a855f7';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('WASD: Move  X: Attack  Z: Special  R: Reset  ESC: Back', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 20);
    
    ctx.textAlign = 'left';
  }, [player, dummies, gameState.currentCharacter, currentAbility, isTraining, trainingStats, sessionStartTime]);

  // Handle special keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGameMode('lobby');
      } else if (e.key.toLowerCase() === 'r') {
        resetTraining();
      } else if (e.key.toLowerCase() === 's') {
        setShowStats(!showStats);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setGameMode, showStats]);

  const handleBack = () => {
    setGameMode('lobby');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/20 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-grid-pattern" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Lobby
          </Button>

          <div className="text-center">
            <motion.h1
              className="text-5xl font-bold mb-2"
              style={{
                background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px #00ffff'
              }}
            >
              Training Room
            </motion.h1>
            <motion.p
              className="text-cyan-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Test your skills against training dummies
            </motion.p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={resetTraining}
              className="bg-orange-600 hover:bg-orange-700 text-white transition-all duration-300"
            >
              <Target className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={() => setShowStats(!showStats)}
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400/10 transition-all duration-300"
            >
              <Activity className="w-4 h-4 mr-2" />
              Stats
            </Button>
          </div>
        </motion.div>

        {/* Game Canvas */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="border-2 border-cyan-500 rounded-lg shadow-2xl"
              style={{ imageRendering: 'pixelated' }}
            />

            {/* Training Status Overlay */}
            {!isTraining && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-lg">
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Target className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                  <h3 className="text-2xl font-bold mb-2 text-cyan-400">Training Room Ready</h3>
                  <p className="text-gray-300 mb-4">Click Reset to start training session</p>
                  <Button
                    onClick={resetTraining}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Start Training
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Training Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/80 border-purple-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-300 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Basic Dummy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-300">
                <p>Health: 100 HP</p>
                <p>Armor: 0</p>
                <p>Perfect for accuracy training</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-yellow-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-yellow-300 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Armored Dummy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-300">
                <p>Health: 150 HP</p>
                <p>Armor: 25</p>
                <p>Tests damage penetration</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-green-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-300 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Agile Dummy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-300">
                <p>Health: 80 HP</p>
                <p>Armor: 5</p>
                <p>Quick reflexes training</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-red-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-red-300 flex items-center">
                <Sword className="w-5 h-5 mr-2" />
                Boss Dummy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-300">
                <p>Health: 300 HP</p>
                <p>Armor: 50</p>
                <p>Ultimate challenge</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Panel */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className="bg-gray-900/80 border-cyan-500/50">
                <CardHeader>
                  <CardTitle className="text-cyan-300 flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Training Statistics
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Current session performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">{trainingStats.damage}</div>
                      <div className="text-sm text-gray-300">Total Damage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{trainingStats.hits}</div>
                      <div className="text-sm text-gray-300">Hits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{trainingStats.criticalHits}</div>
                      <div className="text-sm text-gray-300">Critical Hits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{trainingStats.dps.toFixed(1)}</div>
                      <div className="text-sm text-gray-300">DPS</div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{trainingStats.accuracy.toFixed(1)}%</div>
                      <div className="text-sm text-gray-300">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{((Date.now() - sessionStartTime) / 1000).toFixed(1)}s</div>
                      <div className="text-sm text-gray-300">Session Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Card className="bg-black/60 border-cyan-500/30">
            <CardContent className="pt-6">
              <h3 className="text-cyan-300 font-bold mb-4 text-center">Training Controls</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Movement:</span>
                    <span className="text-white">WASD / Arrow Keys</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Jump:</span>
                    <span className="text-white">Space / W / Up</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Attack:</span>
                    <span className="text-white">X / Enter</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Special:</span>
                    <span className="text-white">Z / Shift</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Reset:</span>
                    <span className="text-white">R</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Stats:</span>
                    <span className="text-white">S</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TrainingRoom;