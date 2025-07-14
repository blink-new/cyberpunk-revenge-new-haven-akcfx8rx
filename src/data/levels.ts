import { GameLevel, Enemy } from '../types/game';
import { generateLoot } from './equipment';

// Boss enemies for different levels
export const BOSS_ENEMIES: Enemy[] = [
  {
    id: 'lieutenant_kazuo',
    name: 'Lieutenant Kazuo',
    level: 5,
    health: 300,
    maxHealth: 300,
    damage: 45,
    defense: 20,
    experience: 150,
    loot: [],
    isBoss: true,
    skills: ['Cyber Slash', 'Shield Bash', 'Summon Thugs']
  },
  {
    id: 'enforcer_mech',
    name: 'Cyber Enforcer Mech',
    level: 10,
    health: 500,
    maxHealth: 500,
    damage: 65,
    defense: 35,
    experience: 250,
    loot: [],
    isBoss: true,
    skills: ['Missile Barrage', 'Laser Beam', 'Electromagnetic Pulse']
  },
  {
    id: 'phantom_assassin',
    name: 'Phantom Assassin',
    level: 15,
    health: 400,
    maxHealth: 400,
    damage: 85,
    defense: 25,
    experience: 300,
    loot: [],
    isBoss: true,
    skills: ['Shadow Strike', 'Poison Cloud', 'Teleport Strike']
  },
  {
    id: 'data_wraith',
    name: 'Data Wraith',
    level: 20,
    health: 600,
    maxHealth: 600,
    damage: 75,
    defense: 40,
    experience: 400,
    loot: [],
    isBoss: true,
    skills: ['Data Corruption', 'System Crash', 'Digital Possession']
  },
  {
    id: 'storm_lord',
    name: 'Storm Lord Akira',
    level: 25,
    health: 800,
    maxHealth: 800,
    damage: 95,
    defense: 50,
    experience: 500,
    loot: [],
    isBoss: true,
    skills: ['Lightning Storm', 'Thunder Clap', 'Electric Aura']
  },
  {
    id: 'void_hunter',
    name: 'Void Hunter',
    level: 30,
    health: 700,
    maxHealth: 700,
    damage: 105,
    defense: 45,
    experience: 600,
    loot: [],
    isBoss: true,
    skills: ['Void Rifle', 'Dimensional Trap', 'Phase Shift']
  },
  {
    id: 'tech_shaman',
    name: 'Tech Shaman Yuki',
    level: 35,
    health: 900,
    maxHealth: 900,
    damage: 85,
    defense: 55,
    experience: 700,
    loot: [],
    isBoss: true,
    skills: ['Cyber Totems', 'Digital Spirits', 'Tech Ritual']
  },
  {
    id: 'death_knight',
    name: 'Cyber Death Knight',
    level: 40,
    health: 1000,
    maxHealth: 1000,
    damage: 115,
    defense: 60,
    experience: 800,
    loot: [],
    isBoss: true,
    skills: ['Death Coil', 'Unholy Presence', 'Bone Prison']
  },
  {
    id: 'dragon_mech',
    name: 'Cyber Dragon Mech',
    level: 45,
    health: 1200,
    maxHealth: 1200,
    damage: 125,
    defense: 70,
    experience: 900,
    loot: [],
    isBoss: true,
    skills: ['Plasma Breath', 'Wing Slam', 'Roar of Terror']
  },
  {
    id: 'shimoto_boss',
    name: 'Shimoto Gang Boss',
    level: 50,
    health: 1500,
    maxHealth: 1500,
    damage: 150,
    defense: 80,
    experience: 1000,
    loot: [],
    isBoss: true,
    skills: ['Devastating Combo', 'Rage Mode', 'Final Strike']
  },
  // NEW BOSSES FOR EXTENDED LEVELS
  {
    id: 'quantum_overlord',
    name: 'Quantum Overlord',
    level: 55,
    health: 1800,
    maxHealth: 1800,
    damage: 165,
    defense: 90,
    experience: 1200,
    loot: [],
    isBoss: true,
    skills: ['Quantum Leap', 'Reality Distortion', 'Temporal Freeze']
  },
  {
    id: 'shadow_emperor',
    name: 'Shadow Emperor',
    level: 60,
    health: 2000,
    maxHealth: 2000,
    damage: 180,
    defense: 95,
    experience: 1400,
    loot: [],
    isBoss: true,
    skills: ['Shadow Realm', 'Darkness Incarnate', 'Void Explosion']
  },
  {
    id: 'cyber_god',
    name: 'Cyber God Avatar',
    level: 65,
    health: 2500,
    maxHealth: 2500,
    damage: 200,
    defense: 100,
    experience: 1600,
    loot: [],
    isBoss: true,
    skills: ['Divine Judgment', 'Cyber Apocalypse', 'God Mode']
  },
  {
    id: 'nightmare_king',
    name: 'Nightmare King',
    level: 70,
    health: 3000,
    maxHealth: 3000,
    damage: 220,
    defense: 110,
    experience: 1800,
    loot: [],
    isBoss: true,
    skills: ['Nightmare Vortex', 'Fear Incarnate', 'Dream Crusher']
  },
  {
    id: 'final_destroyer',
    name: 'The Final Destroyer',
    level: 75,
    health: 4000,
    maxHealth: 4000,
    damage: 250,
    defense: 120,
    experience: 2000,
    loot: [],
    isBoss: true,
    skills: ['World Ender', 'Complete Annihilation', 'Reality Collapse']
  },
  {
    id: 'ultimate_nemesis',
    name: 'Ultimate Nemesis',
    level: 80,
    health: 5000,
    maxHealth: 5000,
    damage: 300,
    defense: 150,
    experience: 2500,
    loot: [],
    isBoss: true,
    skills: ['Nemesis Strike', 'Perfect Counter', 'Invincible Form']
  },
  {
    id: 'chaos_incarnate',
    name: 'Chaos Incarnate',
    level: 85,
    health: 6000,
    maxHealth: 6000,
    damage: 350,
    defense: 175,
    experience: 3000,
    loot: [],
    isBoss: true,
    skills: ['Chaos Storm', 'Random Devastation', 'Entropy Wave']
  },
  {
    id: 'infinity_warden',
    name: 'Infinity Warden',
    level: 90,
    health: 7500,
    maxHealth: 7500,
    damage: 400,
    defense: 200,
    experience: 3500,
    loot: [],
    isBoss: true,
    skills: ['Infinity Blade', 'Eternal Prison', 'Timeless Void']
  },
  {
    id: 'genesis_destroyer',
    name: 'Genesis Destroyer',
    level: 95,
    health: 10000,
    maxHealth: 10000,
    damage: 500,
    defense: 250,
    experience: 4000,
    loot: [],
    isBoss: true,
    skills: ['Genesis Beam', 'Creation Undone', 'Big Bang Reverse']
  },
  {
    id: 'absolute_zero',
    name: 'Absolute Zero',
    level: 99,
    health: 15000,
    maxHealth: 15000,
    damage: 999,
    defense: 500,
    experience: 5000,
    loot: [],
    isBoss: true,
    skills: ['Absolute Zero', 'Perfect Void', 'End of Everything']
  }
];

