import { requireNativeModule } from 'expo-modules-core';

// Patch Expo Go SDK 55 constructor mismatch
try {
  const AudioModule = requireNativeModule('ExpoAudio');
  if (AudioModule && AudioModule.AudioPlayer) {
    const OriginalAudioPlayer = AudioModule.AudioPlayer;
    const PatchedAudioPlayer = function (this: any, ...args: any[]) {
      // Slicing to 3 arguments because the native Expo Go client expects 3
      const slicedArgs = args.slice(0, 3);
      return new (OriginalAudioPlayer as any)(...slicedArgs);
    };
    PatchedAudioPlayer.prototype = OriginalAudioPlayer.prototype;
    Object.setPrototypeOf(PatchedAudioPlayer, OriginalAudioPlayer);
    AudioModule.AudioPlayer = PatchedAudioPlayer;
    console.log('[AudioPatch] Successfully patched AudioPlayer constructor for Expo Go.');
  }
} catch (e) {
  console.warn('[AudioPatch] Could not patch AudioPlayer:', e);
}

import { Animal } from '@/src/types/animal';
import { useAudioPlayer } from 'expo-audio';
import { useCallback, useRef } from 'react';

export const useSoundManager = () => {
  // Use a ref to track the current audio source for cleanup
  const currentAnimalRef = useRef<string | null>(null);

  // Create a player with a dummy/initial source (first playable animal or null)
  // We'll replace the source dynamically
  const player = useAudioPlayer();

  const stopSound = useCallback(() => {
    try {
      player.pause();
      player.seekTo(0);
      currentAnimalRef.current = null;
    } catch {}
  }, [player]);

  const playAnimalSound = useCallback(async (animal: Animal) => {
    try {
      if (!animal.sound) {
        console.log(`[SoundManager] No sound for ${animal.id} yet`);
        return;
      }

      // Stop current playback
      stopSound();

      // Replace the audio source and play
      player.replace(animal.sound);
      player.play();
      currentAnimalRef.current = animal.id;
    } catch (err) {
      console.error(`[SoundManager] Failed to play ${animal.id}:`, err);
    }
  }, [player, stopSound]);

  return { playAnimalSound, stopSound };
};
