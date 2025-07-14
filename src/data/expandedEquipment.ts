import { Item, CharacterClass } from '../types/game';

// EXPANDED WEAPONS SYSTEM - 15+ weapons per class with unique abilities
export const EXPANDED_WEAPONS: Record<CharacterClass, Item[]> = {
  samurai: [
    // Tier 1 - Basic Weapons
    {
      id: 'katana_rookie',
      name: 'Rookie Katana',
      type: 'weapon',
      rarity: 'epic',
      damage: 20,
      description: 'A basic katana for beginners',
      characterClass: 'samurai'
    },
    {
      id: 'wakizashi_swift',
      name: 'Swift Wakizashi',
      type: 'weapon',
      rarity: 'epic',
      damage: 18,
      stats: { agility: 8, luck: 5 },
      description: 'A shorter blade for quick strikes',
      characterClass: 'samurai'
    },
    {
      id: 'tanto_precision',
      name: 'Precision Tanto',
      type: 'weapon',
      rarity: 'epic',
      damage: 15,
      stats: { agility: 12, luck: 10 },
      description: 'A small blade perfect for critical hits',
      characterClass: 'samurai'
    },
    
    // Tier 2 - Advanced Weapons
    {
      id: 'katana_cyber',
      name: 'Cyber Katana',
      type: 'weapon',
      rarity: 'legendary',
      damage: 45,
      stats: { strength: 10, intelligence: 8 },
      description: 'A blade infused with digital energy',
      characterClass: 'samurai'
    },
    {
      id: 'nodachi_storm',
      name: 'Storm Nodachi',
      type: 'weapon',
      rarity: 'legendary',
      damage: 55,
      stats: { strength: 15, magic: 10 },
      description: 'A massive two-handed sword that channels lightning',
      characterClass: 'samurai'
    },
    {
      id: 'tachi_flame',
      name: 'Flame Tachi',
      type: 'weapon',
      rarity: 'legendary',
      damage: 50,
      stats: { strength: 12, magic: 15 },
      description: 'A curved blade wreathed in eternal flames',
      characterClass: 'samurai'
    },
    {
      id: 'katana_ice',
      name: 'Frost Katana',
      type: 'weapon',
      rarity: 'legendary',
      damage: 48,
      stats: { strength: 10, intelligence: 12 },
      description: 'A blade that freezes enemies with each strike',
      characterClass: 'samurai'
    },
    
    // Tier 3 - Ultimate Weapons
    {
      id: 'katana_plasma',
      name: 'Plasma Katana',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 75,
      stats: { strength: 18, magic: 15 },
      description: 'A katana that burns with plasma fire',
      characterClass: 'samurai'
    },
    {
      id: 'katana_dragon',
      name: 'Dragon Fang',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 85,
      stats: { strength: 20, agility: 15, magic: 10 },
      description: 'Legendary blade forged from dragon scales',
      characterClass: 'samurai'
    },
    {
      id: 'katana_void',
      name: 'Void Ripper',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 105,
      stats: { strength: 25, magic: 20, intelligence: 15 },
      description: 'A blade that cuts through reality itself',
      characterClass: 'samurai'
    },
    {
      id: 'katana_muramasa',
      name: 'Muramasa Reborn',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 95,
      stats: { strength: 22, agility: 18, luck: 15 },
      description: 'The legendary cursed blade, enhanced with cyber tech',
      characterClass: 'samurai'
    },
    {
      id: 'katana_masamune',
      name: 'Digital Masamune',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 110,
      stats: { strength: 25, intelligence: 20, magic: 18 },
      description: 'The ultimate blade, perfected through digital mastery',
      characterClass: 'samurai'
    },
    {
      id: 'katana_quantum',
      name: 'Quantum Edge',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 120,
      stats: { strength: 30, agility: 20, magic: 25 },
      description: 'A blade that exists in multiple dimensions simultaneously',
      characterClass: 'samurai'
    },
    {
      id: 'katana_infinity',
      name: 'Infinity Blade',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 135,
      stats: { strength: 35, agility: 25, magic: 30 },
      description: 'A sword that contains the power of infinite possibilities',
      characterClass: 'samurai'
    },
    {
      id: 'katana_absolute',
      name: 'Absolute Zero',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 150,
      stats: { strength: 40, agility: 30, magic: 35 },
      description: 'The ultimate katana that can cut through anything',
      characterClass: 'samurai'
    }
  ],
  
  ninja: [
    // Tier 1 - Basic Weapons
    {
      id: 'shuriken_basic',
      name: 'Steel Shuriken',
      type: 'weapon',
      rarity: 'epic',
      damage: 16,
      description: 'Basic throwing stars',
      characterClass: 'ninja'
    },
    {
      id: 'kunai_basic',
      name: 'Iron Kunai',
      type: 'weapon',
      rarity: 'epic',
      damage: 18,
      stats: { agility: 6, luck: 4 },
      description: 'Versatile throwing knives',
      characterClass: 'ninja'
    },
    {
      id: 'chain_basic',
      name: 'Chain Whip',
      type: 'weapon',
      rarity: 'epic',
      damage: 20,
      stats: { agility: 8, strength: 5 },
      description: 'A flexible chain weapon',
      characterClass: 'ninja'
    },
    
    // Tier 2 - Advanced Weapons
    {
      id: 'shuriken_plasma',
      name: 'Plasma Shuriken',
      type: 'weapon',
      rarity: 'legendary',
      damage: 35,
      stats: { agility: 12, magic: 8 },
      description: 'Throwing stars that cut through reality',
      characterClass: 'ninja'
    },
    {
      id: 'kunai_shadow',
      name: 'Shadow Kunai',
      type: 'weapon',
      rarity: 'legendary',
      damage: 40,
      stats: { agility: 15, luck: 12 },
      description: 'Kunai infused with shadow magic',
      characterClass: 'ninja'
    },
    {
      id: 'blade_phantom',
      name: 'Phantom Blade',
      type: 'weapon',
      rarity: 'legendary',
      damage: 45,
      stats: { agility: 18, magic: 10 },
      description: 'A blade that exists between dimensions',
      characterClass: 'ninja'
    },
    {
      id: 'claws_cyber',
      name: 'Cyber Claws',
      type: 'weapon',
      rarity: 'legendary',
      damage: 42,
      stats: { agility: 16, intelligence: 8 },
      description: 'Retractable claws enhanced with technology',
      characterClass: 'ninja'
    },
    {
      id: 'dart_poison',
      name: 'Poison Dart Gun',
      type: 'weapon',
      rarity: 'legendary',
      damage: 38,
      stats: { agility: 14, luck: 15 },
      description: 'Silent weapon that delivers deadly toxins',
      characterClass: 'ninja'
    },
    
    // Tier 3 - Ultimate Weapons
    {
      id: 'claws_void',
      name: 'Void Claws',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 75,
      stats: { agility: 25, intelligence: 18, magic: 15 },
      description: 'Claws that drain life from enemies',
      characterClass: 'ninja'
    },
    {
      id: 'blade_dimensional',
      name: 'Dimensional Blade',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 85,
      stats: { agility: 28, magic: 20, intelligence: 15 },
      description: 'A blade that phases through armor',
      characterClass: 'ninja'
    },
    {
      id: 'shuriken_quantum',
      name: 'Quantum Shuriken',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 80,
      stats: { agility: 30, luck: 25, magic: 18 },
      description: 'Shuriken that exist in multiple timelines',
      characterClass: 'ninja'
    },
    {
      id: 'chain_infinity',
      name: 'Infinity Chain',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 90,
      stats: { agility: 32, strength: 20, magic: 22 },
      description: 'A chain weapon with unlimited reach',
      characterClass: 'ninja'
    },
    {
      id: 'kunai_soul',
      name: 'Soul Ripper Kunai',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 95,
      stats: { agility: 35, magic: 25, intelligence: 20 },
      description: 'Kunai that steal the souls of enemies',
      characterClass: 'ninja'
    },
    {
      id: 'claws_nightmare',
      name: 'Nightmare Claws',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 110,
      stats: { agility: 40, magic: 30, luck: 25 },
      description: 'Claws that manifest the enemies worst fears',
      characterClass: 'ninja'
    },
    {
      id: 'blade_absolute',
      name: 'Absolute Silence',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 125,
      stats: { agility: 45, magic: 35, intelligence: 30 },
      description: 'The ultimate ninja weapon that kills without sound',
      characterClass: 'ninja'
    }
  ],
  
  warrior: [
    // Tier 1 - Basic Weapons
    {
      id: 'sword_basic',
      name: 'Iron Sword',
      type: 'weapon',
      rarity: 'epic',
      damage: 25,
      description: 'A reliable warrior blade',
      characterClass: 'warrior'
    },
    {
      id: 'axe_basic',
      name: 'Battle Axe',
      type: 'weapon',
      rarity: 'epic',
      damage: 30,
      stats: { strength: 8, vitality: 5 },
      description: 'A heavy chopping weapon',
      characterClass: 'warrior'
    },
    {
      id: 'mace_basic',
      name: 'War Mace',
      type: 'weapon',
      rarity: 'epic',
      damage: 28,
      stats: { strength: 10, defense: 6 },
      description: 'A blunt weapon for crushing armor',
      characterClass: 'warrior'
    },
    
    // Tier 2 - Advanced Weapons
    {
      id: 'hammer_thunder',
      name: 'Thunder Hammer',
      type: 'weapon',
      rarity: 'legendary',
      damage: 55,
      stats: { strength: 15, magic: 10 },
      description: 'A massive hammer that shakes the earth',
      characterClass: 'warrior'
    },
    {
      id: 'axe_cyber',
      name: 'Cyber Axe',
      type: 'weapon',
      rarity: 'legendary',
      damage: 60,
      stats: { strength: 18, intelligence: 8 },
      description: 'An axe powered by cyber technology',
      characterClass: 'warrior'
    },
    {
      id: 'mace_storm',
      name: 'Storm Mace',
      type: 'weapon',
      rarity: 'legendary',
      damage: 58,
      stats: { strength: 16, defense: 12 },
      description: 'A mace that channels lightning',
      characterClass: 'warrior'
    },
    {
      id: 'sword_flame',
      name: 'Flame Sword',
      type: 'weapon',
      rarity: 'legendary',
      damage: 52,
      stats: { strength: 14, magic: 15 },
      description: 'A sword wreathed in eternal flames',
      characterClass: 'warrior'
    },
    {
      id: 'club_giant',
      name: 'Giant Club',
      type: 'weapon',
      rarity: 'legendary',
      damage: 65,
      stats: { strength: 20, vitality: 10 },
      description: 'A massive club that crushes everything',
      characterClass: 'warrior'
    },
    
    // Tier 3 - Ultimate Weapons
    {
      id: 'sword_titan',
      name: 'Titan Sword',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 95,
      stats: { strength: 25, vitality: 18, defense: 15 },
      description: 'A massive sword wielded by titans',
      characterClass: 'warrior'
    },
    {
      id: 'hammer_god',
      name: 'God Hammer',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 110,
      stats: { strength: 30, magic: 20, vitality: 20 },
      description: 'The hammer of the gods themselves',
      characterClass: 'warrior'
    },
    {
      id: 'axe_destroyer',
      name: 'World Destroyer',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 105,
      stats: { strength: 35, defense: 20, magic: 15 },
      description: 'An axe capable of splitting the earth',
      characterClass: 'warrior'
    },
    {
      id: 'mace_chaos',
      name: 'Chaos Mace',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 100,
      stats: { strength: 28, magic: 25, luck: 20 },
      description: 'A mace that brings chaos to the battlefield',
      characterClass: 'warrior'
    },
    {
      id: 'sword_infinity',
      name: 'Infinity Blade',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 115,
      stats: { strength: 32, magic: 22, intelligence: 18 },
      description: 'A sword that contains infinite power',
      characterClass: 'warrior'
    },
    {
      id: 'hammer_universe',
      name: 'Universe Crusher',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 130,
      stats: { strength: 40, vitality: 25, magic: 25 },
      description: 'A hammer that can shatter reality itself',
      characterClass: 'warrior'
    },
    {
      id: 'weapon_absolute',
      name: 'Absolute Domination',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 145,
      stats: { strength: 45, vitality: 30, defense: 25 },
      description: 'The ultimate weapon of absolute power',
      characterClass: 'warrior'
    }
  ],
  
  hunter: [
    // Tier 1 - Basic Weapons
    {
      id: 'bow_basic',
      name: 'Hunting Bow',
      type: 'weapon',
      rarity: 'epic',
      damage: 22,
      description: 'A reliable bow for precise shots',
      characterClass: 'hunter'
    },
    {
      id: 'crossbow_basic',
      name: 'Steel Crossbow',
      type: 'weapon',
      rarity: 'epic',
      damage: 26,
      stats: { agility: 6, luck: 8 },
      description: 'A crossbow for steady aim',
      characterClass: 'hunter'
    },
    {
      id: 'rifle_basic',
      name: 'Hunting Rifle',
      type: 'weapon',
      rarity: 'epic',
      damage: 30,
      stats: { agility: 8, intelligence: 5 },
      description: 'A basic ranged weapon',
      characterClass: 'hunter'
    },
    
    // Tier 2 - Advanced Weapons
    {
      id: 'bow_plasma',
      name: 'Plasma Bow',
      type: 'weapon',
      rarity: 'legendary',
      damage: 50,
      stats: { agility: 15, magic: 10 },
      description: 'A bow that fires plasma arrows',
      characterClass: 'hunter'
    },
    {
      id: 'crossbow_cyber',
      name: 'Cyber Crossbow',
      type: 'weapon',
      rarity: 'legendary',
      damage: 55,
      stats: { agility: 18, intelligence: 12 },
      description: 'A crossbow with auto-targeting',
      characterClass: 'hunter'
    },
    {
      id: 'rifle_sniper',
      name: 'Sniper Rifle',
      type: 'weapon',
      rarity: 'legendary',
      damage: 65,
      stats: { agility: 20, intelligence: 15 },
      description: 'A rifle for long-range precision',
      characterClass: 'hunter'
    },
    {
      id: 'cannon_energy',
      name: 'Energy Cannon',
      type: 'weapon',
      rarity: 'legendary',
      damage: 60,
      stats: { strength: 12, agility: 15, magic: 10 },
      description: 'A cannon that fires energy blasts',
      characterClass: 'hunter'
    },
    {
      id: 'launcher_rocket',
      name: 'Rocket Launcher',
      type: 'weapon',
      rarity: 'legendary',
      damage: 70,
      stats: { strength: 15, intelligence: 12 },
      description: 'A launcher for explosive projectiles',
      characterClass: 'hunter'
    },
    
    // Tier 3 - Ultimate Weapons
    {
      id: 'bow_void',
      name: 'Void Bow',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 90,
      stats: { agility: 25, magic: 20, intelligence: 15 },
      description: 'A bow that fires arrows through dimensions',
      characterClass: 'hunter'
    },
    {
      id: 'rifle_quantum',
      name: 'Quantum Rifle',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 100,
      stats: { agility: 30, intelligence: 25, magic: 18 },
      description: 'A rifle that fires quantum particles',
      characterClass: 'hunter'
    },
    {
      id: 'cannon_storm',
      name: 'Storm Cannon',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 110,
      stats: { strength: 20, agility: 25, magic: 22 },
      description: 'A cannon that fires lightning bolts',
      characterClass: 'hunter'
    },
    {
      id: 'bow_infinity',
      name: 'Infinity Bow',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 105,
      stats: { agility: 35, luck: 30, magic: 20 },
      description: 'A bow with unlimited arrows',
      characterClass: 'hunter'
    },
    {
      id: 'rifle_destroyer',
      name: 'Planet Destroyer',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 120,
      stats: { agility: 32, intelligence: 30, magic: 25 },
      description: 'A rifle capable of destroying planets',
      characterClass: 'hunter'
    },
    {
      id: 'cannon_universe',
      name: 'Universe Cannon',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 135,
      stats: { strength: 30, agility: 35, magic: 30 },
      description: 'A cannon that harnesses the power of the universe',
      characterClass: 'hunter'
    },
    {
      id: 'weapon_absolute',
      name: 'Absolute Precision',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 150,
      stats: { agility: 45, intelligence: 35, luck: 35 },
      description: 'The ultimate ranged weapon that never misses',
      characterClass: 'hunter'
    }
  ],
  
  mage: [
    // Tier 1 - Basic Weapons
    {
      id: 'staff_basic',
      name: 'Apprentice Staff',
      type: 'weapon',
      rarity: 'epic',
      damage: 20,
      stats: { intelligence: 8, magic: 10 },
      description: 'A simple staff for casting spells',
      characterClass: 'mage'
    },
    {
      id: 'wand_basic',
      name: 'Magic Wand',
      type: 'weapon',
      rarity: 'epic',
      damage: 18,
      stats: { intelligence: 10, magic: 12 },
      description: 'A basic wand for spell casting',
      characterClass: 'mage'
    },
    {
      id: 'orb_basic',
      name: 'Crystal Orb',
      type: 'weapon',
      rarity: 'epic',
      damage: 22,
      stats: { intelligence: 6, magic: 14 },
      description: 'An orb that focuses magical energy',
      characterClass: 'mage'
    },
    
    // Tier 2 - Advanced Weapons
    {
      id: 'staff_fire',
      name: 'Fire Staff',
      type: 'weapon',
      rarity: 'legendary',
      damage: 45,
      stats: { intelligence: 15, magic: 20 },
      description: 'A staff that channels fire magic',
      characterClass: 'mage'
    },
    {
      id: 'staff_ice',
      name: 'Ice Staff',
      type: 'weapon',
      rarity: 'legendary',
      damage: 42,
      stats: { intelligence: 18, magic: 18 },
      description: 'A staff that freezes enemies solid',
      characterClass: 'mage'
    },
    {
      id: 'staff_lightning',
      name: 'Lightning Staff',
      type: 'weapon',
      rarity: 'legendary',
      damage: 48,
      stats: { intelligence: 16, magic: 22 },
      description: 'A staff that calls down lightning',
      characterClass: 'mage'
    },
    {
      id: 'wand_arcane',
      name: 'Arcane Wand',
      type: 'weapon',
      rarity: 'legendary',
      damage: 50,
      stats: { intelligence: 20, magic: 25 },
      description: 'A wand that bends reality',
      characterClass: 'mage'
    },
    {
      id: 'orb_power',
      name: 'Power Orb',
      type: 'weapon',
      rarity: 'legendary',
      damage: 52,
      stats: { intelligence: 22, magic: 20 },
      description: 'An orb that amplifies magical power',
      characterClass: 'mage'
    },
    
    // Tier 3 - Ultimate Weapons
    {
      id: 'staff_cosmos',
      name: 'Cosmos Staff',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 85,
      stats: { intelligence: 30, magic: 35, luck: 20 },
      description: 'A staff that contains the power of stars',
      characterClass: 'mage'
    },
    {
      id: 'tome_destruction',
      name: 'Tome of Destruction',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 95,
      stats: { intelligence: 35, magic: 40, vitality: 15 },
      description: 'A book containing ultimate spells',
      characterClass: 'mage'
    },
    {
      id: 'wand_reality',
      name: 'Reality Wand',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 100,
      stats: { intelligence: 40, magic: 45, luck: 25 },
      description: 'A wand that controls reality itself',
      characterClass: 'mage'
    },
    {
      id: 'orb_void',
      name: 'Void Orb',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 90,
      stats: { intelligence: 32, magic: 38, defense: 20 },
      description: 'An orb that contains the power of the void',
      characterClass: 'mage'
    },
    {
      id: 'staff_infinity',
      name: 'Infinity Staff',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 110,
      stats: { intelligence: 38, magic: 50, luck: 30 },
      description: 'A staff with infinite magical power',
      characterClass: 'mage'
    },
    {
      id: 'tome_genesis',
      name: 'Genesis Tome',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 125,
      stats: { intelligence: 45, magic: 55, vitality: 25 },
      description: 'The book of creation itself',
      characterClass: 'mage'
    },
    {
      id: 'weapon_absolute',
      name: 'Absolute Magic',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 140,
      stats: { intelligence: 50, magic: 60, luck: 35 },
      description: 'The ultimate magical weapon',
      characterClass: 'mage'
    }
  ],
  
  necromancer: [
    // Tier 1 - Basic Weapons
    {
      id: 'wand_bone',
      name: 'Bone Wand',
      type: 'weapon',
      rarity: 'epic',
      damage: 18,
      stats: { intelligence: 8, magic: 10 },
      description: 'A wand made from cursed bones',
      characterClass: 'necromancer'
    },
    {
      id: 'staff_skull',
      name: 'Skull Staff',
      type: 'weapon',
      rarity: 'epic',
      damage: 22,
      stats: { intelligence: 10, magic: 12 },
      description: 'A staff topped with a screaming skull',
      characterClass: 'necromancer'
    },
    {
      id: 'dagger_cursed',
      name: 'Cursed Dagger',
      type: 'weapon',
      rarity: 'epic',
      damage: 24,
      stats: { intelligence: 6, magic: 8, luck: 10 },
      description: 'A dagger that drains life force',
      characterClass: 'necromancer'
    },
    
    // Tier 2 - Advanced Weapons
    {
      id: 'scythe_reaper',
      name: 'Reaper Scythe',
      type: 'weapon',
      rarity: 'legendary',
      damage: 48,
      stats: { intelligence: 16, magic: 20, strength: 10 },
      description: 'A scythe that harvests souls',
      characterClass: 'necromancer'
    },
    {
      id: 'staff_death',
      name: 'Death Staff',
      type: 'weapon',
      rarity: 'legendary',
      damage: 45,
      stats: { intelligence: 18, magic: 22 },
      description: 'A staff that commands the power of death',
      characterClass: 'necromancer'
    },
    {
      id: 'grimoire_dark',
      name: 'Dark Grimoire',
      type: 'weapon',
      rarity: 'legendary',
      damage: 50,
      stats: { intelligence: 20, magic: 25 },
      description: 'A book of forbidden dark magic',
      characterClass: 'necromancer'
    },
    {
      id: 'orb_soul',
      name: 'Soul Orb',
      type: 'weapon',
      rarity: 'legendary',
      damage: 46,
      stats: { intelligence: 15, magic: 18, vitality: 12 },
      description: 'An orb that contains captured souls',
      characterClass: 'necromancer'
    },
    {
      id: 'wand_shadow',
      name: 'Shadow Wand',
      type: 'weapon',
      rarity: 'legendary',
      damage: 52,
      stats: { intelligence: 22, magic: 20, luck: 15 },
      description: 'A wand that controls shadows',
      characterClass: 'necromancer'
    },
    
    // Tier 3 - Ultimate Weapons
    {
      id: 'scythe_void',
      name: 'Void Scythe',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 90,
      stats: { intelligence: 30, magic: 35, strength: 20 },
      description: 'A scythe that cuts through dimensions',
      characterClass: 'necromancer'
    },
    {
      id: 'grimoire_death',
      name: 'Death Grimoire',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 95,
      stats: { intelligence: 35, magic: 40, vitality: 20 },
      description: 'A book of ultimate death magic',
      characterClass: 'necromancer'
    },
    {
      id: 'crown_lich',
      name: 'Lich Crown',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 100,
      stats: { intelligence: 40, magic: 45, defense: 25 },
      description: 'A crown that grants dominion over death',
      characterClass: 'necromancer'
    },
    {
      id: 'staff_nightmare',
      name: 'Nightmare Staff',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 85,
      stats: { intelligence: 32, magic: 38, luck: 30 },
      description: 'A staff that manifests nightmares',
      characterClass: 'necromancer'
    },
    {
      id: 'orb_abyss',
      name: 'Abyss Orb',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 105,
      stats: { intelligence: 38, magic: 50, vitality: 25 },
      description: 'An orb that contains the power of the abyss',
      characterClass: 'necromancer'
    },
    {
      id: 'tome_apocalypse',
      name: 'Apocalypse Tome',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 120,
      stats: { intelligence: 45, magic: 55, strength: 30 },
      description: 'The book that ends all existence',
      characterClass: 'necromancer'
    },
    {
      id: 'weapon_absolute',
      name: 'Absolute Death',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 135,
      stats: { intelligence: 50, magic: 60, vitality: 35 },
      description: 'The ultimate weapon of death itself',
      characterClass: 'necromancer'
    }
  ],
  
  druid: [
    // Tier 1 - Basic Weapons
    {
      id: 'staff_nature',
      name: 'Nature Staff',
      type: 'weapon',
      rarity: 'epic',
      damage: 20,
      stats: { magic: 10, vitality: 8 },
      description: 'A staff made from living wood',
      characterClass: 'druid'
    },
    {
      id: 'claw_basic',
      name: 'Beast Claws',
      type: 'weapon',
      rarity: 'epic',
      damage: 24,
      stats: { strength: 8, agility: 10 },
      description: 'Natural claws for primal combat',
      characterClass: 'druid'
    },
    {
      id: 'spear_tribal',
      name: 'Tribal Spear',
      type: 'weapon',
      rarity: 'epic',
      damage: 26,
      stats: { strength: 10, agility: 6 },
      description: 'A spear crafted from natural materials',
      characterClass: 'druid'
    },
    
    // Tier 2 - Advanced Weapons
    {
      id: 'staff_earth',
      name: 'Earth Staff',
      type: 'weapon',
      rarity: 'legendary',
      damage: 45,
      stats: { magic: 20, vitality: 15 },
      description: 'A staff that controls the earth',
      characterClass: 'druid'
    },
    {
      id: 'claw_primal',
      name: 'Primal Claws',
      type: 'weapon',
      rarity: 'legendary',
      damage: 50,
      stats: { strength: 15, agility: 18 },
      description: 'Claws that channel primal fury',
      characterClass: 'druid'
    },
    {
      id: 'totem_storm',
      name: 'Storm Totem',
      type: 'weapon',
      rarity: 'legendary',
      damage: 48,
      stats: { magic: 22, intelligence: 15 },
      description: 'A totem that summons storms',
      characterClass: 'druid'
    },
    {
      id: 'horn_wind',
      name: 'Wind Horn',
      type: 'weapon',
      rarity: 'legendary',
      damage: 46,
      stats: { magic: 18, agility: 16 },
      description: 'A horn that calls the wind',
      characterClass: 'druid'
    },
    {
      id: 'staff_life',
      name: 'Life Staff',
      type: 'weapon',
      rarity: 'legendary',
      damage: 52,
      stats: { magic: 25, vitality: 20 },
      description: 'A staff that channels life force',
      characterClass: 'druid'
    },
    
    // Tier 3 - Ultimate Weapons
    {
      id: 'totem_world',
      name: 'World Totem',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 85,
      stats: { magic: 35, vitality: 30, intelligence: 20 },
      description: 'A totem that contains the power of the world',
      characterClass: 'druid'
    },
    {
      id: 'horn_storm',
      name: 'Storm Horn',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 90,
      stats: { magic: 40, agility: 25, intelligence: 20 },
      description: 'A horn that summons tempests',
      characterClass: 'druid'
    },
    {
      id: 'seed_world',
      name: 'World Seed',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 95,
      stats: { magic: 45, vitality: 35, intelligence: 25 },
      description: 'A seed that contains the power of creation',
      characterClass: 'druid'
    },
    {
      id: 'claw_nature',
      name: 'Nature Claws',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 100,
      stats: { strength: 30, agility: 35, magic: 30 },
      description: 'Claws that channel the power of nature',
      characterClass: 'druid'
    },
    {
      id: 'staff_cosmos',
      name: 'Cosmic Staff',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 105,
      stats: { magic: 50, intelligence: 30, vitality: 30 },
      description: 'A staff that connects to the cosmic forces',
      characterClass: 'druid'
    },
    {
      id: 'totem_infinity',
      name: 'Infinity Totem',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 115,
      stats: { magic: 55, vitality: 40, intelligence: 35 },
      description: 'A totem with infinite natural power',
      characterClass: 'druid'
    },
    {
      id: 'weapon_absolute',
      name: 'Absolute Nature',
      type: 'weapon',
      rarity: 'ultimate',
      damage: 130,
      stats: { magic: 60, vitality: 45, intelligence: 40 },
      description: 'The ultimate weapon of nature itself',
      characterClass: 'druid'
    }
  ]
};

