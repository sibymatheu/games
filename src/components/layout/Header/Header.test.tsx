import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";
import { useSoundStore } from "/@/store/soundStore";

const renderHeader = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );

describe("Header", () => {
  it("should render the brand name", () => {
    renderHeader();
    expect(screen.getByText("Games")).toBeInTheDocument();
  });

  it("should render the mute button", () => {
    renderHeader();
    expect(screen.getByRole("button", { name: /mute game sounds/i })).toBeInTheDocument();
  });

  it('should show "Mute" text when sound is on', () => {
    useSoundStore.setState({ isMuted: false });
    renderHeader();
    expect(screen.getByText("Mute")).toBeInTheDocument();
  });

  it('should show "Unmute" text when sound is muted', () => {
    useSoundStore.setState({ isMuted: true });
    renderHeader();
    expect(screen.getByText("Unmute")).toBeInTheDocument();
  });

  it("should toggle mute when button is clicked", () => {
    useSoundStore.setState({ isMuted: false });
    renderHeader();
    const button = screen.getByRole("button", { name: /mute game sounds/i });
    fireEvent.click(button);
    expect(useSoundStore.getState().isMuted).toBe(true);
  });

  it("should have a link to the home page", () => {
    renderHeader();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
