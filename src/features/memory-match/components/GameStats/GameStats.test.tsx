import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GameStats } from "./GameStats";
import type { GameStats as GameStatsType } from "/@/features/memory-match/types";
import { GRID_COUNT } from "/@/features/memory-match/utils/gridUtils";

const stats: GameStatsType = {
  moves: 10,
  matches: 3,
  startTime: Date.now() - 30000,
  endTime: null,
};

describe("GameStats", () => {
  it("should display move count", () => {
    render(<GameStats stats={stats} elapsedSeconds={30} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should display matches out of total pairs", () => {
    render(<GameStats stats={stats} elapsedSeconds={30} />);
    expect(screen.getByText(`3/${GRID_COUNT / 2}`)).toBeInTheDocument();
  });

  it("should display formatted elapsed time in HH:MM:SS", () => {
    render(<GameStats stats={stats} elapsedSeconds={90} />);
    expect(screen.getByText("00:01:30")).toBeInTheDocument();
  });

  it("should display 00:00:00 when no time has elapsed", () => {
    render(<GameStats stats={{ ...stats, startTime: null }} elapsedSeconds={0} />);
    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });

  it("should format hours correctly", () => {
    render(<GameStats stats={stats} elapsedSeconds={3661} />);
    expect(screen.getByText("01:01:01")).toBeInTheDocument();
  });

  it("should render all three stat labels", () => {
    render(<GameStats stats={stats} elapsedSeconds={30} />);
    expect(screen.getByText("Moves")).toBeInTheDocument();
    expect(screen.getByText("Pairs")).toBeInTheDocument();
    expect(screen.getByText("Time")).toBeInTheDocument();
  });
});
