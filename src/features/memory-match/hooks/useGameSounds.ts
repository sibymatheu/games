import { useCallback } from "react";
import { useSoundStore } from "/@/store/soundStore";
import { getAudioContext, createOscillator } from "/@/utils/audio";

export const useGameSounds = () => {
  const isMuted = useSoundStore((s) => s.isMuted);

  const playFlipSound = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      createOscillator(ctx, 440, 0.1, "sine", 0.15);
    } catch (e) {
      console.error(e);
    }
  }, [isMuted]);

  const playMatchSound = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      createOscillator(ctx, 523, 0.15, "sine", 0.3);
      setTimeout(() => createOscillator(ctx, 659, 0.15, "sine", 0.3), 150);
      setTimeout(() => createOscillator(ctx, 784, 0.2, "sine", 0.3), 300);
    } catch (e) {
      console.error(e);
    }
  }, [isMuted]);

  const playMismatchSound = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      createOscillator(ctx, 300, 0.1, "sawtooth", 0.2);
      setTimeout(() => createOscillator(ctx, 250, 0.15, "sawtooth", 0.2), 120);
    } catch (e) {
      console.error(e);
    }
  }, [isMuted]);

  const playWinSound = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const notes = [523, 659, 784, 1047];
      notes.forEach((note, i) => {
        setTimeout(() => createOscillator(ctx, note, 0.25, "sine", 0.35), i * 180);
      });
    } catch (e) {
      console.error(e);
    }
  }, [isMuted]);

  return { playFlipSound, playMatchSound, playMismatchSound, playWinSound };
};
