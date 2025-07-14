import React from 'react';
import { useGame } from '../contexts/GameContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Home, 
  User, 
  Package, 
  ShoppingCart, 
  Target,
  Pause,
  RotateCcw,
  Save
} from 'lucide-react';

interface PauseMenuProps {
  isOpen: boolean;
  onResume: () => void;
  onRestart: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ isOpen, onResume, onRestart }) => {
  const { gameState, setGameMode } = useGame();

  const handleLobby = () => {
    setGameMode('lobby');
  };

  const handleInventory = () => {
    setGameMode('inventory');
  };

  const handleShop = () => {
    setGameMode('shop');
  };

  const handleTraining = () => {
    setGameMode('training');
  };

  const handleSaveMenu = () => {
    setGameMode('saveMenu');
  };

  const menuOptions = [
    {
      id: 'resume',
      title: 'Resume Game',
      description: 'Continue your cyberpunk adventure',
      icon: Play,
      action: onResume,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    {
      id: 'training',
      title: 'Training Room',
      description: 'Test your skills against dummies',
      icon: Target,
      action: handleTraining,
      color: 'bg-gradient-to-br from-orange-500 to-red-600'
    },
    {
      id: 'saveMenu',
      title: 'Save & Load',
      description: 'Manage your save files',
      icon: Save,
      action: handleSaveMenu,
      color: 'bg-gradient-to-br from-indigo-500 to-purple-600'
    },
    {
      id: 'inventory',
      title: 'Inventory',
      description: 'Manage your equipment',
      icon: Package,
      action: handleInventory,
      color: 'bg-gradient-to-br from-purple-500 to-pink-600'
    },
    {
      id: 'shop',
      title: 'Cyber Shop',
      description: 'Buy new gear',
      icon: ShoppingCart,
      action: handleShop,
      color: 'bg-gradient-to-br from-cyan-500 to-blue-600'
    },
    {
      id: 'restart',
      title: 'Restart Level',
      description: 'Start this level over',
      icon: RotateCcw,
      action: onRestart,
      color: 'bg-gradient-to-br from-yellow-500 to-orange-600'
    },
    {
      id: 'lobby',
      title: 'Return to Lobby',
      description: 'Go back to main menu',
      icon: Home,
      action: handleLobby,
      color: 'bg-gradient-to-br from-gray-500 to-gray-600'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-400 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            style={{ boxShadow: '0 0 50px #00ffff40' }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                className="flex justify-center mb-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Pause className="w-16 h-16 text-cyan-400" />
              </motion.div>
              
              <motion.h2
                className="text-4xl font-bold mb-2 text-cyan-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Game Paused
              </motion.h2>
              
              <motion.p
                className="text-gray-300 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Take a break, {gameState.currentCharacter?.name || 'Warrior'}
              </motion.p>
            </div>

            {/* Character Status */}
            {gameState.currentCharacter && (
              <motion.div
                className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gray-800/60 border-cyan-400/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-cyan-300 text-center flex items-center justify-center">
                      <User className="w-5 h-5 mr-2" />
                      Character Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-white font-bold text-lg mb-1">
                      {gameState.currentCharacter.name}
                    </div>
                    <div className="text-gray-300 text-sm mb-2">
                      Level {gameState.currentCharacter.level} {gameState.currentCharacter.class.charAt(0).toUpperCase() + gameState.currentCharacter.class.slice(1)}
                    </div>
                    <div className="text-purple-400 text-sm">
                      {gameState.currentCharacter.experience} XP
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/60 border-red-400/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-red-300 text-center">
                      Health Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-red-400 font-bold text-lg mb-1">
                      {gameState.currentCharacter.health} / {gameState.currentCharacter.maxHealth}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(gameState.currentCharacter.health / gameState.currentCharacter.maxHealth) * 100}%` }}
                      />
                    </div>
                    <div className="text-blue-400 text-sm">
                      {gameState.currentCharacter.mana} / {gameState.currentCharacter.maxMana} MP
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/60 border-yellow-400/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-yellow-300 text-center">
                      Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-yellow-400 font-bold text-lg mb-1">
                      {gameState.currentCharacter.credits} Credits
                    </div>
                    <div className="text-green-400 text-sm mb-1">
                      {gameState.currentCharacter.skillPoints} Skill Points
                    </div>
                    <div className="text-gray-300 text-sm">
                      {gameState.currentCharacter.inventory.length} Items
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Menu Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {menuOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card 
                      className={`${option.color} border-0 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50`}
                      onClick={option.action}
                    >
                      <CardHeader className="text-center pb-3">
                        <div className="flex justify-center mb-3">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-white text-lg">
                          {option.title}
                        </CardTitle>
                        <CardDescription className="text-gray-100 text-sm">
                          {option.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <motion.div
              className="flex justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={onResume}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/50"
              >
                <Play className="w-5 h-5 mr-2" />
                Resume Game
              </Button>
              
              <Button
                onClick={handleLobby}
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
              >
                <Home className="w-5 h-5 mr-2" />
                Exit to Lobby
              </Button>
            </motion.div>

            {/* Controls Info */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Card className="bg-black/60 border-cyan-500/30">
                <CardContent className="pt-6">
                  <h3 className="text-cyan-300 font-bold mb-4">Game Controls</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Movement:</span>
                        <span className="text-white">WASD / Arrow Keys</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Jump:</span>
                        <span className="text-white">Space / W / Up</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Attack:</span>
                        <span className="text-white">X / Enter</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Special Ability:</span>
                        <span className="text-white">Z / Shift</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Pause:</span>
                        <span className="text-white">P / Escape</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Training Room:</span>
                        <span className="text-white">T (in game)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PauseMenu;