import { useEffect, useRef, useState } from 'react';

export interface AudioOptions {
  volume?: number;
  loop?: boolean;
  autoplay?: boolean;
}

export const useAudio = (src: string, options: AudioOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;

    try {
      const audio = new Audio(src);
      audio.volume = options.volume ?? 0.5;
      audio.loop = options.loop ?? false;
      
      audio.addEventListener('loadeddata', () => {
        setIsLoaded(true);
        if (options.autoplay) {
          play();
        }
      });

      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audio.addEventListener('ended', () => setIsPlaying(false));
      audio.addEventListener('error', () => setError('Failed to load audio'));

      audioRef.current = audio;
    } catch {
      setError('Audio not supported');
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.remove();
      }
    };
  }, [src, options.volume, options.loop, options.autoplay]);

  const play = async () => {
    if (!audioRef.current || !isLoaded) return;
    
    try {
      await audioRef.current.play();
    } catch (err) {
      console.warn('Audio play failed:', err);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  return {
    play,
    pause,
    stop,
    setVolume,
    isPlaying,
    isLoaded,
    error
  };
};

// Hook for sound effects
export const useSoundEffect = (src: string, volume = 0.3) => {
  const { play } = useAudio(src, { volume, loop: false });
  return play;
};

// Hook for background music
export const useBackgroundMusic = (src: string, volume = 0.2) => {
  return useAudio(src, { volume, loop: true, autoplay: true });
};