// EXPANDED ARMOR SYSTEM - Multiple armor pieces per class
export const EXPANDED_ARMOR: Record<CharacterClass, Item[]> = {
  samurai: [
    // Helmets
    {
      id: 'helmet_samurai_basic',
      name: 'Samurai Kabuto',
      type: 'armor',
      rarity: 'epic',
      defense: 15,
      stats: { defense: 8, vitality: 5 },
      description: 'Traditional samurai helmet',
      characterClass: 'samurai'
    },
    {
      id: 'helmet_samurai_cyber',
      name: 'Cyber Kabuto',
      type: 'armor',
      rarity: 'legendary',
      defense: 25,
      stats: { defense: 12, intelligence: 8, vitality: 10 },
      description: 'Tech-enhanced samurai helmet',
      characterClass: 'samurai'
    },
    {
      id: 'helmet_samurai_dragon',
      name: 'Dragon Helm',
      type: 'armor',
      rarity: 'ultimate',
      defense: 40,
      stats: { defense: 20, strength: 15, magic: 12 },
      description: 'Helmet forged from dragon scales',
      characterClass: 'samurai'
    },
    
    // Chest Armor
    {
      id: 'chest_samurai_basic',
      name: 'Samurai Do',
      type: 'armor',
      rarity: 'epic',
      defense: 25,
      stats: { defense: 15, vitality: 10 },
      description: 'Traditional samurai chest armor',
      characterClass: 'samurai'
    },
    {
      id: 'chest_samurai_cyber',
      name: 'Cyber Samurai Armor',
      type: 'armor',
      rarity: 'legendary',
      defense: 45,
      stats: { defense: 25, vitality: 18, intelligence: 10 },
      description: 'Traditional armor enhanced with cyber tech',
      characterClass: 'samurai'
    },
    {
      id: 'chest_samurai_dragon',
      name: 'Dragon Scale Armor',
      type: 'armor',
      rarity: 'ultimate',
      defense: 65,
      stats: { defense: 35, vitality: 25, strength: 20 },
      description: 'Armor forged from dragon scales',
      characterClass: 'samurai'
    },
    {
      id: 'chest_samurai_void',
      name: 'Void Plate Armor',
      type: 'armor',
      rarity: 'ultimate',
      defense: 85,
      stats: { defense: 45, vitality: 30, magic: 25 },
      description: 'Armor that exists between dimensions',
      characterClass: 'samurai'
    },
    
    // Boots
    {
      id: 'boots_samurai_basic',
      name: 'Samurai Geta',
      type: 'armor',
      rarity: 'epic',
      defense: 10,
      stats: { agility: 8, defense: 5 },
      description: 'Traditional samurai footwear',
      characterClass: 'samurai'
    },
    {
      id: 'boots_samurai_cyber',
      name: 'Cyber Geta',
      type: 'armor',
      rarity: 'legendary',
      defense: 18,
      stats: { agility: 15, defense: 10, intelligence: 8 },
      description: 'Tech-enhanced samurai boots',
      characterClass: 'samurai'
    },
    {
      id: 'boots_samurai_void',
      name: 'Void Walkers',
      type: 'armor',
      rarity: 'ultimate',
      defense: 30,
      stats: { agility: 25, defense: 20, magic: 15 },
      description: 'Boots that allow walking through dimensions',
      characterClass: 'samurai'
    },
    
    // Gloves
    {
      id: 'gloves_samurai_basic',
      name: 'Samurai Kote',
      type: 'armor',
      rarity: 'epic',
      defense: 8,
      stats: { strength: 8, defense: 5 },
      description: 'Traditional samurai arm guards',
      characterClass: 'samurai'
    },
    {
      id: 'gloves_samurai_cyber',
      name: 'Cyber Kote',
      type: 'armor',
      rarity: 'legendary',
      defense: 15,
      stats: { strength: 15, defense: 10, intelligence: 8 },
      description: 'Tech-enhanced samurai gloves',
      characterClass: 'samurai'
    },
    {
      id: 'gloves_samurai_dragon',
      name: 'Dragon Gauntlets',
      type: 'armor',
      rarity: 'ultimate',
      defense: 25,
      stats: { strength: 25, defense: 18, magic: 15 },
      description: 'Gauntlets that channel dragon power',
      characterClass: 'samurai'
    }
  ],
  
  ninja: [
    // Helmets
    {
      id: 'helmet_ninja_basic',
      name: 'Ninja Hood',
      type: 'armor',
      rarity: 'epic',
      defense: 8,
      stats: { agility: 10, luck: 8 },
      description: 'Traditional ninja head covering',
      characterClass: 'ninja'
    },
    {
      id: 'helmet_ninja_shadow',
      name: 'Shadow Mask',
      type: 'armor',
      rarity: 'legendary',
      defense: 15,
      stats: { agility: 18, luck: 15, intelligence: 10 },
      description: 'A mask that bends light',
      characterClass: 'ninja'
    },
    {
      id: 'helmet_ninja_void',
      name: 'Void Mask',
      type: 'armor',
      rarity: 'ultimate',
      defense: 25,
      stats: { agility: 30, luck: 25, magic: 20 },
      description: 'A mask woven from void energy',
      characterClass: 'ninja'
    },
    
    // Chest Armor
    {
      id: 'chest_ninja_basic',
      name: 'Ninja Gi',
      type: 'armor',
      rarity: 'epic',
      defense: 15,
      stats: { agility: 12, luck: 8 },
      description: 'Traditional ninja clothing',
      characterClass: 'ninja'
    },
    {
      id: 'chest_ninja_shadow',
      name: 'Shadow Cloak',
      type: 'armor',
      rarity: 'legendary',
      defense: 30,
      stats: { agility: 20, luck: 15, intelligence: 10 },
      description: 'Clothing that bends light',
      characterClass: 'ninja'
    },
    {
      id: 'chest_ninja_phantom',
      name: 'Phantom Suit',
      type: 'armor',
      rarity: 'ultimate',
      defense: 45,
      stats: { agility: 30, luck: 25, magic: 20 },
      description: 'Suit that phases through attacks',
      characterClass: 'ninja'
    },
    {
      id: 'chest_ninja_void',
      name: 'Void Shroud',
      type: 'armor',
      rarity: 'ultimate',
      defense: 60,
      stats: { agility: 40, luck: 30, magic: 25 },
      description: 'Shroud woven from void energy',
      characterClass: 'ninja'
    },
    
    // Boots
    {
      id: 'boots_ninja_basic',
      name: 'Ninja Tabi',
      type: 'armor',
      rarity: 'epic',
      defense: 5,
      stats: { agility: 15, luck: 5 },
      description: 'Silent ninja footwear',
      characterClass: 'ninja'
    },
    {
      id: 'boots_ninja_shadow',
      name: 'Shadow Walkers',
      type: 'armor',
      rarity: 'legendary',
      defense: 12,
      stats: { agility: 25, luck: 18, intelligence: 8 },
      description: 'Boots that make no sound',
      characterClass: 'ninja'
    },
    {
      id: 'boots_ninja_phantom',
      name: 'Phantom Boots',
      type: 'armor',
      rarity: 'ultimate',
      defense: 20,
      stats: { agility: 35, luck: 25, magic: 18 },
      description: 'Boots that phase through matter',
      characterClass: 'ninja'
    },
    
    // Gloves
    {
      id: 'gloves_ninja_basic',
      name: 'Ninja Tekko',
      type: 'armor',
      rarity: 'epic',
      defense: 6,
      stats: { agility: 10, luck: 8 },
      description: 'Traditional ninja hand guards',
      characterClass: 'ninja'
    },
    {
      id: 'gloves_ninja_shadow',
      name: 'Shadow Hands',
      type: 'armor',
      rarity: 'legendary',
      defense: 12,
      stats: { agility: 18, luck: 15, intelligence: 10 },
      description: 'Gloves that blend with shadows',
      characterClass: 'ninja'
    },
    {
      id: 'gloves_ninja_void',
      name: 'Void Hands',
      type: 'armor',
      rarity: 'ultimate',
      defense: 18,
      stats: { agility: 25, luck: 22, magic: 20 },
      description: 'Gloves that can touch the void',
      characterClass: 'ninja'
    }
  ],
  
  // Continue with other classes...
  warrior: [
    // Helmets
    {
      id: 'helmet_warrior_basic',
      name: 'Iron Helmet',
      type: 'armor',
      rarity: 'epic',
      defense: 20,
      stats: { defense: 12, vitality: 8 },
      description: 'Heavy iron protection',
      characterClass: 'warrior'
    },
    {
      id: 'helmet_warrior_steel',
      name: 'Steel Helmet',
      type: 'armor',
      rarity: 'legendary',
      defense: 35,
      stats: { defense: 20, vitality: 15, strength: 10 },
      description: 'Reinforced steel helmet',
      characterClass: 'warrior'
    },
    {
      id: 'helmet_warrior_titan',
      name: 'Titan Helmet',
      type: 'armor',
      rarity: 'ultimate',
      defense: 50,
      stats: { defense: 30, vitality: 25, strength: 20 },
      description: 'Helmet worn by ancient titans',
      characterClass: 'warrior'
    },
    
    // Chest Armor
    {
      id: 'chest_warrior_basic',
      name: 'Iron Plate',
      type: 'armor',
      rarity: 'epic',
      defense: 35,
      stats: { defense: 20, vitality: 15 },
      description: 'Heavy iron plate armor',
      characterClass: 'warrior'
    },
    {
      id: 'chest_warrior_steel',
      name: 'Steel Plate Armor',
      type: 'armor',
      rarity: 'legendary',
      defense: 55,
      stats: { defense: 35, vitality: 25, strength: 15 },
      description: 'Heavy steel armor for protection',
      characterClass: 'warrior'
    },
    {
      id: 'chest_warrior_titan',
      name: 'Titan Plate',
      type: 'armor',
      rarity: 'ultimate',
      defense: 75,
      stats: { defense: 50, vitality: 40, strength: 25 },
      description: 'Armor worn by ancient titans',
      characterClass: 'warrior'
    },
    {
      id: 'chest_warrior_fortress',
      name: 'Fortress Plate',
      type: 'armor',
      rarity: 'ultimate',
      defense: 95,
      stats: { defense: 60, vitality: 50, strength: 30 },
      description: 'Armor that turns you into a fortress',
      characterClass: 'warrior'
    }
  ],
  
  hunter: [
    // Helmets
    {
      id: 'helmet_hunter_basic',
      name: 'Ranger Cap',
      type: 'armor',
      rarity: 'epic',
      defense: 10,
      stats: { agility: 8, luck: 10 },
      description: 'Lightweight ranger headgear',
      characterClass: 'hunter'
    },
    {
      id: 'helmet_hunter_tracker',
      name: 'Tracker Visor',
      type: 'armor',
      rarity: 'legendary',
      defense: 18,
      stats: { agility: 15, luck: 18, intelligence: 12 },
      description: 'Visor with enhanced tracking abilities',
      characterClass: 'hunter'
    },
    {
      id: 'helmet_hunter_storm',
      name: 'Storm Hood',
      type: 'armor',
      rarity: 'ultimate',
      defense: 25,
      stats: { agility: 25, luck: 30, magic: 18 },
      description: 'Hood that channels storm energy',
      characterClass: 'hunter'
    },
    
    // Chest Armor
    {
      id: 'chest_hunter_basic',
      name: 'Ranger Gear',
      type: 'armor',
      rarity: 'epic',
      defense: 20,
      stats: { agility: 10, luck: 12 },
      description: 'Lightweight gear for mobility',
      characterClass: 'hunter'
    },
    {
      id: 'chest_hunter_tracker',
      name: 'Tracker Suit',
      type: 'armor',
      rarity: 'legendary',
      defense: 35,
      stats: { agility: 18, luck: 20, intelligence: 12 },
      description: 'Suit with enhanced tracking abilities',
      characterClass: 'hunter'
    },
    {
      id: 'chest_hunter_storm',
      name: 'Storm Cloak',
      type: 'armor',
      rarity: 'ultimate',
      defense: 50,
      stats: { agility: 25, luck: 30, magic: 18 },
      description: 'Cloak that channels storm energy',
      characterClass: 'hunter'
    }
  ],
  
  mage: [
    // Helmets
    {
      id: 'helmet_mage_basic',
      name: 'Apprentice Hat',
      type: 'armor',
      rarity: 'epic',
      defense: 5,
      stats: { intelligence: 12, magic: 15 },
      description: 'Basic mage headwear',
      characterClass: 'mage'
    },
    {
      id: 'helmet_mage_arcane',
      name: 'Arcane Crown',
      type: 'armor',
      rarity: 'legendary',
      defense: 12,
      stats: { intelligence: 20, magic: 25, luck: 10 },
      description: 'Crown that enhances magical power',
      characterClass: 'mage'
    },
    {
      id: 'helmet_mage_cosmos',
      name: 'Cosmos Circlet',
      type: 'armor',
      rarity: 'ultimate',
      defense: 20,
      stats: { intelligence: 35, magic: 40, luck: 25 },
      description: 'Circlet that contains stellar power',
      characterClass: 'mage'
    },
    
    // Chest Armor
    {
      id: 'chest_mage_basic',
      name: 'Mage Robes',
      type: 'armor',
      rarity: 'epic',
      defense: 12,
      stats: { intelligence: 15, magic: 20 },
      description: 'Robes that amplify magical power',
      characterClass: 'mage'
    },
    {
      id: 'chest_mage_arcane',
      name: 'Arcane Vestments',
      type: 'armor',
      rarity: 'legendary',
      defense: 25,
      stats: { intelligence: 25, magic: 35, vitality: 10 },
      description: 'Vestments woven with arcane energy',
      characterClass: 'mage'
    },
    {
      id: 'chest_mage_cosmos',
      name: 'Cosmos Robes',
      type: 'armor',
      rarity: 'ultimate',
      defense: 40,
      stats: { intelligence: 40, magic: 50, luck: 20 },
      description: 'Robes that contain the power of stars',
      characterClass: 'mage'
    }
  ],
  
  necromancer: [
    // Similar structure for necromancer...
    {
      id: 'chest_necromancer_basic',
      name: 'Death Robes',
      type: 'armor',
      rarity: 'epic',
      defense: 18,
      stats: { intelligence: 12, magic: 18 },
      description: 'Robes stained with death magic',
      characterClass: 'necromancer'
    },
    {
      id: 'chest_necromancer_lich',
      name: 'Lich Vestments',
      type: 'armor',
      rarity: 'legendary',
      defense: 30,
      stats: { intelligence: 20, magic: 30, vitality: 15 },
      description: 'Vestments of an ancient lich',
      characterClass: 'necromancer'
    },
    {
      id: 'chest_necromancer_soul',
      name: 'Soul Shroud',
      type: 'armor',
      rarity: 'ultimate',
      defense: 45,
      stats: { intelligence: 35, magic: 45, luck: 25 },
      description: 'Shroud woven from captured souls',
      characterClass: 'necromancer'
    }
  ],
  
  druid: [
    // Similar structure for druid...
    {
      id: 'chest_druid_basic',
      name: 'Nature Garb',
      type: 'armor',
      rarity: 'epic',
      defense: 22,
      stats: { vitality: 12, magic: 15 },
      description: 'Clothing made from living plants',
      characterClass: 'druid'
    },
    {
      id: 'chest_druid_beast',
      name: 'Primal Beast Hide',
      type: 'armor',
      rarity: 'legendary',
      defense: 40,
      stats: { vitality: 20, magic: 25, strength: 15 },
      description: 'Hide from an ancient beast',
      characterClass: 'druid'
    },
    {
      id: 'chest_druid_world',
      name: 'World Tree Bark',
      type: 'armor',
      rarity: 'ultimate',
      defense: 58,
      stats: { vitality: 35, magic: 40, intelligence: 25 },
      description: 'Bark from the world tree itself',
      characterClass: 'druid'
    }
  ]
};

