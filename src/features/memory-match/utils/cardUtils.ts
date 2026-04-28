import type { Card } from "/@/features/memory-match/types";
import { GRID_COUNT } from "./gridUtils";
import { shuffleArray } from "/@/utils/shuffle";

const CARD_SYMBOLS = [
  "🎮",
  "🎯",
  "🎲",
  "🃏",
  "🎪",
  "🎨",
  "🎭",
  "🎬",
  "🚀",
  "🌟",
  "🔮",
  "🎸",
  "🦁",
  "🐬",
  "🦋",
  "🌈",
  "🍀",
  "🔥",
  "⚡",
  "🎵",
  "🏆",
  "💎",
  "🌸",
  "🦄",
  "🎃",
];

export const getSymbols = (count: number): string[] => {
  const pairsNeeded = count / 2;
  if (pairsNeeded > CARD_SYMBOLS.length) {
    throw new Error(
      `Not enough symbols for ${count} cards. Maximum supported: ${CARD_SYMBOLS.length * 2}`,
    );
  }
  return CARD_SYMBOLS.slice(0, pairsNeeded);
};

export const generateCards = (count: number = GRID_COUNT): Card[] => {
  const symbols = getSymbols(count);
  const pairs = [...symbols, ...symbols];
  const shuffled = shuffleArray(pairs);

  return shuffled.map((symbol, index) => ({
    id: index,
    symbol,
    pairId: symbols.indexOf(symbol),
    isFlipped: false,
    isMatched: false,
  }));
};

export const checkMatch = (card1: Card, card2: Card): boolean => {
  return card1.pairId === card2.pairId;
};
