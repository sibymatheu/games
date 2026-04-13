import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TestGame } from "./TestGame";
import { useSoundStore } from "/@/store/soundStore";

const mockPlayTestSound = vi.fn();

vi.mock("/@/features/test/hooks/useTestSounds", () => ({
  useTestSounds: () => ({ playTestSound: mockPlayTestSound }),
}));

describe("TestGame", () => {
  it("should render the page title", () => {
    render(<TestGame />);
    expect(screen.getByText("Sound Test")).toBeInTheDocument();
  });

  it("should render the play sound button", () => {
    render(<TestGame />);
    expect(screen.getByRole("button", { name: /play test sound/i })).toBeInTheDocument();
  });

  it("should call playTestSound when button is clicked", () => {
    render(<TestGame />);
    fireEvent.click(screen.getByRole("button", { name: /play test sound/i }));
    expect(mockPlayTestSound).toHaveBeenCalledOnce();
  });

  it("should render description text", () => {
    render(<TestGame />);
    expect(screen.getByText(/test game audio/i)).toBeInTheDocument();
  });

  it("should still render when muted", () => {
    useSoundStore.setState({ isMuted: true });
    render(<TestGame />);
    expect(screen.getByRole("button", { name: /play test sound/i })).toBeInTheDocument();
  });
});