// ACCESSORIES - New item types
export const ACCESSORIES: Item[] = [
  // Rings
  {
    id: 'ring_power',
    name: 'Ring of Power',
    type: 'accessory',
    rarity: 'epic',
    stats: { strength: 10, magic: 10 },
    description: 'A ring that enhances physical and magical power'
  },
  {
    id: 'ring_agility',
    name: 'Ring of Swiftness',
    type: 'accessory',
    rarity: 'epic',
    stats: { agility: 15, luck: 10 },
    description: 'A ring that increases speed and fortune'
  },
  {
    id: 'ring_intelligence',
    name: 'Ring of Wisdom',
    type: 'accessory',
    rarity: 'legendary',
    stats: { intelligence: 20, magic: 15 },
    description: 'A ring that enhances mental capabilities'
  },
  {
    id: 'ring_vitality',
    name: 'Ring of Life',
    type: 'accessory',
    rarity: 'legendary',
    stats: { vitality: 25, defense: 15 },
    description: 'A ring that enhances life force'
  },
  {
    id: 'ring_ultimate',
    name: 'Ring of Infinity',
    type: 'accessory',
    rarity: 'ultimate',
    stats: { strength: 15, agility: 15, intelligence: 15, vitality: 15, magic: 15 },
    description: 'A ring that enhances all abilities'
  },
  
  // Necklaces
  {
    id: 'necklace_protection',
    name: 'Amulet of Protection',
    type: 'accessory',
    rarity: 'epic',
    defense: 20,
    stats: { defense: 15, vitality: 10 },
    description: 'An amulet that protects from harm'
  },
  {
    id: 'necklace_mana',
    name: 'Mana Crystal Pendant',
    type: 'accessory',
    rarity: 'legendary',
    stats: { magic: 25, intelligence: 20 },
    description: 'A pendant that enhances magical energy'
  },
  {
    id: 'necklace_critical',
    name: 'Pendant of Critical Strike',
    type: 'accessory',
    rarity: 'legendary',
    stats: { luck: 30, agility: 20 },
    description: 'A pendant that increases critical hit chance'
  },
  {
    id: 'necklace_ultimate',
    name: 'Cosmic Amulet',
    type: 'accessory',
    rarity: 'ultimate',
    stats: { intelligence: 30, magic: 35, luck: 25 },
    description: 'An amulet containing cosmic power'
  },
  
  // Special Items
  {
    id: 'charm_experience',
    name: 'Experience Charm',
    type: 'accessory',
    rarity: 'legendary',
    stats: { luck: 20 },
    description: 'Increases experience gain by 50%'
  },
  {
    id: 'charm_fortune',
    name: 'Fortune Charm',
    type: 'accessory',
    rarity: 'ultimate',
    stats: { luck: 40 },
    description: 'Greatly increases loot drop rates'
  }
];