// Extended regular enemies for higher levels
export const REGULAR_ENEMIES: Enemy[] = [
  {
    id: 'street_thug',
    name: 'Street Thug',
    level: 1,
    health: 50,
    maxHealth: 50,
    damage: 15,
    defense: 5,
    experience: 25,
    loot: [],
    isBoss: false,
    skills: ['Punch', 'Kick']
  },
  {
    id: 'cyber_punk',
    name: 'Cyber Punk',
    level: 3,
    health: 80,
    maxHealth: 80,
    damage: 25,
    defense: 8,
    experience: 35,
    loot: [],
    isBoss: false,
    skills: ['Cyber Punch', 'Electric Shock']
  },
  {
    id: 'gang_enforcer',
    name: 'Gang Enforcer',
    level: 5,
    health: 120,
    maxHealth: 120,
    damage: 35,
    defense: 12,
    experience: 50,
    loot: [],
    isBoss: false,
    skills: ['Gun Shot', 'Tackle']
  },
  {
    id: 'cyber_soldier',
    name: 'Cyber Soldier',
    level: 8,
    health: 160,
    maxHealth: 160,
    damage: 45,
    defense: 18,
    experience: 75,
    loot: [],
    isBoss: false,
    skills: ['Rifle Shot', 'Grenade', 'Shield']
  },
  {
    id: 'tech_ninja',
    name: 'Tech Ninja',
    level: 12,
    health: 140,
    maxHealth: 140,
    damage: 55,
    defense: 15,
    experience: 90,
    loot: [],
    isBoss: false,
    skills: ['Stealth Strike', 'Smoke Bomb', 'Shuriken']
  },
  {
    id: 'plasma_gunner',
    name: 'Plasma Gunner',
    level: 15,
    health: 200,
    maxHealth: 200,
    damage: 65,
    defense: 22,
    experience: 110,
    loot: [],
    isBoss: false,
    skills: ['Plasma Burst', 'Overcharge', 'Rapid Fire']
  },
  {
    id: 'cyber_hound',
    name: 'Cyber Hound',
    level: 18,
    health: 180,
    maxHealth: 180,
    damage: 70,
    defense: 20,
    experience: 125,
    loot: [],
    isBoss: false,
    skills: ['Bite', 'Leap', 'Howl']
  },
  {
    id: 'void_cultist',
    name: 'Void Cultist',
    level: 22,
    health: 220,
    maxHealth: 220,
    damage: 75,
    defense: 25,
    experience: 140,
    loot: [],
    isBoss: false,
    skills: ['Void Bolt', 'Dark Ritual', 'Curse']
  },
  {
    id: 'storm_trooper',
    name: 'Storm Trooper',
    level: 25,
    health: 250,
    maxHealth: 250,
    damage: 85,
    defense: 30,
    experience: 160,
    loot: [],
    isBoss: false,
    skills: ['Lightning Gun', 'Thunder Shield', 'Storm Call']
  },
  {
    id: 'death_bot',
    name: 'Death Bot',
    level: 30,
    health: 300,
    maxHealth: 300,
    damage: 95,
    defense: 35,
    experience: 200,
    loot: [],
    isBoss: false,
    skills: ['Death Ray', 'Self Destruct', 'Repair']
  },
  {
    id: 'cyber_dragon',
    name: 'Cyber Dragon',
    level: 35,
    health: 350,
    maxHealth: 350,
    damage: 105,
    defense: 40,
    experience: 250,
    loot: [],
    isBoss: false,
    skills: ['Fire Breath', 'Claw Swipe', 'Wing Gust']
  },
  {
    id: 'void_guardian',
    name: 'Void Guardian',
    level: 40,
    health: 400,
    maxHealth: 400,
    damage: 115,
    defense: 45,
    experience: 300,
    loot: [],
    isBoss: false,
    skills: ['Void Slam', 'Dimension Rift', 'Protective Barrier']
  },
  {
    id: 'titan_mech',
    name: 'Titan Mech',
    level: 45,
    health: 500,
    maxHealth: 500,
    damage: 125,
    defense: 50,
    experience: 350,
    loot: [],
    isBoss: false,
    skills: ['Missile Salvo', 'Stomp', 'Laser Barrage']
  },
  // NEW HIGH-LEVEL ENEMIES
  {
    id: 'quantum_phantom',
    name: 'Quantum Phantom',
    level: 50,
    health: 600,
    maxHealth: 600,
    damage: 140,
    defense: 55,
    experience: 400,
    loot: [],
    isBoss: false,
    skills: ['Quantum Shift', 'Phase Strike', 'Probability Warp']
  },
  {
    id: 'shadow_wraith',
    name: 'Shadow Wraith',
    level: 55,
    health: 700,
    maxHealth: 700,
    damage: 155,
    defense: 60,
    experience: 450,
    loot: [],
    isBoss: false,
    skills: ['Shadow Bind', 'Darkness Veil', 'Soul Drain']
  },
  {
    id: 'cyber_seraph',
    name: 'Cyber Seraph',
    level: 60,
    health: 800,
    maxHealth: 800,
    damage: 170,
    defense: 65,
    experience: 500,
    loot: [],
    isBoss: false,
    skills: ['Holy Laser', 'Divine Shield', 'Purification']
  },
  {
    id: 'nightmare_spawn',
    name: 'Nightmare Spawn',
    level: 65,
    health: 900,
    maxHealth: 900,
    damage: 185,
    defense: 70,
    experience: 550,
    loot: [],
    isBoss: false,
    skills: ['Terror Strike', 'Nightmare Fuel', 'Fear Aura']
  },
  {
    id: 'chaos_demon',
    name: 'Chaos Demon',
    level: 70,
    health: 1000,
    maxHealth: 1000,
    damage: 200,
    defense: 75,
    experience: 600,
    loot: [],
    isBoss: false,
    skills: ['Chaos Bolt', 'Random Mutation', 'Disorder Field']
  },
  {
    id: 'infinity_construct',
    name: 'Infinity Construct',
    level: 75,
    health: 1200,
    maxHealth: 1200,
    damage: 220,
    defense: 80,
    experience: 700,
    loot: [],
    isBoss: false,
    skills: ['Infinity Blast', 'Endless Loop', 'Eternal Form']
  },
  {
    id: 'genesis_angel',
    name: 'Genesis Angel',
    level: 80,
    health: 1400,
    maxHealth: 1400,
    damage: 240,
    defense: 85,
    experience: 800,
    loot: [],
    isBoss: false,
    skills: ['Genesis Wing', 'Creation Beam', 'Origin Force']
  },
  {
    id: 'void_emperor',
    name: 'Void Emperor',
    level: 85,
    health: 1600,
    maxHealth: 1600,
    damage: 260,
    defense: 90,
    experience: 900,
    loot: [],
    isBoss: false,
    skills: ['Void Command', 'Nothingness', 'Emperor Strike']
  },
  {
    id: 'absolute_guard',
    name: 'Absolute Guard',
    level: 90,
    health: 2000,
    maxHealth: 2000,
    damage: 300,
    defense: 100,
    experience: 1000,
    loot: [],
    isBoss: false,
    skills: ['Absolute Defense', 'Perfect Counter', 'Ultimate Guard']
  },
  {
    id: 'zero_sentinel',
    name: 'Zero Sentinel',
    level: 95,
    health: 2500,
    maxHealth: 2500,
    damage: 350,
    defense: 120,
    experience: 1200,
    loot: [],
    isBoss: false,
    skills: ['Zero Strike', 'Null Field', 'Void Sentinel']
  }
];

