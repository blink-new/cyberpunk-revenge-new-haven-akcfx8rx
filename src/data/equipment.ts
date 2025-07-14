import { Item, CharacterClass } from '../types/game';
import { 
  MASTER_WEAPONS, 
  MASTER_ARMOR, 
  MASTER_ACCESSORIES, 
  MASTER_CONSUMABLES,
  generateEnhancedLoot 
} from './masterEquipment';

// Export the master equipment collections
export const WEAPONS: Record<CharacterClass, Item[]> = MASTER_WEAPONS;
export const ARMOR_SETS: Record<CharacterClass, Item[]> = MASTER_ARMOR;
export const ACCESSORIES: Item[] = MASTER_ACCESSORIES;
export const CONSUMABLES: Item[] = MASTER_CONSUMABLES;

// Generate random loot based on level and difficulty - Enhanced version
export const generateLoot = (
  level: number, 
  isBoss: boolean = false, 
  characterClass?: CharacterClass,
  difficulty: 'normal' | 'difficult' | 'impossible' = 'normal'
): Item[] => {
  return generateEnhancedLoot(level, isBoss, characterClass, difficulty);
};