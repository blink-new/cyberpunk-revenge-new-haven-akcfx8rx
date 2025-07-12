import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Coins, Star, Zap, Shield, Sparkles } from 'lucide-react';

const Shop: React.FC = () => {
  const { gameState, setGameMode, addItemToInventory, spendCredits } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('weapons');
  const [purchaseAnimation, setPurchaseAnimation] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  if (!gameState.currentCharacter) {
    return <div>No character selected</div>;
  }

  const character = gameState.currentCharacter;
  const credits = gameState.credits;

  const shopItems = [
    {
      id: 'sword_basic',
      name: 'Neon Cyber Blade',
      type: 'weapon',
      category: 'weapons',
      rarity: 'epic',
      price: 150,
      damage: 35,
      description: 'A blade infused with neon energy that cuts through digital barriers',
      icon: '⚔️',
      effects: ['Neon Slash', 'Digital Cut']
    },
    {
      id: 'katana_advanced',
      name: 'Quantum Katana',
      type: 'weapon',
      category: 'weapons',
      rarity: 'legendary',
      price: 350,
      damage: 65,
      description: 'A legendary blade that exists in multiple dimensions simultaneously',
      icon: '🗡️',
      effects: ['Quantum Strike', 'Dimensional Slash', 'Reality Rend']
    },
    {
      id: 'pistol_cyber',
      name: 'Neural Disruptor',
      type: 'weapon',
      category: 'weapons',
      rarity: 'epic',
      price: 200,
      damage: 40,
      description: 'Fires energy projectiles that disrupt neural pathways',
      icon: '🔫',
      effects: ['Neural Shock', 'Mind Hack']
    },
    {
      id: 'armor_basic',
      name: 'Cyber Mesh Armor',
      type: 'armor',
      category: 'armor',
      rarity: 'epic',
      price: 120,
      defense: 30,
      description: 'Lightweight armor with integrated defensive systems',
      icon: '🛡️',
      effects: ['Energy Shield', 'Damage Reduction']
    },
    {
      id: 'armor_advanced',
      name: 'Quantum Barrier Suit',
      type: 'armor',
      category: 'armor',
      rarity: 'legendary',
      price: 280,
      defense: 50,
      description: 'Advanced armor that manipulates quantum fields for protection',
      icon: '🦾',
      effects: ['Quantum Shield', 'Phase Dodge', 'Energy Absorption']
    },
    {
      id: 'helmet_hacker',
      name: 'Neural Interface Helmet',
      type: 'armor',
      category: 'armor',
      rarity: 'epic',
      price: 180,
      defense: 25,
      description: 'Enhances hacking abilities and provides mental protection',
      icon: '⚡',
      effects: ['Mind Shield', 'Hack Boost', 'Neural Link']
    },
    {
      id: 'health_stimpack',
      name: 'Nano-Repair Stimpack',
      type: 'consumable',
      category: 'consumables',
      rarity: 'epic',
      price: 35,
      description: 'Advanced nanobots that rapidly repair cellular damage',
      icon: '💉',
      effects: ['Instant Heal +75 HP', 'Regeneration Boost']
    },
    {
      id: 'mana_booster',
      name: 'Neural Energy Booster',
      type: 'consumable',
      category: 'consumables',
      rarity: 'epic',
      price: 30,
      description: 'Enhances neural energy for increased mana capacity',
      icon: '🧪',
      effects: ['Instant Mana +50 MP', 'Enhanced Focus']
    },
    {
      id: 'exp_chip',
      name: 'Experience Data Chip',
      type: 'consumable',
      category: 'consumables',
      rarity: 'legendary',
      price: 100,
      description: 'Contains compressed combat experience data',
      icon: '💾',
      effects: ['Instant XP +500', 'Skill Point +1']
    },
    {
      id: 'cyber_enhancer',
      name: 'Cybernetic Enhancement',
      type: 'consumable',
      category: 'consumables',
      rarity: 'ultimate',
      price: 250,
      description: 'Permanently enhances physical and mental capabilities',
      icon: '🔬',
      effects: ['All Stats +5', 'Permanent Boost']
    }
  ];

  const handlePurchase = (item: typeof shopItems[0]) => {
    if (credits >= item.price) {
      const success = spendCredits(item.price);
      if (success) {
        const purchasedItem = { ...item, id: `${item.id}_${Date.now()}` };
        addItemToInventory(purchasedItem);
        setPurchaseAnimation(item.id);
        setTimeout(() => setPurchaseAnimation(null), 1000);
      }
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'epic': return '#a855f7';
      case 'legendary': return '#f97316';
      case 'ultimate': return '#ef4444';
      default: return '#ffffff';
    }
  };

  const getRarityGlow = (rarity: string) => {
    const color = getRarityColor(rarity);
    return `0 0 20px ${color}`;
  };

  const categories = [
    { id: 'weapons', name: 'Weapons', icon: '⚔️', color: '#ef4444' },
    { id: 'armor', name: 'Armor', icon: '🛡️', color: '#3b82f6' },
    { id: 'consumables', name: 'Consumables', icon: '🧪', color: '#10b981' }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30">
          {/* Animated grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-grid-pattern" />
          </div>
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-40"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            ))}
          </div>
          
          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl font-bold mb-4"
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
            🛒 CYBERPUNK BAZAAR
          </motion.h1>
          
          <motion.div
            className="flex justify-center items-center gap-6 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge variant="outline" className="text-green-400 border-green-400 text-lg px-4 py-2">
              <Coins className="w-5 h-5 mr-2" />
              {credits.toLocaleString()} Credits
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400 text-lg px-4 py-2">
              <Zap className="w-5 h-5 mr-2" />
              Level {character.level}
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-400 text-lg px-4 py-2">
              <Star className="w-5 h-5 mr-2" />
              {character.class.charAt(0).toUpperCase() + character.class.slice(1)}
            </Badge>
          </motion.div>
        </motion.div>

        {/* Enhanced Category Navigation */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 ${
                selectedCategory === category.id
                  ? 'border-cyan-400 bg-cyan-900/50 text-cyan-100'
                  : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: selectedCategory === category.id ? '0 0 20px #00ffff40' : 'none',
              }}
            >
              <span className="text-2xl mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <AnimatePresence mode="wait">
            {shopItems
              .filter(item => item.category === selectedCategory)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layout
                >
                  <Card
                    className="cursor-pointer transition-all duration-300 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800/90 relative overflow-hidden"
                    style={{
                      borderColor: getRarityColor(item.rarity),
                      borderWidth: '2px',
                      boxShadow: hoveredItem === item.id ? getRarityGlow(item.rarity) : 'none',
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Purchase animation overlay */}
                    <AnimatePresence>
                      {purchaseAnimation === item.id && (
                        <motion.div
                          className="absolute inset-0 bg-green-500/50 flex items-center justify-center z-20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="text-4xl"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.2 }}
                            transition={{ duration: 0.5 }}
                          >
                            ✅
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <motion.div
                          className="text-4xl"
                          animate={hoveredItem === item.id ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5, repeat: hoveredItem === item.id ? Infinity : 0 }}
                        >
                          {item.icon}
                        </motion.div>
                        <Badge
                          style={{
                            backgroundColor: getRarityColor(item.rarity),
                            color: 'white',
                            textShadow: `0 0 10px ${getRarityColor(item.rarity)}`,
                          }}
                        >
                          {item.rarity.toUpperCase()}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-xl font-bold">
                        {item.name}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-4 pt-0">
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="space-y-3 mb-4">
                        {item.damage && (
                          <div className="flex justify-between items-center">
                            <span className="text-red-400 flex items-center">
                              <Zap className="w-4 h-4 mr-1" />
                              Damage:
                            </span>
                            <span className="text-white font-bold">{item.damage}</span>
                          </div>
                        )}
                        {item.defense && (
                          <div className="flex justify-between items-center">
                            <span className="text-blue-400 flex items-center">
                              <Shield className="w-4 h-4 mr-1" />
                              Defense:
                            </span>
                            <span className="text-white font-bold">{item.defense}</span>
                          </div>
                        )}
                        
                        {/* Effects */}
                        {item.effects && (
                          <div className="space-y-2">
                            <span className="text-purple-400 text-sm font-semibold flex items-center">
                              <Sparkles className="w-4 h-4 mr-1" />
                              Effects:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {item.effects.map((effect, effectIndex) => (
                                <span
                                  key={effectIndex}
                                  className="px-2 py-1 bg-purple-900/50 text-purple-200 text-xs rounded border border-purple-400/30"
                                >
                                  {effect}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <Badge variant="outline" className="text-yellow-400 border-yellow-400 text-lg px-3 py-1">
                          <Coins className="w-4 h-4 mr-1" />
                          {item.price}
                        </Badge>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => handlePurchase(item)}
                          disabled={credits < item.price}
                          className={`w-full font-semibold transition-all duration-300 ${
                            credits >= item.price
                              ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                              : 'bg-gray-600 cursor-not-allowed text-gray-300'
                          }`}
                          style={{
                            boxShadow: credits >= item.price ? '0 0 20px #10b98140' : 'none',
                          }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {credits >= item.price ? 'Purchase' : 'Insufficient Credits'}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Enhanced Footer */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex justify-center gap-4 mb-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setGameMode('inventory')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-semibold"
                style={{ boxShadow: '0 0 20px #3b82f640' }}
              >
                🎒 View Inventory
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setGameMode('lobby')}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 text-lg font-semibold"
                style={{ boxShadow: '0 0 20px #9333ea40' }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Lobby
              </Button>
            </motion.div>
          </div>
          
          <motion.p
            className="text-gray-400 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💡 Complete missions to earn more credits and unlock rare items!
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Shop;