// CONSUMABLES - Expanded consumables
export const EXPANDED_CONSUMABLES: Item[] = [
  // Health Potions
  {
    id: 'health_tiny',
    name: 'Tiny Health Potion',
    type: 'consumable',
    rarity: 'epic',
    description: 'Restores 25 HP',
    quantity: 1
  },
  {
    id: 'health_small',
    name: 'Small Health Potion',
    type: 'consumable',
    rarity: 'epic',
    description: 'Restores 50 HP',
    quantity: 1
  },
  {
    id: 'health_medium',
    name: 'Health Potion',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Restores 100 HP',
    quantity: 1
  },
  {
    id: 'health_large',
    name: 'Greater Health Potion',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Restores 200 HP',
    quantity: 1
  },
  {
    id: 'health_mega',
    name: 'Mega Health Potion',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Restores 500 HP',
    quantity: 1
  },
  {
    id: 'health_ultimate',
    name: 'Ultimate Health Elixir',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Fully restores HP',
    quantity: 1
  },
  
  // Mana Potions
  {
    id: 'mana_tiny',
    name: 'Tiny Mana Potion',
    type: 'consumable',
    rarity: 'epic',
    description: 'Restores 15 MP',
    quantity: 1
  },
  {
    id: 'mana_small',
    name: 'Small Mana Potion',
    type: 'consumable',
    rarity: 'epic',
    description: 'Restores 30 MP',
    quantity: 1
  },
  {
    id: 'mana_medium',
    name: 'Mana Potion',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Restores 60 MP',
    quantity: 1
  },
  {
    id: 'mana_large',
    name: 'Greater Mana Potion',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Restores 120 MP',
    quantity: 1
  },
  {
    id: 'mana_mega',
    name: 'Mega Mana Potion',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Restores 300 MP',
    quantity: 1
  },
  {
    id: 'mana_ultimate',
    name: 'Ultimate Mana Elixir',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Fully restores MP',
    quantity: 1
  },
  
  // Stat Enhancers
  {
    id: 'stat_boost_str',
    name: 'Strength Enhancer',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Strength by 2',
    quantity: 1
  },
  {
    id: 'stat_boost_agi',
    name: 'Agility Enhancer',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Agility by 2',
    quantity: 1
  },
  {
    id: 'stat_boost_int',
    name: 'Intelligence Enhancer',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Intelligence by 2',
    quantity: 1
  },
  {
    id: 'stat_boost_vit',
    name: 'Vitality Enhancer',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Vitality by 2',
    quantity: 1
  },
  {
    id: 'stat_boost_def',
    name: 'Defense Enhancer',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Defense by 2',
    quantity: 1
  },
  {
    id: 'stat_boost_mag',
    name: 'Magic Enhancer',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Magic by 2',
    quantity: 1
  },
  {
    id: 'stat_boost_luck',
    name: 'Luck Enhancer',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Permanently increases Luck by 2',
    quantity: 1
  },
  
  // Buffs
  {
    id: 'exp_boost',
    name: 'Experience Booster',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Doubles experience gain for 10 minutes',
    quantity: 1
  },
  {
    id: 'damage_boost',
    name: 'Damage Amplifier',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Increases damage by 50% for 5 minutes',
    quantity: 1
  },
  {
    id: 'defense_boost',
    name: 'Defense Amplifier',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Increases defense by 50% for 5 minutes',
    quantity: 1
  },
  {
    id: 'speed_boost',
    name: 'Speed Amplifier',
    type: 'consumable',
    rarity: 'legendary',
    description: 'Increases speed by 100% for 3 minutes',
    quantity: 1
  },
  {
    id: 'invincibility',
    name: 'Invincibility Potion',
    type: 'consumable',
    rarity: 'ultimate',
    description: 'Grants invincibility for 30 seconds',
    quantity: 1
  }
];

