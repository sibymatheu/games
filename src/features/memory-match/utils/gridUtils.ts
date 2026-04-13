import type { GridDimensions } from "/@/features/memory-match/types";

export const GRID_COUNT = 16;

export const calculateGrid = (count: number): GridDimensions => {
  if (count % 2 !== 0) {
    throw new Error("Total boxes must be even for memory game");
  }
  let cols = Math.floor(Math.sqrt(count));
  while (count % cols !== 0) {
    cols--;
  }
  const rows = count / cols;
  return { rows, cols };
};
