import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, Character, CharacterClass, GameMode, Difficulty, Item } from '../types/game';
import { CHARACTER_CLASSES, LEVEL_EXPERIENCE_REQUIRED } from '../data/gameData';

interface GameContextType {
  gameState: GameState;
  createCharacter: (characterClass: CharacterClass, name: string) => void;
  setGameMode: (mode: GameMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  addExperience: (exp: number) => void;
  addItemToInventory: (item: Item) => void;
  addItemToChest: (item: Item) => void;
  removeItemFromInventory: (itemId: string) => void;
  removeItemFromChest: (itemId: string) => void;
  setCurrentLevel: (level: number) => void;
  unlockNextLevel: () => void;
  learnSkill: (skillId: string) => void;
  upgradeSkill: (skillId: string) => void;
  addCredits: (amount: number) => void;
  spendCredits: (amount: number) => boolean;
  resetGame: () => void;
  saveGame: (saveData: GameState) => void;
  loadGame: (saveData: GameState) => void;
}

const initialGameState: GameState = {
  currentCharacter: undefined,
  currentLevel: 1,
  difficulty: 'normal',
  gameMode: 'lobby',
  unlockedDifficulties: ['normal'],
  chest: [],
  playerLevel: 1,
  totalExperience: 0,
  availableSkillPoints: 0,
  credits: 0
};

type GameAction = 
  | { type: 'CREATE_CHARACTER'; payload: { characterClass: CharacterClass; name: string } }
  | { type: 'SET_GAME_MODE'; payload: { mode: GameMode } }
  | { type: 'SET_DIFFICULTY'; payload: { difficulty: Difficulty } }
  | { type: 'ADD_EXPERIENCE'; payload: { exp: number } }
  | { type: 'ADD_ITEM_TO_INVENTORY'; payload: { item: Item } }
  | { type: 'ADD_ITEM_TO_CHEST'; payload: { item: Item } }
  | { type: 'REMOVE_ITEM_FROM_INVENTORY'; payload: { itemId: string } }
  | { type: 'REMOVE_ITEM_FROM_CHEST'; payload: { itemId: string } }
  | { type: 'SET_CURRENT_LEVEL'; payload: { level: number } }
  | { type: 'LEARN_SKILL'; payload: { skillId: string } }
  | { type: 'UPGRADE_SKILL'; payload: { skillId: string } }
  | { type: 'RESET_GAME' }
  | { type: 'UNLOCK_NEXT_LEVEL' }
  | { type: 'ADD_CREDITS'; payload: { amount: number } }
  | { type: 'SPEND_CREDITS'; payload: { amount: number } }
  | { type: 'SAVE_GAME'; payload: { saveData: GameState } }
  | { type: 'LOAD_GAME'; payload: { saveData: GameState } };

const generateRandomStats = (baseStats: Record<string, number>, variation: number = 3) => {
  const stats = { ...baseStats };
  Object.keys(stats).forEach(key => {
    const randomAdjustment = Math.floor(Math.random() * (variation * 2 + 1)) - variation;
    stats[key] = Math.max(5, stats[key] + randomAdjustment);
  });
  return stats;
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'CREATE_CHARACTER': {
      const classData = CHARACTER_CLASSES[action.payload.characterClass];
      const randomStats = generateRandomStats(classData.baseStats);
      const character: Character = {
        id: `char_${Date.now()}`,
        name: action.payload.name,
        class: action.payload.characterClass,
        level: 1,
        experience: 0,
        stats: randomStats,
        skills: [],
        inventory: [],
        equipment: {},
        health: 100 + randomStats.vitality * 5,
        maxHealth: 100 + randomStats.vitality * 5,
        mana: 50 + randomStats.intelligence * 3,
        maxMana: 50 + randomStats.intelligence * 3,
        skillPoints: 1,
        learnedSkills: [],
        credits: 100
      };
      return {
        ...state,
        currentCharacter: character,
        gameMode: 'lobby'
      };
    }
    case 'SET_GAME_MODE':
      return {
        ...state,
        gameMode: action.payload.mode
      };
    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.payload.difficulty
      };
    case 'ADD_EXPERIENCE': {
      const newExp = state.totalExperience + action.payload.exp;
      let newLevel = state.playerLevel;
      const oldLevel = newLevel;
      while (newLevel < 99 && newExp >= LEVEL_EXPERIENCE_REQUIRED[newLevel - 1]) {
        newLevel++;
      }
      
      // Calculate skill points gained (1 per level)
      const skillPointsGained = newLevel - oldLevel;
      
      let updatedCharacter = state.currentCharacter;
      if (updatedCharacter && newLevel > updatedCharacter.level) {
        updatedCharacter = {
          ...updatedCharacter,
          level: newLevel,
          experience: newExp,
          skillPoints: updatedCharacter.skillPoints + skillPointsGained
        };
      }
      
      return {
        ...state,
        totalExperience: newExp,
        playerLevel: newLevel,
        availableSkillPoints: state.availableSkillPoints + skillPointsGained,
        currentCharacter: updatedCharacter
      };
    }
    case 'ADD_ITEM_TO_INVENTORY':
      if (!state.currentCharacter) return state;
      return {
        ...state,
        currentCharacter: {
          ...state.currentCharacter,
          inventory: [...state.currentCharacter.inventory, action.payload.item]
        }
      };
    case 'ADD_ITEM_TO_CHEST':
      return {
        ...state,
        chest: [...state.chest, action.payload.item]
      };
    case 'REMOVE_ITEM_FROM_INVENTORY':
      if (!state.currentCharacter) return state;
      return {
        ...state,
        currentCharacter: {
          ...state.currentCharacter,
          inventory: state.currentCharacter.inventory.filter(item => item.id !== action.payload.itemId)
        }
      };
    case 'REMOVE_ITEM_FROM_CHEST':
      return {
        ...state,
        chest: state.chest.filter(item => item.id !== action.payload.itemId)
      };
    case 'SET_CURRENT_LEVEL':
      return {
        ...state,
        currentLevel: action.payload.level
      };
    case 'RESET_GAME':
      return initialGameState;
    case 'LEARN_SKILL': {
      if (!state.currentCharacter || state.currentCharacter.skillPoints < 1) return state;
      
      const existingSkill = state.currentCharacter.learnedSkills.find(s => s.skillId === action.payload.skillId);
      if (existingSkill) return state; // Already learned
      
      return {
        ...state,
        currentCharacter: {
          ...state.currentCharacter,
          skillPoints: state.currentCharacter.skillPoints - 1,
          learnedSkills: [...state.currentCharacter.learnedSkills, {
            skillId: action.payload.skillId,
            level: 1,
            unlocked: true
          }]
        }
      };
    }
    case 'UPGRADE_SKILL': {
      if (!state.currentCharacter || state.currentCharacter.skillPoints < 1) return state;
      
      const skillToUpgrade = state.currentCharacter.learnedSkills.find(s => s.skillId === action.payload.skillId);
      if (!skillToUpgrade) return state; // Skill not learned
      
      return {
        ...state,
        currentCharacter: {
          ...state.currentCharacter,
          skillPoints: state.currentCharacter.skillPoints - 1,
          learnedSkills: state.currentCharacter.learnedSkills.map(s => 
            s.skillId === action.payload.skillId 
              ? { ...s, level: s.level + 1 }
              : s
          )
        }
      };
    }
    case 'UNLOCK_NEXT_LEVEL':
      return {
        ...state,
        currentLevel: Math.min(50, state.currentLevel + 1)
      };
    case 'ADD_CREDITS':
      return {
        ...state,
        credits: state.credits + action.payload.amount
      };
    case 'SPEND_CREDITS':
      if (state.credits >= action.payload.amount) {
        return {
          ...state,
          credits: state.credits - action.payload.amount
        };
      } else {
        return state;
      }
    case 'SAVE_GAME':
      // Save current state to localStorage
      localStorage.setItem('cyberpunk-current-game', JSON.stringify(state));
      return state;
    case 'LOAD_GAME':
      // Load state from save data
      return {
        ...action.payload.saveData
      };
    default:
      return state;
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  const createCharacter = (characterClass: CharacterClass, name: string) => {
    dispatch({ type: 'CREATE_CHARACTER', payload: { characterClass, name } });
  };