// Generate enhanced loot with new items
export const generateEnhancedLoot = (level: number, isBoss: boolean = false, characterClass?: CharacterClass): Item[] => {
  const loot: Item[] = [];
  const baseDropChance = isBoss ? 0.9 : 0.4;
  
  // Always drop consumables
  if (Math.random() < baseDropChance * 1.5) {
    const consumable = EXPANDED_CONSUMABLES[Math.floor(Math.random() * EXPANDED_CONSUMABLES.length)];
    loot.push({ ...consumable, id: `${consumable.id}_${Date.now()}` });
  }
  
  // Chance for weapons
  if (Math.random() < baseDropChance * 0.7 && characterClass) {
    const weapons = EXPANDED_WEAPONS[characterClass];
    const weapon = weapons[Math.floor(Math.random() * weapons.length)];
    loot.push({ ...weapon, id: `${weapon.id}_${Date.now()}` });
  }
  
  // Chance for armor
  if (Math.random() < baseDropChance * 0.6 && characterClass) {
    const armor = EXPANDED_ARMOR[characterClass];
    const armorPiece = armor[Math.floor(Math.random() * armor.length)];
    loot.push({ ...armorPiece, id: `${armorPiece.id}_${Date.now()}` });
  }
  
  // Chance for accessories
  if (Math.random() < baseDropChance * 0.3) {
    const accessory = ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)];
    loot.push({ ...accessory, id: `${accessory.id}_${Date.now()}` });
  }
  
  // Boss guaranteed ultimate drops
  if (isBoss) {
    if (Math.random() < 0.8) {
      const allWeapons = Object.values(EXPANDED_WEAPONS).flat();
      const ultimateWeapons = allWeapons.filter(w => w.rarity === 'ultimate');
      const weapon = ultimateWeapons[Math.floor(Math.random() * ultimateWeapons.length)];
      loot.push({ ...weapon, id: `${weapon.id}_${Date.now()}` });
    }
    
    if (Math.random() < 0.6) {
      const ultimateAccessories = ACCESSORIES.filter(a => a.rarity === 'ultimate');
      const accessory = ultimateAccessories[Math.floor(Math.random() * ultimateAccessories.length)];
      loot.push({ ...accessory, id: `${accessory.id}_${Date.now()}` });
    }
  }
  
  return loot;
};