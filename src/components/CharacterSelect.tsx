import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { CharacterClass } from '../types/game';
import { CHARACTER_CLASSES } from '../data/gameData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Sword, Shield, Zap, Eye, Wand2, Skull, TreePine, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CharacterSelect: React.FC = () => {
  const { createCharacter, setGameMode } = useGame();
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null);
  const [hoveredClass, setHoveredClass] = useState<CharacterClass | null>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showCreationComplete, setShowCreationComplete] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [nameError, setNameError] = useState('');

  const characterIcons = {
    samurai: Sword,
    ninja: Eye,
    warrior: Shield,
    hunter: Eye,
    mage: Wand2,
    necromancer: Skull,
    druid: TreePine
  };

  const handleCharacterSelect = (characterClass: CharacterClass) => {
    setSelectedClass(characterClass);
    setShowNameInput(true);
    setCharacterName('');
    setNameError('');
  };

  const handleNameSubmit = () => {
    if (!selectedClass) {
      setNameError('Please select a character class first');
      return;
    }
    
    const classData = CHARACTER_CLASSES[selectedClass];
    if (!classData) {
      setNameError('Invalid character class selected');
      return;
    }
    
    if (!characterName.trim()) {
      setNameError('Character name is required');
      return;
    }
    
    if (characterName.trim().length < 2) {
      setNameError('Name must be at least 2 characters long');
      return;
    }
    
    if (characterName.trim().length > 20) {
      setNameError('Name must be no more than 20 characters long');
      return;
    }
    
    if (!/^[a-zA-Z0-9\s-_]+$/.test(characterName.trim())) {
      setNameError('Name can only contain letters, numbers, spaces, hyphens, and underscores');
      return;
    }
    
    setNameError('');
    setShowNameInput(false);
    setShowCreationComplete(true);
    
    // Create character after a brief delay for visual feedback
    setTimeout(() => {
      if (selectedClass && CHARACTER_CLASSES[selectedClass]) {
        createCharacter(selectedClass, characterName.trim());
      }
    }, 2000);
  };

  const handleBack = () => {
    setGameMode('lobby');
  };

  const handleClassHover = (characterClass: CharacterClass) => {
    setHoveredClass(characterClass);
  };

  const handleNameInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    }
  };

  const closeNameInput = () => {
    setShowNameInput(false);
    setSelectedClass(null);
    setCharacterName('');
    setNameError('');
  };

  const characterCreationModal = (
    <motion.div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-400 rounded-lg p-8 max-w-md w-full text-center"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        style={{ boxShadow: '0 0 50px #00ffff80' }}
      >
        <motion.div
          className="text-8xl mb-6"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1, repeat: Infinity, repeatType: 'reverse' }
          }}
        >
          ⚡
        </motion.div>
        
        <motion.h2
          className="text-3xl font-bold mb-2 text-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Character Created!
        </motion.h2>
        
        <motion.p
          className="text-gray-300 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {selectedClass && CHARACTER_CLASSES[selectedClass] ? 
            `${CHARACTER_CLASSES[selectedClass].name} "${characterName}" is ready for battle in the cyberpunk world of New Haven!` :
            'Your character is ready for battle in the cyberpunk world of New Haven!'
          }
        </motion.p>
        
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-sm text-gray-400">Initializing neural pathways...</div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const nameInputModal = (
    <motion.div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-400 rounded-lg p-8 max-w-md w-full text-center"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        style={{ boxShadow: '0 0 50px #00ffff80' }}
      >
        <motion.h2
          className="text-2xl font-bold mb-2 text-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Enter Character Name
        </motion.h2>
        
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Label className="text-gray-300 text-sm">Name:</Label>
          <Input
            className="w-full p-2 text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            onKeyPress={handleNameInputKeyPress}
          />
          <div className="text-sm text-red-400">{nameError}</div>
          <Button
            className="w-full mt-4 font-semibold text-white transition-all duration-300"
            style={{ 
              backgroundColor: 'cyan',
              borderColor: 'cyan',
              boxShadow: `0 0 20px cyan`
            }}
            onClick={handleNameSubmit}
          >
            Create Character
          </Button>
          <Button
            className="w-full mt-4 font-semibold text-white transition-all duration-300"
            style={{ 
              backgroundColor: 'gray',
              borderColor: 'gray',
              boxShadow: `0 0 20px gray`
            }}
            onClick={closeNameInput}
          >
            Cancel
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-blue-900/30 to-black">
          {/* Animated particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  y: [null, -window.innerHeight],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-grid-pattern" />
          </div>
          
          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Enhanced Header */}
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
              animate={{
                textShadow: [
                  '0 0 30px #00ffff',
                  '0 0 40px #ff00ff',
                  '0 0 30px #00ffff',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Choose Your Warrior
            </motion.h1>
            <motion.p
              className="text-cyan-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Select your path through the cyberpunk underworld
            </motion.p>
          </div>
          
          <div className="w-32" />
        </motion.div>

        {/* Enhanced Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
          {Object.entries(CHARACTER_CLASSES).map(([key, classData], index) => {
            const Icon = characterIcons[key as CharacterClass];
            const isHovered = hoveredClass === key;
            const isSelected = selectedClass === key;
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                    isSelected 
                      ? 'ring-4 ring-cyan-400 bg-cyan-900/20' 
                      : 'bg-gray-900/80 hover:bg-gray-800/90'
                  } border-2 ${
                    isHovered 
                      ? 'border-cyan-400 shadow-2xl' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => handleCharacterSelect(key as CharacterClass)}
                  onMouseEnter={() => handleClassHover(key as CharacterClass)}
                  onMouseLeave={() => setHoveredClass(null)}
                  style={{
                    boxShadow: isHovered ? `0 0 30px ${classData.color}40` : 'none',
                    borderColor: isHovered ? classData.color : undefined,
                  }}
                >
                  <CardHeader className="text-center pb-3">
                    <motion.div 
                      className="flex justify-center mb-4"
                      animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
                    >
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center relative overflow-hidden"
                        style={{ 
                          backgroundColor: classData.color + '20', 
                          border: `3px solid ${classData.color}`,
                          boxShadow: `0 0 20px ${classData.color}40`
                        }}
                      >
                        <Icon className="w-10 h-10 z-10" style={{ color: classData.color }} />
                        
                        {/* Animated background */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `radial-gradient(circle, ${classData.color}30, transparent)`
                          }}
                          animate={isHovered ? { rotate: 360 } : {}}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                    
                    <CardTitle 
                      className="text-2xl mb-2 font-bold"
                      style={{ color: classData.color }}
                    >
                      {classData.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-sm leading-relaxed">
                      {classData.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Enhanced Base Stats */}
                    <div className="space-y-3">
                      <h4 className="text-cyan-300 font-semibold text-sm flex items-center">
                        <Sparkles className="w-4 h-4 mr-1" />
                        Base Stats
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(classData.baseStats).map(([stat, value]) => (
                          <div key={stat} className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs uppercase">{stat.slice(0, 3)}:</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: classData.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(value / 100) * 100}%` }}
                                  transition={{ duration: 1, delay: index * 0.1 }}
                                />
                              </div>
                              <span className="text-white text-xs w-6 text-right">{value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Skills Preview */}
                    <div className="space-y-2">
                      <h4 className="text-cyan-300 font-semibold text-sm">Signature Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {classData.skills.slice(0, 3).map((skill, skillIndex) => (
                          <motion.span 
                            key={skillIndex}
                            className="px-2 py-1 text-xs rounded transition-all duration-200"
                            style={{ 
                              backgroundColor: isHovered ? classData.color + '30' : '#1f2937',
                              color: isHovered ? '#ffffff' : '#9ca3af'
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                        {classData.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-800 text-xs rounded text-gray-400">
                            +{classData.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Select Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        className="w-full mt-4 font-semibold text-white transition-all duration-300"
                        style={{ 
                          backgroundColor: classData.color,
                          borderColor: classData.color,
                          boxShadow: `0 0 20px ${classData.color}40`
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCharacterSelect(key as CharacterClass);
                        }}
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Select {classData.name}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {showNameInput && selectedClass && nameInputModal}
          {showCreationComplete && selectedClass && CHARACTER_CLASSES[selectedClass] && characterCreationModal}
        </AnimatePresence>

        {/* Enhanced Instructions */}
        <motion.div 
          className="mt-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="bg-black/60 border-cyan-500/30 backdrop-blur-sm">
            <CardContent className="pt-6">
              <p className="text-gray-300 mb-6 text-lg">
                Each character class has unique abilities and playstyles. Choose wisely - your selection will determine your path through the cyberpunk underworld of New Haven.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <motion.div 
                  className="text-center p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(234, 179, 8, 0.2)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Zap className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                  <p className="text-gray-300 font-medium">7 unique skills per class</p>
                </motion.div>
                <motion.div 
                  className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/30"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Shield className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                  <p className="text-gray-300 font-medium">Randomized starting stats</p>
                </motion.div>
                <motion.div 
                  className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/30"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Sword className="w-8 h-8 mx-auto mb-3 text-red-400" />
                  <p className="text-gray-300 font-medium">Level up to 99</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CharacterSelect;