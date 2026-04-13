import { useCallback, useEffect, useState } from "react";
import { useMemoryGameStore } from "/@/features/memory-match/store/memoryGameStore";
import { useGameSounds } from "./useGameSounds";

export const useMemoryGame = () => {
  const { cards, flippedCardIds, stats, status, isLocked, flipCard, resetGame } =
    useMemoryGameStore();

  const { playFlipSound, playMatchSound, playMismatchSound, playWinSound } = useGameSounds();

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!stats.startTime || status === "idle") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setElapsedSeconds(0);
      return;
    }

    if (status === "complete" && stats.endTime) {
      setElapsedSeconds(Math.floor((stats.endTime - stats.startTime) / 1000));
      return;
    }

    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - stats.startTime!) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [stats.startTime, stats.endTime, status]);

  const handleCardFlip = useCallback(
    (cardId: number) => {
      const card = cards.find((c) => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched || isLocked || flippedCardIds.length >= 2)
        return;

      playFlipSound();

      const newFlipped = [...flippedCardIds, cardId];

      if (newFlipped.length === 2) {
        const [firstId] = newFlipped;
        const firstCard = cards.find((c) => c.id === firstId)!;
        const isMatch = firstCard.pairId === card.pairId;

        setTimeout(() => {
          if (isMatch) {
            const totalMatches = stats.matches + 1;
            const totalPairs = cards.length / 2;
            if (totalMatches === totalPairs) {
              playWinSound();
            } else {
              playMatchSound();
            }
          } else {
            playMismatchSound();
          }
        }, 200);
      }

      flipCard(cardId);
    },
    [
      cards,
      flippedCardIds,
      isLocked,
      stats.matches,
      flipCard,
      playFlipSound,
      playMatchSound,
      playMismatchSound,
      playWinSound,
    ],
  );

  return {
    cards,
    stats,
    status,
    isLocked,
    elapsedSeconds,
    handleCardFlip,
    resetGame,
  };
};
