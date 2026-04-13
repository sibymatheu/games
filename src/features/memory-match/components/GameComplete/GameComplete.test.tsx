import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GameComplete } from "./GameComplete";
import type { GameStats } from "/@/features/memory-match/types";

const stats: GameStats = {
  moves: 20,
  matches: 8,
  startTime: Date.now() - 60000,
  endTime: Date.now(),
};

describe("GameComplete", () => {
  it("should render the win message", () => {
    render(<GameComplete stats={stats} elapsedSeconds={60} onRestart={vi.fn()} />);
    expect(screen.getByText("You Won!")).toBeInTheDocument();
  });

  it("should display move count", () => {
    render(<GameComplete stats={stats} elapsedSeconds={60} onRestart={vi.fn()} />);
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("should display formatted time in HH:MM:SS", () => {
    render(<GameComplete stats={stats} elapsedSeconds={65} onRestart={vi.fn()} />);
    expect(screen.getByText("00:01:05")).toBeInTheDocument();
  });

  it("should call onRestart when Play Again is clicked", () => {
    const onRestart = vi.fn();
    render(<GameComplete stats={stats} elapsedSeconds={60} onRestart={onRestart} />);
    fireEvent.click(screen.getByRole("button", { name: /play again/i }));
    expect(onRestart).toHaveBeenCalledOnce();
  });

  it("should render the celebration emoji", () => {
    render(<GameComplete stats={stats} elapsedSeconds={60} onRestart={vi.fn()} />);
    expect(screen.getByText("🎉")).toBeInTheDocument();
  });
});
