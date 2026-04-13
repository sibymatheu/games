import { describe, it, expect } from "vitest";
import { calculateGrid, GRID_COUNT } from "./gridUtils";

describe("GRID_COUNT", () => {
  it("should be an even number by default", () => {
    expect(GRID_COUNT % 2).toBe(0);
  });
});

describe("calculateGrid", () => {
  it("should return 4 cols and 4 rows for 16 cards", () => {
    expect(calculateGrid(16)).toEqual({ cols: 4, rows: 4 });
  });

  it("should return cols and rows that multiply to the card count", () => {
    const result = calculateGrid(12);
    expect(result.cols * result.rows).toBe(12);
  });

  it("should return a clean rectangle with no fractional rows", () => {
    const count = 20;
    const result = calculateGrid(count);
    expect(count % result.cols).toBe(0);
    expect(result.rows).toBe(count / result.cols);
  });

  it("should throw for an odd card count", () => {
    expect(() => calculateGrid(15)).toThrow("Total boxes must be even for memory game");
  });

  it("should throw for 1 card", () => {
    expect(() => calculateGrid(1)).toThrow("Total boxes must be even for memory game");
  });

  it("should return { cols: 2, rows: 1 } for 2 cards", () => {
    expect(calculateGrid(2)).toEqual({ cols: 1, rows: 2 });
  });
});
