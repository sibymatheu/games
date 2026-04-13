import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { GameBoard } from "./GameBoard";
import type { Card } from "/@/features/memory-match/types";

const makeCards = (count: number): Card[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    symbol: "🎮",
    pairId: Math.floor(i / 2),
    isFlipped: false,
    isMatched: false,
  }));

describe("GameBoard", () => {
  it("should render the correct number of cards", () => {
    const cards = makeCards(16);
    render(<GameBoard cards={cards} onCardClick={vi.fn()} isLocked={false} />);
    expect(screen.getAllByRole("button")).toHaveLength(16);
  });

  it("should have accessible aria-label", () => {
    const cards = makeCards(16);
    render(<GameBoard cards={cards} onCardClick={vi.fn()} isLocked={false} />);
    expect(screen.getByLabelText("Memory card game board")).toBeInTheDocument();
  });

  it("should pass isLocked to cards as disabled state", () => {
    const cards = makeCards(4);
    const onClick = vi.fn();
    render(<GameBoard cards={cards} onCardClick={onClick} isLocked={true} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => expect(btn).toHaveAttribute("tabIndex", "-1"));
  });
});
