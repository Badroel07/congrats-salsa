import { useState, useRef, useCallback, useEffect } from 'react';

interface UseMusicReturn {
  isPlaying: boolean;
  isLoaded: boolean;
  toggle: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export function useMusic(trackUrl: string, volume: number): UseMusicReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!trackUrl) return;

    const audio = new Audio(trackUrl);
    audio.volume = volume;
    audio.loop = true;
    audioRef.current = audio;

    const handleCanPlay = () => setIsLoaded(true);
    audio.addEventListener('canplaythrough', handleCanPlay);

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audioRef.current = null;
    };
  }, [trackUrl, volume]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked by browser - user needs to interact first
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  return { isPlaying, isLoaded, toggle, audioRef };
}