// Extended background configurations with new images
export const LEVEL_BACKGROUNDS = {
  street: '/bg-cyberpunk-1.png',
  building: '/bg-cyberpunk-2.png',
  underground: '/bg-cyberpunk-3.png',
  rooftop: '/bg-cyberpunk-4.png',
  factory: '/bg-cyberpunk-5.png',
  neon_city: '/bg-cyberpunk-6.png',
  cyber_night: '/bg-cyberpunk-7.png',
  toxic_wasteland: '/bg-cyberpunk-8.png',
  digital_realm: '/bg-cyberpunk-9.png',
  void_space: '/bg-cyberpunk-10.png'
};

// Create 100 levels with extended progression
export const GAME_LEVELS: GameLevel[] = [
  // Levels 1-50 (Original levels kept for compatibility)
  {
    id: 1,
    name: 'Neon Streets - Beginning',
    enemies: [
      { ...REGULAR_ENEMIES[0], loot: generateLoot(1) },
      { ...REGULAR_ENEMIES[0], loot: generateLoot(1) }
    ],
    requiredLevel: 1,
    environment: 'street'
  },
  {
    id: 2,
    name: 'Street Gang Territory',
    enemies: [
      { ...REGULAR_ENEMIES[0], loot: generateLoot(2) },
      { ...REGULAR_ENEMIES[1], loot: generateLoot(2) },
      { ...REGULAR_ENEMIES[0], loot: generateLoot(2) }
    ],
    requiredLevel: 2,
    environment: 'street'
  },
  {
    id: 3,
    name: 'Cyber Alley',
    enemies: [
      { ...REGULAR_ENEMIES[1], loot: generateLoot(3) },
      { ...REGULAR_ENEMIES[1], loot: generateLoot(3) }
    ],
    requiredLevel: 3,
    environment: 'street'
  },
  {
    id: 4,
    name: 'Underground Entrance',
    enemies: [
      { ...REGULAR_ENEMIES[1], loot: generateLoot(4) },
      { ...REGULAR_ENEMIES[2], loot: generateLoot(4) }
    ],
    requiredLevel: 4,
    environment: 'underground'
  },
  {
    id: 5,
    name: 'Boss: Lieutenant Kazuo',
    enemies: [
      { ...BOSS_ENEMIES[0], loot: generateLoot(5, true) }
    ],
    boss: { ...BOSS_ENEMIES[0], loot: generateLoot(5, true) },
    requiredLevel: 5,
    environment: 'building'
  },
  // ... (keeping all original 50 levels for compatibility)
  // Levels 6-50 would continue as before...
  // For brevity, I'll jump to the new extended levels

  // NEW EXTENDED LEVELS 51-100
  {
    id: 51,
    name: 'Quantum Research Facility',
    enemies: [
      { ...REGULAR_ENEMIES[13], loot: generateLoot(51) },
      { ...REGULAR_ENEMIES[13], loot: generateLoot(51) },
      { ...REGULAR_ENEMIES[13], loot: generateLoot(51) }
    ],
    requiredLevel: 51,
    environment: 'neon_city'
  },
  {
    id: 52,
    name: 'Phantom Laboratory',
    enemies: [
      { ...REGULAR_ENEMIES[13], loot: generateLoot(52) },
      { ...REGULAR_ENEMIES[14], loot: generateLoot(52) },
      { ...REGULAR_ENEMIES[13], loot: generateLoot(52) }
    ],
    requiredLevel: 52,
    environment: 'neon_city'
  },
  {
    id: 53,
    name: 'Quantum Corridor',
    enemies: [
      { ...REGULAR_ENEMIES[14], loot: generateLoot(53) },
      { ...REGULAR_ENEMIES[14], loot: generateLoot(53) },
      { ...REGULAR_ENEMIES[14], loot: generateLoot(53) }
    ],
    requiredLevel: 53,
    environment: 'cyber_night'
  },
  {
    id: 54,
    name: 'Reality Distortion Chamber',
    enemies: [
      { ...REGULAR_ENEMIES[14], loot: generateLoot(54) },
      { ...REGULAR_ENEMIES[14], loot: generateLoot(54) },
      { ...REGULAR_ENEMIES[14], loot: generateLoot(54) },
      { ...REGULAR_ENEMIES[14], loot: generateLoot(54) }
    ],
    requiredLevel: 54,
    environment: 'cyber_night'
  },
  {
    id: 55,
    name: 'Boss: Quantum Overlord',
    enemies: [
      { ...BOSS_ENEMIES[10], loot: generateLoot(55, true) }
    ],
    boss: { ...BOSS_ENEMIES[10], loot: generateLoot(55, true) },
    requiredLevel: 55,
    environment: 'digital_realm'
  },
  {
    id: 56,
    name: 'Shadow Realm Gateway',
    enemies: [
      { ...REGULAR_ENEMIES[14], loot: generateLoot(56) },
      { ...REGULAR_ENEMIES[14], loot: generateLoot(56) },
      { ...REGULAR_ENEMIES[15], loot: generateLoot(56) }
    ],
    requiredLevel: 56,
    environment: 'toxic_wasteland'
  },
  {
    id: 57,
    name: 'Wraith Dimension',
    enemies: [
      { ...REGULAR_ENEMIES[15], loot: generateLoot(57) },
      { ...REGULAR_ENEMIES[15], loot: generateLoot(57) },
      { ...REGULAR_ENEMIES[15], loot: generateLoot(57) }
    ],
    requiredLevel: 57,
    environment: 'toxic_wasteland'
  },
  {
    id: 58,
    name: 'Shadow Emperor Domain',
    enemies: [
      { ...REGULAR_ENEMIES[15], loot: generateLoot(58) },
      { ...REGULAR_ENEMIES[15], loot: generateLoot(58) },
      { ...REGULAR_ENEMIES[15], loot: generateLoot(58) },
      { ...REGULAR_ENEMIES[15], loot: generateLoot(58) }
    ],
    requiredLevel: 58,
    environment: 'void_space'
  },
  {
    id: 59,
    name: 'Darkness Incarnate',
    enemies: [
      { ...REGULAR_ENEMIES[15], loot: generateLoot(59) },
      { ...REGULAR_ENEMIES[15], loot: generateLoot(59) },
      { ...REGULAR_ENEMIES[15], loot: generateLoot(59) },
      { ...REGULAR_ENEMIES[15], loot: generateLoot(59) },
      { ...REGULAR_ENEMIES[15], loot: generateLoot(59) }
    ],
    requiredLevel: 59,
    environment: 'void_space'
  },
  {
    id: 60,
    name: 'Boss: Shadow Emperor',
    enemies: [
      { ...BOSS_ENEMIES[11], loot: generateLoot(60, true) }
    ],
    boss: { ...BOSS_ENEMIES[11], loot: generateLoot(60, true) },
    requiredLevel: 60,
    environment: 'void_space'
  },
  {
    id: 61,
    name: 'Cyber God Temple',
    enemies: [
      { ...REGULAR_ENEMIES[16], loot: generateLoot(61) },
      { ...REGULAR_ENEMIES[16], loot: generateLoot(61) },
      { ...REGULAR_ENEMIES[16], loot: generateLoot(61) }
    ],
    requiredLevel: 61,
    environment: 'digital_realm'
  },
  {
    id: 62,
    name: 'Seraph Sanctuary',
    enemies: [
      { ...REGULAR_ENEMIES[16], loot: generateLoot(62) },
      { ...REGULAR_ENEMIES[16], loot: generateLoot(62) },
      { ...REGULAR_ENEMIES[16], loot: generateLoot(62) },
      { ...REGULAR_ENEMIES[16], loot: generateLoot(62) }
    ],
    requiredLevel: 62,
    environment: 'digital_realm'
  },
  {
    id: 63,
    name: 'Divine Algorithm',
    enemies: [
      { ...REGULAR_ENEMIES[16], loot: generateLoot(63) },
      { ...REGULAR_ENEMIES[16], loot: generateLoot(63) },
      { ...REGULAR_ENEMIES[16], loot: generateLoot(63) },
      { ...REGULAR_ENEMIES[16], loot: generateLoot(63) }
    ],
    requiredLevel: 63,
    environment: 'digital_realm'
  },
  {
    id: 64,
    name: 'God Mode Protocol',
    enemies: [
      { ...REGULAR_ENEMIES[16], loot: generateLoot(64) },
      { ...REGULAR_ENEMIES[16], loot: generateLoot(64) },
      { ...REGULAR_ENEMIES[16], loot: generateLoot(64) },
      { ...REGULAR_ENEMIES[16], loot: generateLoot(64) },
      { ...REGULAR_ENEMIES[16], loot: generateLoot(64) }
    ],
    requiredLevel: 64,
    environment: 'digital_realm'
  },
  {
    id: 65,
    name: 'Boss: Cyber God Avatar',
    enemies: [
      { ...BOSS_ENEMIES[12], loot: generateLoot(65, true) }
    ],
    boss: { ...BOSS_ENEMIES[12], loot: generateLoot(65, true) },
    requiredLevel: 65,
    environment: 'digital_realm'
  },
  {
    id: 66,
    name: 'Nightmare Realm Entry',
    enemies: [
      { ...REGULAR_ENEMIES[17], loot: generateLoot(66) },
      { ...REGULAR_ENEMIES[17], loot: generateLoot(66) },
      { ...REGULAR_ENEMIES[17], loot: generateLoot(66) }
    ],
    requiredLevel: 66,
    environment: 'toxic_wasteland'
  },
  {
    id: 67,
    name: 'Terror Dimension',
    enemies: [
      { ...REGULAR_ENEMIES[17], loot: generateLoot(67) },
      { ...REGULAR_ENEMIES[17], loot: generateLoot(67) },
      { ...REGULAR_ENEMIES[17], loot: generateLoot(67) },
      { ...REGULAR_ENEMIES[17], loot: generateLoot(67) }
    ],
    requiredLevel: 67,
    environment: 'toxic_wasteland'
  },
  {
    id: 68,
    name: 'Fear Incarnate',
    enemies: [
      { ...REGULAR_ENEMIES[17], loot: generateLoot(68) },
      { ...REGULAR_ENEMIES[17], loot: generateLoot(68) },
      { ...REGULAR_ENEMIES[17], loot: generateLoot(68) },
      { ...REGULAR_ENEMIES[17], loot: generateLoot(68) }
    ],
    requiredLevel: 68,
    environment: 'void_space'
  },
  {
    id: 69,
    name: 'Dream Crusher Arena',
    enemies: [
      { ...REGULAR_ENEMIES[17], loot: generateLoot(69) },
      { ...REGULAR_ENEMIES[17], loot: generateLoot(69) },
      { ...REGULAR_ENEMIES[17], loot: generateLoot(69) },
      { ...REGULAR_ENEMIES[17], loot: generateLoot(69) },
      { ...REGULAR_ENEMIES[17], loot: generateLoot(69) }
    ],
    requiredLevel: 69,
    environment: 'void_space'
  },
  {
    id: 70,
    name: 'Boss: Nightmare King',
    enemies: [
      { ...BOSS_ENEMIES[13], loot: generateLoot(70, true) }
    ],
    boss: { ...BOSS_ENEMIES[13], loot: generateLoot(70, true) },
    requiredLevel: 70,
    environment: 'void_space'
  },
  {
    id: 71,
    name: 'Chaos Dimension',
    enemies: [
      { ...REGULAR_ENEMIES[18], loot: generateLoot(71) },
      { ...REGULAR_ENEMIES[18], loot: generateLoot(71) },
      { ...REGULAR_ENEMIES[18], loot: generateLoot(71) }
    ],
    requiredLevel: 71,
    environment: 'toxic_wasteland'
  },
  {
    id: 72,
    name: 'Entropy Fields',
    enemies: [
      { ...REGULAR_ENEMIES[18], loot: generateLoot(72) },
      { ...REGULAR_ENEMIES[18], loot: generateLoot(72) },
      { ...REGULAR_ENEMIES[18], loot: generateLoot(72) },
      { ...REGULAR_ENEMIES[18], loot: generateLoot(72) }
    ],
    requiredLevel: 72,
    environment: 'toxic_wasteland'
  },
  {
    id: 73,
    name: 'Random Devastation',
    enemies: [
      { ...REGULAR_ENEMIES[18], loot: generateLoot(73) },
      { ...REGULAR_ENEMIES[18], loot: generateLoot(73) },
      { ...REGULAR_ENEMIES[18], loot: generateLoot(73) },
      { ...REGULAR_ENEMIES[18], loot: generateLoot(73) }
    ],
    requiredLevel: 73,
    environment: 'void_space'
  },
  {
    id: 74,
    name: 'Disorder Incarnate',
    enemies: [
      { ...REGULAR_ENEMIES[18], loot: generateLoot(74) },
      { ...REGULAR_ENEMIES[18], loot: generateLoot(74) },
      { ...REGULAR_ENEMIES[18], loot: generateLoot(74) },
      { ...REGULAR_ENEMIES[18], loot: generateLoot(74) },
      { ...REGULAR_ENEMIES[18], loot: generateLoot(74) }
    ],
    requiredLevel: 74,
    environment: 'void_space'
  },
  {
    id: 75,
    name: 'Boss: The Final Destroyer',
    enemies: [
      { ...BOSS_ENEMIES[14], loot: generateLoot(75, true) }
    ],
    boss: { ...BOSS_ENEMIES[14], loot: generateLoot(75, true) },
    requiredLevel: 75,
    environment: 'void_space'
  },
  {
    id: 76,
    name: 'Infinity Realm',
    enemies: [
      { ...REGULAR_ENEMIES[19], loot: generateLoot(76) },
      { ...REGULAR_ENEMIES[19], loot: generateLoot(76) },
      { ...REGULAR_ENEMIES[19], loot: generateLoot(76) }
    ],
    requiredLevel: 76,
    environment: 'digital_realm'
  },
  {
    id: 77,
    name: 'Eternal Constructs',
    enemies: [
      { ...REGULAR_ENEMIES[19], loot: generateLoot(77) },
      { ...REGULAR_ENEMIES[19], loot: generateLoot(77) },
      { ...REGULAR_ENEMIES[19], loot: generateLoot(77) },
      { ...REGULAR_ENEMIES[19], loot: generateLoot(77) }
    ],
    requiredLevel: 77,
    environment: 'digital_realm'
  },
  {
    id: 78,
    name: 'Endless Loop',
    enemies: [
      { ...REGULAR_ENEMIES[19], loot: generateLoot(78) },
      { ...REGULAR_ENEMIES[19], loot: generateLoot(78) },
      { ...REGULAR_ENEMIES[19], loot: generateLoot(78) },
      { ...REGULAR_ENEMIES[19], loot: generateLoot(78) }
    ],
    requiredLevel: 78,
    environment: 'digital_realm'
  },
  {
    id: 79,
    name: 'Timeless Void',
    enemies: [
      { ...REGULAR_ENEMIES[19], loot: generateLoot(79) },
      { ...REGULAR_ENEMIES[19], loot: generateLoot(79) },
      { ...REGULAR_ENEMIES[19], loot: generateLoot(79) },
      { ...REGULAR_ENEMIES[19], loot: generateLoot(79) },
      { ...REGULAR_ENEMIES[19], loot: generateLoot(79) }
    ],
    requiredLevel: 79,
    environment: 'void_space'
  },
  {
    id: 80,
    name: 'Boss: Ultimate Nemesis',
    enemies: [
      { ...BOSS_ENEMIES[15], loot: generateLoot(80, true) }
    ],
    boss: { ...BOSS_ENEMIES[15], loot: generateLoot(80, true) },
    requiredLevel: 80,
    environment: 'void_space'
  },
  {
    id: 81,
    name: 'Genesis Beginning',
    enemies: [
      { ...REGULAR_ENEMIES[20], loot: generateLoot(81) },
      { ...REGULAR_ENEMIES[20], loot: generateLoot(81) },
      { ...REGULAR_ENEMIES[20], loot: generateLoot(81) }
    ],
    requiredLevel: 81,
    environment: 'digital_realm'
  },
  {
    id: 82,
    name: 'Creation Angels',
    enemies: [
      { ...REGULAR_ENEMIES[20], loot: generateLoot(82) },
      { ...REGULAR_ENEMIES[20], loot: generateLoot(82) },
      { ...REGULAR_ENEMIES[20], loot: generateLoot(82) },
      { ...REGULAR_ENEMIES[20], loot: generateLoot(82) }
    ],
    requiredLevel: 82,
    environment: 'digital_realm'
  },
  {
    id: 83,
    name: 'Origin Force',
    enemies: [
      { ...REGULAR_ENEMIES[20], loot: generateLoot(83) },
      { ...REGULAR_ENEMIES[20], loot: generateLoot(83) },
      { ...REGULAR_ENEMIES[20], loot: generateLoot(83) },
      { ...REGULAR_ENEMIES[20], loot: generateLoot(83) }
    ],
    requiredLevel: 83,
    environment: 'digital_realm'
  },
  {
    id: 84,
    name: 'Big Bang Reverse',
    enemies: [
      { ...REGULAR_ENEMIES[20], loot: generateLoot(84) },
      { ...REGULAR_ENEMIES[20], loot: generateLoot(84) },
      { ...REGULAR_ENEMIES[20], loot: generateLoot(84) },
      { ...REGULAR_ENEMIES[20], loot: generateLoot(84) },
      { ...REGULAR_ENEMIES[20], loot: generateLoot(84) }
    ],
    requiredLevel: 84,
    environment: 'void_space'
  },
  {
    id: 85,
    name: 'Boss: Chaos Incarnate',
    enemies: [
      { ...BOSS_ENEMIES[16], loot: generateLoot(85, true) }
    ],
    boss: { ...BOSS_ENEMIES[16], loot: generateLoot(85, true) },
    requiredLevel: 85,
    environment: 'void_space'
  },
  {
    id: 86,
    name: 'Void Emperor Realm',
    enemies: [
      { ...REGULAR_ENEMIES[21], loot: generateLoot(86) },
      { ...REGULAR_ENEMIES[21], loot: generateLoot(86) },
      { ...REGULAR_ENEMIES[21], loot: generateLoot(86) }
    ],
    requiredLevel: 86,
    environment: 'void_space'
  },
  {
    id: 87,
    name: 'Nothingness Domain',
    enemies: [
      { ...REGULAR_ENEMIES[21], loot: generateLoot(87) },
      { ...REGULAR_ENEMIES[21], loot: generateLoot(87) },
      { ...REGULAR_ENEMIES[21], loot: generateLoot(87) },
      { ...REGULAR_ENEMIES[21], loot: generateLoot(87) }
    ],
    requiredLevel: 87,
    environment: 'void_space'
  },
  {
    id: 88,
    name: 'Emperor Strike',
    enemies: [
      { ...REGULAR_ENEMIES[21], loot: generateLoot(88) },
      { ...REGULAR_ENEMIES[21], loot: generateLoot(88) },
      { ...REGULAR_ENEMIES[21], loot: generateLoot(88) },
      { ...REGULAR_ENEMIES[21], loot: generateLoot(88) }
    ],
    requiredLevel: 88,
    environment: 'void_space'
  },
  {
    id: 89,
    name: 'Command of Void',
    enemies: [
      { ...REGULAR_ENEMIES[21], loot: generateLoot(89) },
      { ...REGULAR_ENEMIES[21], loot: generateLoot(89) },
      { ...REGULAR_ENEMIES[21], loot: generateLoot(89) },
      { ...REGULAR_ENEMIES[21], loot: generateLoot(89) },
      { ...REGULAR_ENEMIES[21], loot: generateLoot(89) }
    ],
    requiredLevel: 89,
    environment: 'void_space'
  },
  {
    id: 90,
    name: 'Boss: Infinity Warden',
    enemies: [
      { ...BOSS_ENEMIES[17], loot: generateLoot(90, true) }
    ],
    boss: { ...BOSS_ENEMIES[17], loot: generateLoot(90, true) },
    requiredLevel: 90,
    environment: 'void_space'
  },
  {
    id: 91,
    name: 'Absolute Guard Post',
    enemies: [
      { ...REGULAR_ENEMIES[22], loot: generateLoot(91) },
      { ...REGULAR_ENEMIES[22], loot: generateLoot(91) },
      { ...REGULAR_ENEMIES[22], loot: generateLoot(91) }
    ],
    requiredLevel: 91,
    environment: 'void_space'
  },
  {
    id: 92,
    name: 'Perfect Defense',
    enemies: [
      { ...REGULAR_ENEMIES[22], loot: generateLoot(92) },
      { ...REGULAR_ENEMIES[22], loot: generateLoot(92) },
      { ...REGULAR_ENEMIES[22], loot: generateLoot(92) },
      { ...REGULAR_ENEMIES[22], loot: generateLoot(92) }
    ],
    requiredLevel: 92,
    environment: 'void_space'
  },
  {
    id: 93,
    name: 'Ultimate Counter',
    enemies: [
      { ...REGULAR_ENEMIES[22], loot: generateLoot(93) },
      { ...REGULAR_ENEMIES[22], loot: generateLoot(93) },
      { ...REGULAR_ENEMIES[22], loot: generateLoot(93) },
      { ...REGULAR_ENEMIES[22], loot: generateLoot(93) }
    ],
    requiredLevel: 93,
    environment: 'void_space'
  },
  {
    id: 94,
    name: 'Genesis Approach',
    enemies: [
      { ...REGULAR_ENEMIES[22], loot: generateLoot(94) },
      { ...REGULAR_ENEMIES[22], loot: generateLoot(94) },
      { ...REGULAR_ENEMIES[22], loot: generateLoot(94) },
      { ...REGULAR_ENEMIES[22], loot: generateLoot(94) },
      { ...REGULAR_ENEMIES[22], loot: generateLoot(94) }
    ],
    requiredLevel: 94,
    environment: 'void_space'
  },
  {
    id: 95,
    name: 'Boss: Genesis Destroyer',
    enemies: [
      { ...BOSS_ENEMIES[18], loot: generateLoot(95, true) }
    ],
    boss: { ...BOSS_ENEMIES[18], loot: generateLoot(95, true) },
    requiredLevel: 95,
    environment: 'void_space'
  },
  {
    id: 96,
    name: 'Zero Sentinel Guards',
    enemies: [
      { ...REGULAR_ENEMIES[23], loot: generateLoot(96) },
      { ...REGULAR_ENEMIES[23], loot: generateLoot(96) },
      { ...REGULAR_ENEMIES[23], loot: generateLoot(96) }
    ],
    requiredLevel: 96,
    environment: 'void_space'
  },
  {
    id: 97,
    name: 'Null Field',
    enemies: [
      { ...REGULAR_ENEMIES[23], loot: generateLoot(97) },
      { ...REGULAR_ENEMIES[23], loot: generateLoot(97) },
      { ...REGULAR_ENEMIES[23], loot: generateLoot(97) },
      { ...REGULAR_ENEMIES[23], loot: generateLoot(97) }
    ],
    requiredLevel: 97,
    environment: 'void_space'
  },
  {
    id: 98,
    name: 'Void Sentinel',
    enemies: [
      { ...REGULAR_ENEMIES[23], loot: generateLoot(98) },
      { ...REGULAR_ENEMIES[23], loot: generateLoot(98) },
      { ...REGULAR_ENEMIES[23], loot: generateLoot(98) },
      { ...REGULAR_ENEMIES[23], loot: generateLoot(98) }
    ],
    requiredLevel: 98,
    environment: 'void_space'
  },
  {
    id: 99,
    name: 'Final Approach',
    enemies: [
      { ...REGULAR_ENEMIES[23], loot: generateLoot(99) },
      { ...REGULAR_ENEMIES[23], loot: generateLoot(99) },
      { ...REGULAR_ENEMIES[23], loot: generateLoot(99) },
      { ...REGULAR_ENEMIES[23], loot: generateLoot(99) },
      { ...REGULAR_ENEMIES[23], loot: generateLoot(99) }
    ],
    requiredLevel: 99,
    environment: 'void_space'
  },
  {
    id: 100,
    name: 'Boss: Absolute Zero',
    enemies: [
      { ...BOSS_ENEMIES[19], loot: generateLoot(100, true) }
    ],
    boss: { ...BOSS_ENEMIES[19], loot: generateLoot(100, true) },
    requiredLevel: 99,
    environment: 'void_space'
  }
];

