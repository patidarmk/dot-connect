export interface DotType {
  id: number;
  x: number;
  y: number;
}

export type GameState = "idle" | "playing" | "level-complete" | "game-over";