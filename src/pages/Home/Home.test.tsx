import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "./Home";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

describe("Home", () => {
  it("should render the game title", () => {
    renderHome();
    expect(screen.getByText("Memory Match")).toBeInTheDocument();
  });

  it("should render the Play Now button", () => {
    renderHome();
    expect(screen.getByRole("button", { name: /play now/i })).toBeInTheDocument();
  });

  it("should navigate to /play when Play Now is clicked", () => {
    renderHome();
    fireEvent.click(screen.getByRole("button", { name: /play now/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/play");
  });

  it("should render the game description", () => {
    renderHome();
    expect(screen.getByText(/find all matching pairs/i)).toBeInTheDocument();
  });
});
