import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Card, GameStats, GameStatus } from "/@/features/memory-match/types";
import { generateCards } from "/@/features/memory-match/utils/cardUtils";
import { GRID_COUNT } from "/@/features/memory-match/utils/gridUtils";

interface MemoryGameState {
  cards: Card[];
  flippedCardIds: number[];
  stats: GameStats;
  status: GameStatus;
  isLocked: boolean;
  flipCard: (cardId: number) => void;
  resetGame: () => void;
  setLocked: (locked: boolean) => void;
}

const initialStats: GameStats = {
  moves: 0,
  matches: 0,
  startTime: null,
  endTime: null,
  score: 0,
};

const MATCHING_SCORE = 10;
const MISMATCH_SCORE = -5;

export const useMemoryGameStore = create<MemoryGameState>()(
  devtools(
    (set, get) => ({
      cards: generateCards(GRID_COUNT),
      flippedCardIds: [],
      stats: { ...initialStats },
      status: "idle",
      isLocked: false,

      flipCard: (cardId: number) => {
        const { cards, flippedCardIds, stats, isLocked, status } = get();
        const card = cards.find((c) => c.id === cardId);

        if (!card || card.isFlipped || card.isMatched || isLocked || flippedCardIds.length >= 2)
          return;

        const newStartTime = status === "idle" ? Date.now() : stats.startTime;

        const updatedCards = cards.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c));

        const newFlipped = [...flippedCardIds, cardId];

        if (newFlipped.length === 2) {
          const [firstId, secondId] = newFlipped;
          const firstCard = updatedCards.find((c) => c.id === firstId)!;
          const secondCard = updatedCards.find((c) => c.id === secondId)!;
          const isMatch = firstCard.pairId === secondCard.pairId;
          const newMoves = stats.moves + 1;
          const newMatches = isMatch ? stats.matches + 1 : stats.matches;
          const totalPairs = GRID_COUNT / 2;
          const isComplete = newMatches === totalPairs;
          const score = stats.score + (isMatch ? MATCHING_SCORE : MISMATCH_SCORE);

          set({
            cards: updatedCards,
            flippedCardIds: newFlipped,
            stats: {
              ...stats,
              moves: newMoves,
              matches: newMatches,
              startTime: newStartTime,
              endTime: isComplete ? Date.now() : null,
              score,
            },
            status: isComplete ? "complete" : "playing",
            isLocked: true,
          });

          setTimeout(() => {
            set((state) => ({
              cards: state.cards.map((c) => {
                if (c.id === firstId || c.id === secondId) {
                  return isMatch ? { ...c, isMatched: true } : { ...c, isFlipped: false };
                }
                return c;
              }),
              flippedCardIds: [],
              isLocked: false,
            }));
          }, 800);
        } else {
          set({
            cards: updatedCards,
            flippedCardIds: newFlipped,
            status: "playing",
            stats: { ...stats, startTime: newStartTime },
          });
        }
      },

      resetGame: () => {
        set({
          cards: generateCards(GRID_COUNT),
          flippedCardIds: [],
          stats: { ...initialStats },
          status: "idle",
          isLocked: false,
        });
      },

      setLocked: (locked: boolean) => set({ isLocked: locked }),
    }),
    { name: "MemoryGameStore" },
  ),
);
