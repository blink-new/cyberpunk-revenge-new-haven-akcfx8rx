import React from 'react';
import { useGame } from '../contexts/GameContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Sword, ShoppingCart, Package, Zap, User, Target, Star, Coins } from 'lucide-react';
import { motion } from 'framer-motion';

const Lobby: React.FC = () => {
  const { gameState, setGameMode } = useGame();

  const lobbyActions = [
    {
      id: 'characterSelect',
      title: 'Choose Character',
      description: 'Select your cyberpunk warrior',
      icon: User,
      action: () => setGameMode('characterSelect'),
      color: 'bg-gradient-to-br from-cyan-500 to-blue-600'
    },
    {
      id: 'shop',
      title: 'Cyber Shop',
      description: 'Buy weapons and gear',
      icon: ShoppingCart,
      action: () => setGameMode('shop'),
      color: 'bg-gradient-to-br from-purple-500 to-pink-600',
      disabled: !gameState.currentCharacter
    },
    {
      id: 'chest',
      title: 'Storage Chest',
      description: 'Manage your loot',
      icon: Package,
      action: () => setGameMode('inventory'),
      color: 'bg-gradient-to-br from-orange-500 to-red-600',
      disabled: !gameState.currentCharacter
    },
    {
      id: 'skills',
      title: 'Skill Tree',
      description: 'Upgrade your abilities',
      icon: Zap,
      action: () => setGameMode('skillTree'),
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      disabled: !gameState.currentCharacter
    },
    {
      id: 'levels',
      title: 'Level Select',
      description: 'Choose your mission',
      icon: Target,
      action: () => setGameMode('levelSelect'),
      color: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      disabled: !gameState.currentCharacter
    },
    {
      id: 'jump',
      title: 'JUMP!',
      description: 'Begin your revenge',
      icon: Sword,
      action: () => setGameMode('game'),
      color: 'bg-gradient-to-br from-red-500 to-pink-600',
      disabled: !gameState.currentCharacter
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/20 to-black">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-repeat" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 animate-pulse" />
      </div>

      {/* Neon Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Enhanced Header with Character Info */}
        {gameState.currentCharacter ? (
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl font-bold mb-4"
              style={{
                background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px #00ffff'
              }}
              animate={{
                textShadow: [
                  '0 0 30px #00ffff',
                  '0 0 40px #ff00ff',
                  '0 0 30px #00ffff',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              NEW HAVEN CHRONICLES
            </motion.h1>
            <motion.p
              className="text-cyan-300 text-xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome back, {gameState.currentCharacter.name}
            </motion.p>
            <motion.div
              className="flex justify-center gap-6 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Badge variant="outline" className="text-cyan-400 border-cyan-400 text-lg px-4 py-2">
                <User className="w-5 h-5 mr-2" />
                {gameState.currentCharacter.name}
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-400 text-lg px-4 py-2">
                <Zap className="w-5 h-5 mr-2" />
                {gameState.currentCharacter.class.charAt(0).toUpperCase() + gameState.currentCharacter.class.slice(1)}
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400 text-lg px-4 py-2">
                <Star className="w-5 h-5 mr-2" />
                Level {gameState.currentCharacter.level}
              </Badge>
              <Badge variant="outline" className="text-orange-400 border-orange-400 text-lg px-4 py-2">
                <Coins className="w-5 h-5 mr-2" />
                {gameState.currentCharacter.credits} Credits
              </Badge>
            </motion.div>
          </motion.div>
        ) : (
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              NEW HAVEN
            </h1>
            <h2 className="text-3xl font-semibold mb-2 text-cyan-300">
              CYBERPUNK REVENGE
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              2077 - The neon-lit streets of New Haven call for vengeance. 
              The Shimoto gang murdered your family. Now it's time for payback.
            </p>
          </div>
        )}

        {/* Character Status */}
        {gameState.currentCharacter && (
          <div className="mb-8 flex justify-center">
            <Card className="bg-gray-900/80 border-cyan-500/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-cyan-300 text-center">
                  {gameState.currentCharacter.name}
                </CardTitle>
                <CardDescription className="text-gray-400 text-center">
                  Level {gameState.currentCharacter.level} • {gameState.difficulty.toUpperCase()} Mode
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-red-400 font-semibold">{gameState.currentCharacter.health}</div>
                  <div className="text-gray-400">HP</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 font-semibold">{gameState.currentCharacter.mana}</div>
                  <div className="text-gray-400">MP</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 font-semibold">{gameState.currentCharacter.experience}</div>
                  <div className="text-gray-400">EXP</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {lobbyActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.id}
                className={`${action.color} border-0 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 ${
                  action.disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={action.disabled ? undefined : action.action}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">
                    {action.title}
                  </CardTitle>
                  <CardDescription className="text-gray-100">
                    {action.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Story Text */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <Card className="bg-black/60 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-300">The Story So Far...</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-left space-y-4">
              <p>
                In the year 2077, the cyberpunk metropolis of New Haven pulses with neon light and digital corruption. 
                Your family was brutally murdered by the Shimoto gang, and their boss's laughter still echoes in your nightmares.
              </p>
              <p>
                You sought training from the legendary "Immortal Warrior" Shinzu, the last master of the ancient ways. 
                But when you were ready for revenge, they found you first and captured your master.
              </p>
              <p className="text-cyan-300 font-semibold">
                "Hahahah you will never defeat me, I know you too well!"
              </p>
              <p>
                Now you must gather information in the coastal city of MaKa, where your parents originated. 
                The path to vengeance leads through 50 dangerous levels of the cyberpunk underworld.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Lobby;