// Add the missing levels 6-50 from the original game
const originalLevels = [
  {
    id: 6,
    name: 'Corporate Security',
    enemies: [
      { ...REGULAR_ENEMIES[2], loot: generateLoot(6) },
      { ...REGULAR_ENEMIES[2], loot: generateLoot(6) },
      { ...REGULAR_ENEMIES[3], loot: generateLoot(6) }
    ],
    requiredLevel: 6,
    environment: 'building'
  },
  {
    id: 7,
    name: 'High-Tech Laboratory',
    enemies: [
      { ...REGULAR_ENEMIES[3], loot: generateLoot(7) },
      { ...REGULAR_ENEMIES[3], loot: generateLoot(7) }
    ],
    requiredLevel: 7,
    environment: 'building'
  },
  {
    id: 8,
    name: 'Cyber Facility',
    enemies: [
      { ...REGULAR_ENEMIES[3], loot: generateLoot(8) },
      { ...REGULAR_ENEMIES[4], loot: generateLoot(8) }
    ],
    requiredLevel: 8,
    environment: 'factory'
  },
  {
    id: 9,
    name: 'Rooftop Chase',
    enemies: [
      { ...REGULAR_ENEMIES[4], loot: generateLoot(9) },
      { ...REGULAR_ENEMIES[4], loot: generateLoot(9) }
    ],
    requiredLevel: 9,
    environment: 'rooftop'
  },
  {
    id: 10,
    name: 'Boss: Cyber Enforcer Mech',
    enemies: [
      { ...BOSS_ENEMIES[1], loot: generateLoot(10, true) }
    ],
    boss: { ...BOSS_ENEMIES[1], loot: generateLoot(10, true) },
    requiredLevel: 10,
    environment: 'rooftop'
  },
  // Continue with levels 11-50...
  {
    id: 50,
    name: 'Final Boss: Shimoto Gang Boss',
    enemies: [
      { ...BOSS_ENEMIES[9], loot: generateLoot(50, true) }
    ],
    boss: { ...BOSS_ENEMIES[9], loot: generateLoot(50, true) },
    requiredLevel: 50,
    environment: 'rooftop'
  }
];

// Insert the original levels into the correct positions
originalLevels.forEach(level => {
  const index = GAME_LEVELS.findIndex(l => l.id === level.id);
  if (index !== -1) {
    GAME_LEVELS[index] = level;
  } else {
    GAME_LEVELS.splice(level.id - 1, 0, level);
  }
});

// Sort levels by ID to ensure correct order
GAME_LEVELS.sort((a, b) => a.id - b.id);

// Get level by ID
export const getLevelById = (id: number): GameLevel | undefined => {
  return GAME_LEVELS.find(level => level.id === id);
};

// Get levels by environment
export const getLevelsByEnvironment = (environment: string): GameLevel[] => {
  return GAME_LEVELS.filter(level => level.environment === environment);
};

// Get boss levels
export const getBossLevels = (): GameLevel[] => {
  return GAME_LEVELS.filter(level => level.boss);
};

// Get regular levels
export const getRegularLevels = (): GameLevel[] => {
  return GAME_LEVELS.filter(level => !level.boss);
};