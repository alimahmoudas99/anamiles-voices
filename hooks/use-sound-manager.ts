import { Animal } from '@/types/animal';
import { AudioPlayer, createAudioPlayer } from 'expo-audio';
import { useCallback, useEffect, useRef } from 'react';

const safeRelease = (player: AudioPlayer | null) => {
  if (!player) return;
  try {
    player.pause();
  } catch {}
  try {
    // expo-audio: remove player resources
    (player as any).release?.();
  } catch {}
};

export const useSoundManager = () => {
  const currentPlayerRef = useRef<AudioPlayer | null>(null);

  useEffect(() => {
    return () => {
      safeRelease(currentPlayerRef.current);
      currentPlayerRef.current = null;
    };
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

  const stopSound = useCallback(async () => {
    safeRelease(currentPlayerRef.current);
    currentPlayerRef.current = null;
  }, []);

  return { playAnimalSound, stopSound };
};
