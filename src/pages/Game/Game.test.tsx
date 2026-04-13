import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Game } from "./Game";

vi.mock("/@/features/memory-match/MemoryMatchGame", () => ({
  default: () => <div>MemoryMatch Game</div>,
}));

vi.mock("/@/features/test/components/TestGame/TestGame", () => ({
  default: () => <div>Test Game</div>,
}));

const renderGame = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/play" element={<Game />} />
        <Route path="/play/:gameId" element={<Game />} />
      </Routes>
    </MemoryRouter>,
  );

describe("Game", () => {
  it("should load memorymatch by default at /play", async () => {
    renderGame("/play");
    expect(await screen.findByText("MemoryMatch Game")).toBeInTheDocument();
  });

  it("should load memorymatch at /play/memorymatch", async () => {
    renderGame("/play/memorymatch");
    expect(await screen.findByText("MemoryMatch Game")).toBeInTheDocument();
  });

  it("should load test game at /play/test", async () => {
    renderGame("/play/test");
    expect(await screen.findByText("Test Game")).toBeInTheDocument();
  });

  it("should show not-found for unknown gameId", () => {
    renderGame("/play/unknown");
    expect(screen.getByText("Game not found")).toBeInTheDocument();
    expect(screen.getByText("unknown")).toBeInTheDocument();
  });
});
