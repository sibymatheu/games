export interface Card {
  id: number;
  symbol: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GridDimensions {
  cols: number;
  rows: number;
}

export interface GameStats {
  moves: number;
  matches: number;
  startTime: number | null;
  endTime: number | null;
}

export type GameStatus = "idle" | "playing" | "complete";
