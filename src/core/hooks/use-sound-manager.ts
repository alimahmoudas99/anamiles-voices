import { Animal } from '@/src/types/animal';
import { createAudioPlayer } from 'expo-audio';
import { useCallback, useEffect, useRef } from 'react';

const safeRelease = (player: any) => {
  try {
    player?.release?.();
  } catch {}
};

export const useSoundManager = () => {
  const currentPlayerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      safeRelease(currentPlayerRef.current);
      currentPlayerRef.current = null;
    };
  }, []);

  const stopSound = useCallback(() => {
    safeRelease(currentPlayerRef.current);
    currentPlayerRef.current = null;
  }, []);

  const playAnimalSound = useCallback(async (animal: Animal) => {
    try {
      safeRelease(currentPlayerRef.current);
      currentPlayerRef.current = null;

      if (!animal.sound) {
        console.log(`[SoundManager] No sound for ${animal.id} yet`);
        return;
      }

      const player = createAudioPlayer(animal.sound);
      currentPlayerRef.current = player;
      player.play();
    } catch (err) {
      console.error(`[SoundManager] Failed to play ${animal.id}:`, err);
    }
  }, []);

  return { playAnimalSound, stopSound };
};
