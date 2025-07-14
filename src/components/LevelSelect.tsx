import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { GAME_LEVELS, LEVEL_BACKGROUNDS } from '../data/levels';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const LevelSelect: React.FC = () => {
  const { gameState, setGameMode, setCurrentLevel } = useGame();
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  
  const availableLevels = GAME_LEVELS.filter(level => {
    const playerLevel = gameState.currentCharacter?.level || 1;
    return level.requiredLevel <= playerLevel && level.id <= gameState.currentLevel;
  });

  const handleLevelSelect = (levelId: number) => {
    setSelectedLevel(levelId);
    setCurrentLevel(levelId);
    setGameMode('game');
  };

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'street': return 'bg-gradient-to-r from-purple-600 to-pink-600';
      case 'building': return 'bg-gradient-to-r from-blue-600 to-cyan-600';
      case 'underground': return 'bg-gradient-to-r from-gray-700 to-gray-900';
      case 'rooftop': return 'bg-gradient-to-r from-orange-600 to-red-600';
      case 'factory': return 'bg-gradient-to-r from-green-600 to-emerald-600';
      case 'neon_city': return 'bg-gradient-to-r from-pink-600 to-purple-600';
      case 'cyber_night': return 'bg-gradient-to-r from-indigo-600 to-blue-600';
      case 'toxic_wasteland': return 'bg-gradient-to-r from-yellow-600 to-orange-600';
      case 'digital_realm': return 'bg-gradient-to-r from-cyan-600 to-teal-600';
      case 'void_space': return 'bg-gradient-to-r from-black to-purple-900';
      default: return 'bg-gradient-to-r from-purple-600 to-pink-600';
    }
  };

  const getEnvironmentIcon = (environment: string) => {
    switch (environment) {
      case 'street': return '🏙️';
      case 'building': return '🏢';
      case 'underground': return '🕳️';
      case 'rooftop': return '🏗️';
      case 'factory': return '🏭';
      case 'neon_city': return '🌃';
      case 'cyber_night': return '🌙';
      case 'toxic_wasteland': return '☢️';
      case 'digital_realm': return '💻';
      case 'void_space': return '🌌';
      default: return '🏙️';
    }
  };

  const getEnvironmentName = (environment: string) => {
    switch (environment) {
      case 'street': return 'Street';
      case 'building': return 'Building';
      case 'underground': return 'Underground';
      case 'rooftop': return 'Rooftop';
      case 'factory': return 'Factory';
      case 'neon_city': return 'Neon City';
      case 'cyber_night': return 'Cyber Night';
      case 'toxic_wasteland': return 'Toxic Wasteland';
      case 'digital_realm': return 'Digital Realm';
      case 'void_space': return 'Void Space';
      default: return 'Unknown';
    }
  };

  const getLevelDifficulty = (level: number) => {
    if (level <= 25) return { name: 'BEGINNER', color: 'text-green-400' };
    if (level <= 50) return { name: 'INTERMEDIATE', color: 'text-yellow-400' };
    if (level <= 75) return { name: 'ADVANCED', color: 'text-orange-400' };
    if (level <= 90) return { name: 'EXPERT', color: 'text-red-400' };
    return { name: 'LEGENDARY', color: 'text-purple-400' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🎮 SELECT YOUR MISSION
          </h1>
          <p className="text-purple-300 text-lg">
            Choose your path through the cyberpunk underworld of New Haven - 100 Levels Available!
          </p>
          <div className="mt-4 flex justify-center items-center space-x-4">
            <Badge variant="outline" className="text-white border-white">
              Character Level: {gameState.currentCharacter?.level || 1}
            </Badge>
            <Badge variant="outline" className="text-white border-white">
              Difficulty: {gameState.difficulty.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-white border-white">
              Available Levels: {availableLevels.length}/100
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {availableLevels.map((level) => (
            <Card
              key={level.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                level.id === selectedLevel ? 'ring-4 ring-cyan-400' : ''
              }`}
              onClick={() => setSelectedLevel(level.id)}
            >
              <CardHeader className={`${getEnvironmentColor(level.environment)} text-white p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      {getEnvironmentIcon(level.environment)}
                      Level {level.id}
                    </CardTitle>
                    <p className="text-sm opacity-90 mt-1">{level.name}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {level.boss && (
                      <Badge variant="destructive" className="bg-red-600 text-white">
                        BOSS
                      </Badge>
                    )}
                    <Badge variant="outline" className={`${getLevelDifficulty(level.id).color} border-current text-xs`}>
                      {getLevelDifficulty(level.id).name}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 bg-gray-900 text-white">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Required Level:</span>
                    <span className="font-bold">{level.requiredLevel}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Environment:</span>
                    <span className="font-bold capitalize">{getEnvironmentName(level.environment)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Enemies:</span>
                    <span className="font-bold">{level.enemies.length}</span>
                  </div>
                  {level.boss && (
                    <div className="mt-3 p-2 bg-red-900 rounded">
                      <div className="text-sm font-bold text-red-300">
                        Boss: {level.boss.name}
                      </div>
                      <div className="text-xs text-red-400">
                        Level {level.boss.level} • {level.boss.health} HP
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Level Details */}
        {selectedLevel && (
          <Card className="bg-gray-900 border-purple-500 mb-8">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardTitle className="text-2xl">
                {GAME_LEVELS.find(l => l.id === selectedLevel)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-3 text-purple-300">Mission Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Level:</span>
                      <span>{selectedLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Required Level:</span>
                      <span>{GAME_LEVELS.find(l => l.id === selectedLevel)?.requiredLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Environment:</span>
                      <span className="capitalize">{GAME_LEVELS.find(l => l.id === selectedLevel)?.environment}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3 text-purple-300">Enemies</h3>
                  <div className="space-y-2">
                    {GAME_LEVELS.find(l => l.id === selectedLevel)?.enemies.map((enemy, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded">
                        <span className="text-sm">{enemy.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">Lv.{enemy.level}</span>
                          <span className="text-xs text-red-400">{enemy.health} HP</span>
                          {enemy.isBoss && <Badge variant="destructive" className="text-xs">BOSS</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center space-x-4">
                <Button
                  onClick={() => handleLevelSelect(selectedLevel)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-bold"
                >
                  🚀 START MISSION
                </Button>
                <Button
                  onClick={() => setGameMode('lobby')}
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-900 px-8 py-3 text-lg"
                >
                  🏠 Back to Lobby
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Environment Preview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(LEVEL_BACKGROUNDS).map(([env, bg]) => (
            <div key={env} className="text-center">
              <div className="w-full h-24 bg-gray-800 rounded-lg mb-2 overflow-hidden">
                <img
                  src={bg}
                  alt={env}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white text-sm capitalize">{env}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;