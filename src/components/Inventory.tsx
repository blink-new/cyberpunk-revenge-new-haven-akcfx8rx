import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Item, CharacterClass } from '../types/game';
import { RARITY_COLORS } from '../data/gameData';
import { WEAPONS, ARMOR_SETS, CONSUMABLES, ACCESSORIES } from '../data/equipment';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Package, 
  Sword, 
  Shield, 
  Zap, 
  Star, 
  Sparkles,
  Plus,

  Eye,
  ShoppingBag
} from 'lucide-react';

const Inventory: React.FC = () => {
  const { gameState, setGameMode, addItemToInventory, removeItemFromInventory } = useGame();
  const [activeTab, setActiveTab] = useState<'inventory' | 'equipment' | 'shop'>('inventory');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [actionAnimation, setActionAnimation] = useState<string | null>(null);

  if (!gameState.currentCharacter) {
    return <div>No character selected</div>;
  }

  const character = gameState.currentCharacter;

  const getRarityColor = (rarity: string) => {
    return RARITY_COLORS[rarity as keyof typeof RARITY_COLORS] || '#ffffff';
  };

  const getRarityGlow = (rarity: string) => {
    const color = getRarityColor(rarity);
    return `0 0 25px ${color}`;
  };

  const getItemIcon = (item: Item) => {
    if (item.type === 'weapon') {
      return '⚔️';
    } else if (item.type === 'armor') {
      return '🛡️';
    } else if (item.type === 'consumable') {
      return '🧪';
    } else if (['ring', 'necklace', 'gloves', 'boots', 'helmet'].includes(item.type)) {
      return '💎';
    }
    return '📦';
  };

  const canEquipItem = (item: Item) => {
    if (item.characterClass && item.characterClass !== character.class) {
      return false;
    }
    return item.type === 'weapon' || item.type === 'armor' || ['ring', 'necklace', 'gloves', 'boots', 'helmet'].includes(item.type);
  };

  const equipItem = (item: Item) => {
    if (!canEquipItem(item)) return;
    
    setActionAnimation(`equip_${item.id}`);
    setTimeout(() => setActionAnimation(null), 1000);
    
    // For demo purposes, we'll just show that the item would be equipped
    setTimeout(() => {
      removeItemFromInventory(item.id);
    }, 500);
  };

  const handleUseConsumable = (item: Item) => {
    if (item.type !== 'consumable') return;
    
    setActionAnimation(`use_${item.id}`);
    setTimeout(() => setActionAnimation(null), 1000);
    
    // Basic consumable effects
    setTimeout(() => {
      removeItemFromInventory(item.id);
    }, 500);
  };

  const addSampleItems = () => {
    const characterClass = character.class as CharacterClass;
    const weapons = WEAPONS[characterClass];
    const armor = ARMOR_SETS[characterClass];
    const consumables = CONSUMABLES;
    
    // Add some random items
    const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
    const randomArmor = armor[Math.floor(Math.random() * armor.length)];
    const randomConsumable = consumables[Math.floor(Math.random() * consumables.length)];
    const randomAccessory = ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)];
    
    addItemToInventory({ ...randomWeapon, id: `${randomWeapon.id}_${Date.now()}` });
    addItemToInventory({ ...randomArmor, id: `${randomArmor.id}_${Date.now()}` });
    addItemToInventory({ ...randomConsumable, id: `${randomConsumable.id}_${Date.now()}` });
    addItemToInventory({ ...randomAccessory, id: `${randomAccessory.id}_${Date.now()}` });
  };

  const inventoryStats = {
    total: gameState.currentCharacter?.inventory.length || 0,
    weapons: gameState.currentCharacter?.inventory.filter(item => item.type === 'weapon').length || 0,
    armor: gameState.currentCharacter?.inventory.filter(item => item.type === 'armor').length || 0,
    accessories: gameState.currentCharacter?.inventory.filter(item => ['ring', 'necklace', 'gloves', 'boots', 'helmet'].includes(item.type)).length || 0,
    consumables: gameState.currentCharacter?.inventory.filter(item => item.type === 'consumable').length || 0,
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30">
          {/* Animated grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-grid-pattern" />
          </div>
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-50"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  y: [null, -50, null],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
          
          {/* Glowing orbs */}
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
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
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px #3b82f6'
            }}
            animate={{
              textShadow: [
                '0 0 30px #3b82f6',
                '0 0 40px #8b5cf6',
                '0 0 30px #3b82f6',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎒 INVENTORY NEXUS
          </motion.h1>
          
          <motion.p
            className="text-blue-300 text-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Manage your cyberpunk arsenal and equipment
          </motion.p>
          
          <motion.div
            className="flex justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Badge variant="outline" className="text-cyan-400 border-cyan-400 px-4 py-2">
              <Package className="w-4 h-4 mr-2" />
              Total: {inventoryStats.total}
            </Badge>
            <Badge variant="outline" className="text-red-400 border-red-400 px-4 py-2">
              <Sword className="w-4 h-4 mr-2" />
              Weapons: {inventoryStats.weapons}
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Armor: {inventoryStats.armor}
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-400 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Accessories: {inventoryStats.accessories}
            </Badge>
            <Badge variant="outline" className="text-green-400 border-green-400 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Consumables: {inventoryStats.consumables}
            </Badge>
          </motion.div>
        </motion.div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'inventory' | 'equipment' | 'shop')} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 backdrop-blur-sm mb-8 h-14">
              <TabsTrigger 
                value="inventory" 
                className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold"
              >
                <Package className="w-5 h-5 mr-2" />
                Inventory ({inventoryStats.total})
              </TabsTrigger>
              <TabsTrigger 
                value="equipment" 
                className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold"
              >
                <Sword className="w-5 h-5 mr-2" />
                Equipment
              </TabsTrigger>
              <TabsTrigger 
                value="shop" 
                className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Quick Shop
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="inventory" className="space-y-6">
            <motion.div
              className="flex justify-between items-center mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white">Your Items</h2>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={addSampleItems}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 font-semibold"
                  style={{ boxShadow: '0 0 20px #9333ea40' }}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Sample Items
                </Button>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {gameState.currentCharacter?.inventory.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    layout
                  >
                    <Card
                      className="cursor-pointer transition-all duration-300 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800/90 relative overflow-hidden"
                      style={{
                        borderColor: getRarityColor(item.rarity),
                        borderWidth: '2px',
                        boxShadow: hoveredItem === item.id ? getRarityGlow(item.rarity) : 'none',
                      }}
                      onClick={() => setSelectedItem(item)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {/* Action animation overlay */}
                      <AnimatePresence>
                        {actionAnimation === `equip_${item.id}` && (
                          <motion.div
                            className="absolute inset-0 bg-green-500/50 flex items-center justify-center z-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              className="text-4xl"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1.2, rotate: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              ⚡
                            </motion.div>
                          </motion.div>
                        )}
                        {actionAnimation === `use_${item.id}` && (
                          <motion.div
                            className="absolute inset-0 bg-blue-500/50 flex items-center justify-center z-20"
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
                              ✨
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
                            {getItemIcon(item)}
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
                        <CardTitle className="text-xl text-white font-bold">{item.name}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="p-4 pt-0">
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">{item.description}</p>
                        
                        <div className="space-y-2 mb-4">
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
                          {item.stats && Object.entries(item.stats).map(([stat, value]) => (
                            <div key={stat} className="flex justify-between items-center">
                              <span className="text-green-400 capitalize flex items-center">
                                <Star className="w-4 h-4 mr-1" />
                                {stat}:
                              </span>
                              <span className="text-white font-bold">+{value}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-2">
                          {canEquipItem(item) && (
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  equipItem(item);
                                }}
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold"
                                style={{ boxShadow: '0 0 15px #10b98140' }}
                              >
                                <Zap className="w-4 h-4 mr-2" />
                                Equip
                              </Button>
                            </motion.div>
                          )}
                          {item.type === 'consumable' && (
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUseConsumable(item);
                                }}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold"
                                style={{ boxShadow: '0 0 15px #3b82f640' }}
                              >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Use
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {inventoryStats.total === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-gray-900/60 border-gray-700 text-center p-12 backdrop-blur-sm">
                  <motion.div
                    className="text-8xl mb-6"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📦
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">Empty Inventory</h3>
                  <p className="text-gray-400 mb-6 text-lg">
                    Complete missions to earn loot or visit the shop to acquire items
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={addSampleItems}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 font-semibold"
                      style={{ boxShadow: '0 0 20px #9333ea40' }}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Sample Items
                    </Button>
                  </motion.div>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="equipment" className="space-y-6">
            <motion.h2
              className="text-3xl font-bold text-white mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Current Equipment
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Equipment slots with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <Card className="bg-gray-900/80 border-orange-500/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Sword className="w-6 h-6 text-orange-400" />
                      Weapon Slot
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {gameState.currentCharacter?.equipment.weapon ? (
                      <div className="text-center">
                        <div className="text-6xl mb-4">{getItemIcon(gameState.currentCharacter?.equipment.weapon)}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{gameState.currentCharacter?.equipment.weapon.name}</h3>
                        <p className="text-gray-300 mb-3">{gameState.currentCharacter?.equipment.weapon.description}</p>
                        <div className="text-red-400 font-semibold">
                          <Zap className="w-4 h-4 inline mr-1" />
                          Damage: {gameState.currentCharacter?.equipment.weapon.damage}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400 py-8">
                        <motion.div
                          className="text-6xl mb-4"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ❌
                        </motion.div>
                        <p className="text-lg">No weapon equipped</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="bg-gray-900/80 border-blue-500/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="w-6 h-6 text-blue-400" />
                      Armor Slot
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {gameState.currentCharacter?.equipment.armor ? (
                      <div className="text-center">
                        <div className="text-6xl mb-4">{getItemIcon(gameState.currentCharacter?.equipment.armor)}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{gameState.currentCharacter?.equipment.armor.name}</h3>
                        <p className="text-gray-300 mb-3">{gameState.currentCharacter?.equipment.armor.description}</p>
                        <div className="text-blue-400 font-semibold">
                          <Shield className="w-4 h-4 inline mr-1" />
                          Defense: {gameState.currentCharacter?.equipment.armor.defense}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400 py-8">
                        <motion.div
                          className="text-6xl mb-4"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ❌
                        </motion.div>
                        <p className="text-lg">No armor equipped</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="bg-gray-900/80 border-purple-500/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Star className="w-6 h-6 text-purple-400" />
                      Character Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(gameState.currentCharacter?.stats || {}).map(([stat, value]) => (
                        <div key={stat} className="flex justify-between items-center">
                          <span className="text-gray-300 capitalize">{stat}:</span>
                          <motion.span
                            className="text-white font-bold text-lg"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5, delay: Math.random() * 2 }}
                          >
                            {value}
                          </motion.span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="shop" className="space-y-6">
            <motion.h2
              className="text-3xl font-bold text-white mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Quick Shop
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CONSUMABLES.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-900/80 border-purple-500/50 backdrop-blur-sm hover:bg-gray-800/90 transition-all duration-300">
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-3xl">{getItemIcon(item)}</div>
                        <Badge
                          style={{
                            backgroundColor: getRarityColor(item.rarity),
                            color: 'white'
                          }}
                        >
                          {item.rarity.toUpperCase()}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-white">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => addItemToInventory({ ...item, id: `${item.id}_${Date.now()}` })}
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
                          style={{ boxShadow: '0 0 15px #10b98140' }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Inventory
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Enhanced Footer */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
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
        </motion.div>
      </div>

      {/* Item Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-gray-900 border-2 rounded-lg p-6 max-w-md w-full"
              style={{
                borderColor: getRarityColor(selectedItem.rarity),
                boxShadow: `0 0 40px ${getRarityColor(selectedItem.rarity)}80`
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{getItemIcon(selectedItem)}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.name}</h3>
                <Badge
                  className="mb-4"
                  style={{
                    backgroundColor: getRarityColor(selectedItem.rarity),
                    color: 'white'
                  }}
                >
                  {selectedItem.rarity.toUpperCase()}
                </Badge>
                <p className="text-gray-300 mb-4">{selectedItem.description}</p>
                
                <div className="space-y-2 text-left">
                  {selectedItem.damage && (
                    <div className="flex justify-between">
                      <span className="text-red-400">Damage:</span>
                      <span className="text-white font-bold">{selectedItem.damage}</span>
                    </div>
                  )}
                  {selectedItem.defense && (
                    <div className="flex justify-between">
                      <span className="text-blue-400">Defense:</span>
                      <span className="text-white font-bold">{selectedItem.defense}</span>
                    </div>
                  )}
                  {selectedItem.stats && Object.entries(selectedItem.stats).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between">
                      <span className="text-green-400 capitalize">{stat}:</span>
                      <span className="text-white font-bold">+{value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-2">
                  {canEquipItem(selectedItem) && (
                    <Button
                      onClick={() => {
                        equipItem(selectedItem);
                        setSelectedItem(null);
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Equip Item
                    </Button>
                  )}
                  {selectedItem.type === 'consumable' && (
                    <Button
                      onClick={() => {
                        handleUseConsumable(selectedItem);
                        setSelectedItem(null);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Use Item
                    </Button>
                  )}
                  <Button
                    onClick={() => setSelectedItem(null)}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inventory;