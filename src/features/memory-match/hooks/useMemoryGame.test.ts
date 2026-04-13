import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMemoryGame } from "./useMemoryGame";
import { useMemoryGameStore } from "/@/features/memory-match/store/memoryGameStore";
import { useSoundStore } from "/@/store/soundStore";

beforeEach(() => {
  useMemoryGameStore.setState({
    cards: Array.from({ length: 16 }, (_, i) => ({
      id: i,
      symbol: i < 8 ? "🎮" : "🎯",
      pairId: i < 8 ? 0 : 1,
      isFlipped: false,
      isMatched: false,
    })),
    flippedCardIds: [],
    stats: { moves: 0, matches: 0, startTime: null, endTime: null },
    status: "idle",
    isLocked: false,
  });
  useSoundStore.setState({ isMuted: true });
});

describe("useMemoryGame", () => {
  it("should return cards, stats, status from the store", () => {
    const { result } = renderHook(() => useMemoryGame());
    expect(result.current.cards).toHaveLength(16);
    expect(result.current.stats.moves).toBe(0);
    expect(result.current.status).toBe("idle");
  });

  it("should call flipCard on handleCardFlip", () => {
    const flipCard = vi.spyOn(useMemoryGameStore.getState(), "flipCard");
    const { result } = renderHook(() => useMemoryGame());
    act(() => result.current.handleCardFlip(0));
    expect(flipCard).toHaveBeenCalledWith(0);
  });

  it("should not add matched card to flippedCardIds", () => {
    useMemoryGameStore.setState({
      cards: Array.from({ length: 16 }, (_, i) => ({
        id: i,
        symbol: "🎮",
        pairId: 0,
        isFlipped: true,
        isMatched: true,
      })),
      flippedCardIds: [],
      stats: { moves: 0, matches: 0, startTime: null, endTime: null },
      status: "idle",
      isLocked: false,
    });
    const { result } = renderHook(() => useMemoryGame());
    act(() => result.current.handleCardFlip(0));
    expect(useMemoryGameStore.getState().flippedCardIds).toHaveLength(0);
  });

  it("should return elapsedSeconds as 0 when game not started", () => {
    const { result } = renderHook(() => useMemoryGame());
    expect(result.current.elapsedSeconds).toBe(0);
  });

  it("should expose resetGame", () => {
    const { result } = renderHook(() => useMemoryGame());
    act(() => result.current.resetGame());
    expect(useMemoryGameStore.getState().status).toBe("idle");
  });
});
