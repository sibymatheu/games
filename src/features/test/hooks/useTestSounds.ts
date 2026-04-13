import { useCallback } from "react";
import { useSoundStore } from "/@/store/soundStore";
import { getAudioContext, createOscillator } from "/@/utils/audio";

export const useTestSounds = () => {
  const isMuted = useSoundStore((s) => s.isMuted);

  const playTestSound = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      createOscillator(ctx, 880, 0.1, "sine", 0.2);
      setTimeout(() => createOscillator(ctx, 1100, 0.1, "sine", 0.2), 120);
      setTimeout(() => createOscillator(ctx, 1320, 0.15, "sine", 0.25), 240);
    } catch {}
  }, [isMuted]);

  return { playTestSound };
};