  const setGameMode = (mode: GameMode) => {
    dispatch({ type: 'SET_GAME_MODE', payload: { mode } });
  };

  const setDifficulty = (difficulty: Difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: { difficulty } });
  };

  const addExperience = (exp: number) => {
    dispatch({ type: 'ADD_EXPERIENCE', payload: { exp } });
  };

  const addItemToInventory = (item: Item) => {
    dispatch({ type: 'ADD_ITEM_TO_INVENTORY', payload: { item } });
  };

  const addItemToChest = (item: Item) => {
    dispatch({ type: 'ADD_ITEM_TO_CHEST', payload: { item } });
  };

  const removeItemFromInventory = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM_FROM_INVENTORY', payload: { itemId } });
  };

  const removeItemFromChest = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM_FROM_CHEST', payload: { itemId } });
  };

  const setCurrentLevel = (level: number) => {
    dispatch({ type: 'SET_CURRENT_LEVEL', payload: { level } });
  };

  const unlockNextLevel = () => {
    const nextLevel = gameState.currentLevel + 1;
    if (nextLevel <= 50) {
      dispatch({ type: 'SET_CURRENT_LEVEL', payload: { level: nextLevel } });
    }
  };

  const learnSkill = (skillId: string) => {
    dispatch({ type: 'LEARN_SKILL', payload: { skillId } });
  };

  const upgradeSkill = (skillId: string) => {
    dispatch({ type: 'UPGRADE_SKILL', payload: { skillId } });
  };

  const addCredits = (amount: number) => {
    dispatch({ type: 'ADD_CREDITS', payload: { amount } });
  };

  const spendCredits = (amount: number) => {
    if (gameState.credits >= amount) {
      dispatch({ type: 'SPEND_CREDITS', payload: { amount } });
      return true;
    }
    return false;
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const saveGame = (saveData: GameState) => {
    dispatch({ type: 'SAVE_GAME', payload: { saveData } });
  };

  const loadGame = (saveData: GameState) => {
    dispatch({ type: 'LOAD_GAME', payload: { saveData } });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        createCharacter,
        setGameMode,
        setDifficulty,
        addExperience,
        addItemToInventory,
        addItemToChest,
        removeItemFromInventory,
        removeItemFromChest,
        setCurrentLevel,
        unlockNextLevel,
        learnSkill,
        upgradeSkill,
        addCredits,
        spendCredits,
        resetGame,
        saveGame,
        loadGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};