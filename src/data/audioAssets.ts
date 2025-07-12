// Audio assets for the cyberpunk game
// These are synthetic audio URLs that would work with actual audio files

export const MUSIC_TRACKS = {
  lobby: 'https://www.soundjay.com/misc/beep-07a.wav', // Placeholder - would be cyberpunk ambient
  characterSelect: 'https://www.soundjay.com/misc/beep-07a.wav', // Placeholder - would be selection theme
  shop: 'https://www.soundjay.com/misc/beep-07a.wav', // Placeholder - would be shop theme
  inventory: 'https://www.soundjay.com/misc/beep-07a.wav', // Placeholder - would be inventory theme
  skillTree: 'https://www.soundjay.com/misc/beep-07a.wav', // Placeholder - would be skill theme
  levelSelect: 'https://www.soundjay.com/misc/beep-07a.wav', // Placeholder - would be level theme
  game: 'https://www.soundjay.com/misc/beep-07a.wav', // Placeholder - would be game music
  boss: 'https://www.soundjay.com/misc/beep-07a.wav', // Placeholder - would be boss music
};

export const SOUND_EFFECTS = {
  // UI Sounds
  click: 'https://www.soundjay.com/misc/beep-07a.wav',
  hover: 'https://www.soundjay.com/misc/beep-07a.wav',
  select: 'https://www.soundjay.com/misc/beep-07a.wav',
  confirm: 'https://www.soundjay.com/misc/beep-07a.wav',
  back: 'https://www.soundjay.com/misc/beep-07a.wav',
  
  // Game Sounds
  levelUp: 'https://www.soundjay.com/misc/beep-07a.wav',
  skillLearn: 'https://www.soundjay.com/misc/beep-07a.wav',
  itemEquip: 'https://www.soundjay.com/misc/beep-07a.wav',
  itemDrop: 'https://www.soundjay.com/misc/beep-07a.wav',
  purchase: 'https://www.soundjay.com/misc/beep-07a.wav',
  
  // Combat Sounds
  attack: 'https://www.soundjay.com/misc/beep-07a.wav',
  hit: 'https://www.soundjay.com/misc/beep-07a.wav',
  death: 'https://www.soundjay.com/misc/beep-07a.wav',
  victory: 'https://www.soundjay.com/misc/beep-07a.wav',
  
  // Ambient Sounds
  cyberpunkAmbient: 'https://www.soundjay.com/misc/beep-07a.wav',
  neonHum: 'https://www.soundjay.com/misc/beep-07a.wav',
  techNoise: 'https://www.soundjay.com/misc/beep-07a.wav',
};

// Create synthetic audio data URLs for immediate use
export const createSynthSound = (frequency: number, duration: number, type: 'sine' | 'square' | 'sawtooth' | 'triangle' = 'sine') => {
  const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration - 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
  
  return oscillator;
};

// Predefined synth sounds for immediate use
export const SYNTH_SOUNDS = {
  uiClick: () => createSynthSound(800, 0.1, 'square'),
  uiHover: () => createSynthSound(600, 0.05, 'sine'),
  uiSelect: () => createSynthSound(1000, 0.15, 'triangle'),
  uiConfirm: () => createSynthSound(1200, 0.2, 'sine'),
  uiBack: () => createSynthSound(400, 0.1, 'sawtooth'),
  levelUp: () => createSynthSound(523, 0.5, 'sine'), // C5 note
  skillLearn: () => createSynthSound(659, 0.3, 'triangle'), // E5 note
  itemEquip: () => createSynthSound(784, 0.2, 'square'), // G5 note
  purchase: () => createSynthSound(440, 0.3, 'sine'), // A4 note
};