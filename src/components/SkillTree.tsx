import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { SKILL_TREES } from '../data/skillTrees';
import { SkillNode } from '../data/skillTrees';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ArrowLeft, Star, Lock, Zap, Shield, Sword, Sparkles } from 'lucide-react';

const SkillTree: React.FC = () => {
  const { gameState, setGameMode, learnSkill, upgradeSkill } = useGame();
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [selectedTier, setSelectedTier] = useState<number>(1);

  if (!gameState.currentCharacter) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-cyan-400">No Character Selected</h1>
          <p className="text-gray-300 mb-4">Please select a character first</p>
          <Button onClick={() => setGameMode('lobby')} className="bg-cyan-600 hover:bg-cyan-700">
            Back to Lobby
          </Button>
        </div>
      </div>
    );
  }

  const characterClass = gameState.currentCharacter.class;
  const skills = SKILL_TREES[characterClass] || [];
  const learnedSkills = gameState.currentCharacter.learnedSkills || [];
  const availableSkillPoints = gameState.currentCharacter.skillPoints || 0;

  const getSkillLevel = (skillId: string): number => {
    const learned = learnedSkills.find(s => s.skillId === skillId);
    return learned ? learned.level : 0;
  };

  const isSkillUnlocked = (skill: SkillNode): boolean => {
    // Check level requirement
    if (skill.requirements.some(req => req.type === 'level' && gameState.currentCharacter!.level < req.value)) {
      return false;
    }

    // Check skill requirements
    if (skill.requirements.some(req => 
      req.type === 'skill' && req.skillId && getSkillLevel(req.skillId) < req.value
    )) {
      return false;
    }

    // Check stat requirements
    if (skill.requirements.some(req => 
      req.type === 'stat' && req.statName && 
      gameState.currentCharacter!.stats[req.statName as keyof typeof gameState.currentCharacter.stats] < req.value
    )) {
      return false;
    }

    return true;
  };

  const canLearnSkill = (skill: SkillNode): boolean => {
    return isSkillUnlocked(skill) && getSkillLevel(skill.id) === 0 && availableSkillPoints > 0;
  };

  const canUpgradeSkill = (skill: SkillNode): boolean => {
    const currentLevel = getSkillLevel(skill.id);
    return currentLevel > 0 && currentLevel < skill.maxLevel && availableSkillPoints > 0;
  };

  const getSkillTypeIcon = (type: string) => {
    switch (type) {
      case 'attacking': return <Sword className="w-4 h-4" />;
      case 'defensive': return <Shield className="w-4 h-4" />;
      case 'magic': return <Sparkles className="w-4 h-4" />;
      case 'active': return <Zap className="w-4 h-4" />;
      case 'ultimate': return <Star className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getSkillTypeColor = (type: string) => {
    switch (type) {
      case 'attacking': return 'bg-red-500';
      case 'defensive': return 'bg-blue-500';
      case 'magic': return 'bg-purple-500';
      case 'active': return 'bg-green-500';
      case 'passive': return 'bg-gray-500';
      case 'ultimate': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const skillsByTier = skills.reduce((acc, skill) => {
    if (!acc[skill.tier]) acc[skill.tier] = [];
    acc[skill.tier].push(skill);
    return acc;
  }, {} as Record<number, SkillNode[]>);

  const tiers = Object.keys(skillsByTier).map(Number).sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setGameMode('lobby')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lobby
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-cyan-400">
                {gameState.currentCharacter.name} - Skill Tree
              </h1>
              <p className="text-gray-300">
                Level {gameState.currentCharacter.level} • {availableSkillPoints} Skill Points Available
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-400">{availableSkillPoints}</div>
            <div className="text-sm text-gray-300">Skill Points</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skill Tree */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Skill Tree</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedTier.toString()} onValueChange={(value) => setSelectedTier(parseInt(value))}>
                  <TabsList className="grid w-full grid-cols-5 bg-gray-800">
                    {tiers.slice(0, 5).map(tier => (
                      <TabsTrigger 
                        key={tier} 
                        value={tier.toString()} 
                        className="data-[state=active]:bg-cyan-600"
                      >
                        Tier {tier}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {tiers.slice(0, 5).map(tier => (
                    <TabsContent key={tier} value={tier.toString()} className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {(skillsByTier[tier] || []).map(skill => {
                          const skillLevel = getSkillLevel(skill.id);
                          const isUnlocked = isSkillUnlocked(skill);
                          // const canLearn = canLearnSkill(skill);
                          // const canUpgrade = canUpgradeSkill(skill);
                          
                          return (
                            <Card
                              key={skill.id}
                              className={`cursor-pointer transition-all duration-200 ${
                                selectedSkill?.id === skill.id
                                  ? 'border-cyan-400 bg-cyan-900/20'
                                  : isUnlocked
                                  ? 'border-gray-600 bg-gray-800 hover:border-cyan-500'
                                  : 'border-gray-700 bg-gray-900 opacity-50'
                              }`}
                              onClick={() => setSelectedSkill(skill)}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="text-2xl">{skill.icon}</div>
                                  {!isUnlocked && <Lock className="w-4 h-4 text-gray-500" />}
                                </div>
                                <div className="text-sm font-semibold mb-1">{skill.name}</div>
                                <div className="flex items-center justify-between">
                                  <Badge 
                                    variant="secondary" 
                                    className={`${getSkillTypeColor(skill.type)} text-white text-xs`}
                                  >
                                    {getSkillTypeIcon(skill.type)}
                                  </Badge>
                                  <div className="text-xs text-gray-400">
                                    {skillLevel > 0 ? `${skillLevel}/${skill.maxLevel}` : '0/5'}
                                  </div>
                                </div>
                                {skillLevel > 0 && (
                                  <Progress 
                                    value={(skillLevel / skill.maxLevel) * 100} 
                                    className="mt-2 h-1"
                                  />
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Skill Details */}
          <div className="space-y-4">
            {selectedSkill && (
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center space-x-2">
                    <span className="text-3xl">{selectedSkill.icon}</span>
                    <span>{selectedSkill.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="secondary" 
                      className={`${getSkillTypeColor(selectedSkill.type)} text-white`}
                    >
                      {getSkillTypeIcon(selectedSkill.type)}
                      <span className="ml-1 capitalize">{selectedSkill.type}</span>
                    </Badge>
                    <span className="text-sm text-gray-400">
                      Tier {selectedSkill.tier} • Max Level {selectedSkill.maxLevel}
                    </span>
                  </div>

                  <p className="text-gray-300">{selectedSkill.description}</p>

                  {/* Current Level */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">Current Level</span>
                      <span className="text-sm font-semibold">
                        {getSkillLevel(selectedSkill.id)}/{selectedSkill.maxLevel}
                      </span>
                    </div>
                    <Progress 
                      value={(getSkillLevel(selectedSkill.id) / selectedSkill.maxLevel) * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Requirements</h4>
                    <div className="space-y-1">
                      {selectedSkill.requirements.map((req, index) => (
                        <div key={index} className="text-xs text-gray-300">
                          {req.type === 'level' && `Level ${req.value}`}
                          {req.type === 'skill' && req.skillId && `${req.skillId} Level ${req.value}`}
                          {req.type === 'stat' && req.statName && `${req.statName} ${req.value}`}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Effects */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Effects</h4>
                    <div className="space-y-1">
                      {selectedSkill.effects.map((effect, index) => (
                        <div key={index} className="text-xs text-gray-300">
                          {effect.description}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stat Bonuses */}
                  {selectedSkill.statBonus && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Stat Bonuses</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {Object.entries(selectedSkill.statBonus).map(([stat, value]) => (
                          <div key={stat} className="text-xs text-gray-300">
                            {stat}: +{value}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-700">
                    {canLearnSkill(selectedSkill) && (
                      <Button
                        onClick={() => learnSkill(selectedSkill.id)}
                        className="w-full bg-green-600 hover:bg-green-700 mb-2"
                      >
                        Learn Skill (1 Point)
                      </Button>
                    )}
                    {canUpgradeSkill(selectedSkill) && (
                      <Button
                        onClick={() => upgradeSkill(selectedSkill.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Upgrade Skill (1 Point)
                      </Button>
                    )}
                    {!isSkillUnlocked(selectedSkill) && (
                      <div className="text-center text-gray-400 py-2">
                        <Lock className="w-6 h-6 mx-auto mb-1" />
                        Requirements not met
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Character Stats */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Character Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(gameState.currentCharacter.stats).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between">
                      <span className="text-sm capitalize text-gray-400">{stat}:</span>
                      <span className="text-sm font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTree;