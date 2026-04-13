import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useGameSounds } from "./useGameSounds";
import { useSoundStore } from "/@/store/soundStore";

beforeEach(() => {
  useSoundStore.setState({ isMuted: false });
});

describe("useGameSounds", () => {
  it("should return all four sound functions", () => {
    const { result } = renderHook(() => useGameSounds());
    expect(typeof result.current.playFlipSound).toBe("function");
    expect(typeof result.current.playMatchSound).toBe("function");
    expect(typeof result.current.playMismatchSound).toBe("function");
    expect(typeof result.current.playWinSound).toBe("function");
  });

  it("should not throw when called with mute off", () => {
    const { result } = renderHook(() => useGameSounds());
    expect(() => result.current.playFlipSound()).not.toThrow();
    expect(() => result.current.playMatchSound()).not.toThrow();
    expect(() => result.current.playMismatchSound()).not.toThrow();
    expect(() => result.current.playWinSound()).not.toThrow();
  });

  it("should not throw when called with mute on", () => {
    useSoundStore.setState({ isMuted: true });
    const { result } = renderHook(() => useGameSounds());
    expect(() => result.current.playFlipSound()).not.toThrow();
    expect(() => result.current.playMatchSound()).not.toThrow();
    expect(() => result.current.playMismatchSound()).not.toThrow();
    expect(() => result.current.playWinSound()).not.toThrow();
  });

  it("should skip audio when muted", () => {
    useSoundStore.setState({ isMuted: true });
    const mockCreate = vi.fn();
    globalThis.AudioContext = vi.fn(() => ({ createOscillator: mockCreate })) as never;
    const { result } = renderHook(() => useGameSounds());
    result.current.playFlipSound();
    expect(mockCreate).not.toHaveBeenCalled();
    delete (globalThis as Record<string, unknown>).AudioContext;
  });

  it("should react to mute state changes", () => {
    const mockCreate = vi.fn();
    globalThis.AudioContext = vi.fn(() => ({ createOscillator: mockCreate })) as never;
    const { result, rerender } = renderHook(() => useGameSounds());
    useSoundStore.setState({ isMuted: true });
    rerender();
    result.current.playFlipSound();
    expect(mockCreate).not.toHaveBeenCalled();
    delete (globalThis as Record<string, unknown>).AudioContext;
  });
});
