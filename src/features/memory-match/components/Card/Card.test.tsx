import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "./Card";
import type { Card as CardType } from "/@/features/memory-match/types";

const baseCard: CardType = {
  id: 0,
  symbol: "🎮",
  pairId: 0,
  isFlipped: false,
  isMatched: false,
};

describe("Card", () => {
  it("should render a card button", () => {
    render(<Card card={baseCard} onClick={vi.fn()} isDisabled={false} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call onClick when clicked and not disabled", () => {
    const onClick = vi.fn();
    render(<Card card={baseCard} onClick={onClick} isDisabled={false} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledWith(0);
  });

  it("should not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(<Card card={baseCard} onClick={onClick} isDisabled={true} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("should not call onClick when card is already flipped", () => {
    const onClick = vi.fn();
    const flippedCard = { ...baseCard, isFlipped: true };
    render(<Card card={flippedCard} onClick={onClick} isDisabled={false} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("should not call onClick when card is matched", () => {
    const onClick = vi.fn();
    const matchedCard = { ...baseCard, isMatched: true, isFlipped: true };
    render(<Card card={matchedCard} onClick={onClick} isDisabled={false} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("should show symbol when card is flipped", () => {
    const flippedCard = { ...baseCard, isFlipped: true };
    render(<Card card={flippedCard} onClick={vi.fn()} isDisabled={false} />);
    expect(screen.getByText("🎮")).toBeInTheDocument();
  });

  it("should show symbol when card is matched", () => {
    const matchedCard = { ...baseCard, isFlipped: true, isMatched: true };
    render(<Card card={matchedCard} onClick={vi.fn()} isDisabled={false} />);
    expect(screen.getByText("🎮")).toBeInTheDocument();
  });

  it("should call onClick when Enter key is pressed", () => {
    const onClick = vi.fn();
    render(<Card card={baseCard} onClick={onClick} isDisabled={false} />);
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
    expect(onClick).toHaveBeenCalledWith(0);
  });

  it("should have correct aria-label", () => {
    render(<Card card={baseCard} onClick={vi.fn()} isDisabled={false} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Card 1");
  });

  it("should have matched aria-label when matched", () => {
    const matchedCard = { ...baseCard, isMatched: true, isFlipped: true };
    render(<Card card={matchedCard} onClick={vi.fn()} isDisabled={false} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Card 1, matched");
  });
});
