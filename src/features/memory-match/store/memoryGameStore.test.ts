import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { useMemoryGameStore } from "./memoryGameStore";

beforeEach(() => {
  useMemoryGameStore.setState({
    cards: [
      { id: 0, symbol: "🎮", pairId: 0, isFlipped: false, isMatched: false },
      { id: 1, symbol: "🎯", pairId: 1, isFlipped: false, isMatched: false },
      { id: 2, symbol: "🎮", pairId: 0, isFlipped: false, isMatched: false },
      { id: 3, symbol: "🎯", pairId: 1, isFlipped: false, isMatched: false },
    ],
    flippedCardIds: [],
    stats: { moves: 0, matches: 0, startTime: null, endTime: null },
    status: "idle",
    isLocked: false,
  });
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useMemoryGameStore - flipCard", () => {
  it("should flip a card and update flippedCardIds", () => {
    useMemoryGameStore.getState().flipCard(0);
    const { cards, flippedCardIds, status } = useMemoryGameStore.getState();
    expect(cards[0].isFlipped).toBe(true);
    expect(flippedCardIds).toContain(0);
    expect(status).toBe("playing");
  });

  it("should not flip an already flipped card", () => {
    useMemoryGameStore.setState({
      cards: [
        { id: 0, symbol: "🎮", pairId: 0, isFlipped: true, isMatched: false },
        { id: 1, symbol: "🎯", pairId: 1, isFlipped: false, isMatched: false },
        { id: 2, symbol: "🎮", pairId: 0, isFlipped: false, isMatched: false },
        { id: 3, symbol: "🎯", pairId: 1, isFlipped: false, isMatched: false },
      ],
      flippedCardIds: [0],
    });
    useMemoryGameStore.getState().flipCard(0);
    expect(useMemoryGameStore.getState().flippedCardIds).toHaveLength(1);
  });

  it("should not flip a matched card", () => {
    useMemoryGameStore.setState({
      cards: [
        { id: 0, symbol: "🎮", pairId: 0, isFlipped: true, isMatched: true },
        { id: 1, symbol: "🎯", pairId: 1, isFlipped: false, isMatched: false },
        { id: 2, symbol: "🎮", pairId: 0, isFlipped: false, isMatched: false },
        { id: 3, symbol: "🎯", pairId: 1, isFlipped: false, isMatched: false },
      ],
      flippedCardIds: [],
    });
    useMemoryGameStore.getState().flipCard(0);
    expect(useMemoryGameStore.getState().flippedCardIds).toHaveLength(0);
  });

  it("should not flip when isLocked is true", () => {
    useMemoryGameStore.setState({ isLocked: true });
    useMemoryGameStore.getState().flipCard(0);
    expect(useMemoryGameStore.getState().flippedCardIds).toHaveLength(0);
  });

  it("should lock the board when two cards are flipped", () => {
    vi.useFakeTimers();
    useMemoryGameStore.getState().flipCard(0);
    useMemoryGameStore.getState().flipCard(1);
    expect(useMemoryGameStore.getState().isLocked).toBe(true);
    vi.runAllTimers();
  });

  it("should match cards with the same pairId and increment matches", () => {
    vi.useFakeTimers();
    useMemoryGameStore.getState().flipCard(0);
    useMemoryGameStore.getState().flipCard(2);
    vi.runAllTimers();
    const { cards, stats } = useMemoryGameStore.getState();
    expect(cards[0].isMatched).toBe(true);
    expect(cards[2].isMatched).toBe(true);
    expect(stats.matches).toBe(1);
  });

  it("should unflip non-matching cards after timeout", () => {
    vi.useFakeTimers();
    useMemoryGameStore.getState().flipCard(0);
    useMemoryGameStore.getState().flipCard(1);
    vi.runAllTimers();
    const { cards } = useMemoryGameStore.getState();
    expect(cards[0].isFlipped).toBe(false);
    expect(cards[1].isFlipped).toBe(false);
  });

  it("should increment moves on second card flip", () => {
    vi.useFakeTimers();
    useMemoryGameStore.getState().flipCard(0);
    useMemoryGameStore.getState().flipCard(1);
    expect(useMemoryGameStore.getState().stats.moves).toBe(1);
    vi.runAllTimers();
  });
});

describe("useMemoryGameStore - resetGame", () => {
  it("should reset all state to initial values", () => {
    vi.useFakeTimers();
    useMemoryGameStore.getState().flipCard(0);
    useMemoryGameStore.getState().flipCard(2);
    vi.runAllTimers();
    useMemoryGameStore.getState().resetGame();
    const { stats, status, flippedCardIds, isLocked } = useMemoryGameStore.getState();
    expect(stats.moves).toBe(0);
    expect(stats.matches).toBe(0);
    expect(status).toBe("idle");
    expect(flippedCardIds).toHaveLength(0);
    expect(isLocked).toBe(false);
  });

  it("should generate fresh cards on reset", () => {
    const cardsBefore = useMemoryGameStore.getState().cards.map((c) => c.id);
    useMemoryGameStore.getState().resetGame();
    const cardsAfter = useMemoryGameStore.getState().cards;
    expect(cardsAfter.length).toBeGreaterThan(0);
    expect(cardsAfter.every((c) => !c.isFlipped && !c.isMatched)).toBe(true);
    expect(cardsBefore).not.toBe(cardsAfter);
  });
});
