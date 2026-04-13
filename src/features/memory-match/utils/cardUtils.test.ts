import { describe, it, expect, vi } from "vitest";
import { generateCards, shuffleArray, checkMatch, getSymbols } from "./cardUtils";

describe("getSymbols", () => {
  it("should return half the count as symbols", () => {
    const symbols = getSymbols(16);
    expect(symbols).toHaveLength(8);
  });

  it("should return unique symbols", () => {
    const symbols = getSymbols(16);
    const unique = new Set(symbols);
    expect(unique.size).toBe(symbols.length);
  });
});

describe("shuffleArray", () => {
  it("should return an array of the same length", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffleArray(arr)).toHaveLength(5);
  });

  it("should contain the same elements after shuffling", () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    expect(shuffled.sort()).toEqual([...arr].sort());
  });

  it("should not mutate the original array", () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];
    shuffleArray(arr);
    expect(arr).toEqual(original);
  });
});

describe("generateCards", () => {
  it("should generate the correct number of cards", () => {
    const cards = generateCards(16);
    expect(cards).toHaveLength(16);
  });

  it("should generate cards with unique ids", () => {
    const cards = generateCards(16);
    const ids = cards.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(16);
  });

  it("should generate exactly 8 pairs (symbols appearing twice)", () => {
    const cards = generateCards(16);
    const symbolCounts: Record<string, number> = {};
    cards.forEach((c) => {
      symbolCounts[c.symbol] = (symbolCounts[c.symbol] ?? 0) + 1;
    });
    Object.values(symbolCounts).forEach((count) => {
      expect(count).toBe(2);
    });
  });

  it("should generate cards with isFlipped false initially", () => {
    const cards = generateCards(16);
    cards.forEach((c) => expect(c.isFlipped).toBe(false));
  });

  it("should generate cards with isMatched false initially", () => {
    const cards = generateCards(16);
    cards.forEach((c) => expect(c.isMatched).toBe(false));
  });

  it("should use GRID_COUNT as default", () => {
    const cards = generateCards();
    expect(cards.length % 2).toBe(0);
  });

  it("should use Math.random for shuffling", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const cards = generateCards(16);
    expect(cards).toHaveLength(16);
    vi.restoreAllMocks();
  });
});

describe("checkMatch", () => {
  it("should return true when cards have the same pairId", () => {
    const card1 = { id: 0, symbol: "🎮", pairId: 0, isFlipped: true, isMatched: false };
    const card2 = { id: 8, symbol: "🎮", pairId: 0, isFlipped: true, isMatched: false };
    expect(checkMatch(card1, card2)).toBe(true);
  });

  it("should return false when cards have different pairIds", () => {
    const card1 = { id: 0, symbol: "🎮", pairId: 0, isFlipped: true, isMatched: false };
    const card2 = { id: 1, symbol: "🎯", pairId: 1, isFlipped: true, isMatched: false };
    expect(checkMatch(card1, card2)).toBe(false);
  });
});
