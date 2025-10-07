import { useState, useCallback, useMemo } from "react";
import { DotType, GameState } from "@/types";

const LEVEL_SETTINGS = [
  { dots: 5, time: 15 },
  { dots: 6, time: 20 },
  { dots: 7, time: 25 },
  { dots: 8, time: 30 },
  { dots: 10, time: 35 },
  { dots: 12, time: 40 },
];

const BOARD_WIDTH = 500;
const BOARD_HEIGHT = 500;
const MIN_DISTANCE = 60;

const generateDots = (count: number): DotType[] => {
  const dots: DotType[] = [];
  let attempts = 0;
  while (dots.length < count && attempts < 1000) {
    const newDot: DotType = {
      id: dots.length + 1,
      x: Math.floor(Math.random() * (BOARD_WIDTH - 80)) + 40,
      y: Math.floor(Math.random() * (BOARD_HEIGHT - 80)) + 40,
    };

    let isValid = true;
    for (const dot of dots) {
      const distance = Math.sqrt(
        (newDot.x - dot.x) ** 2 + (newDot.y - dot.y) ** 2,
      );
      if (distance < MIN_DISTANCE) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      dots.push(newDot);
    }
    attempts++;
  }
  return dots;
};

export const useDotConnect = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [dots, setDots] = useState<DotType[]>([]);
  const [connectedDots, setConnectedDots] = useState<number[]>([]);

  const currentLevelSettings = useMemo(() => {
    return LEVEL_SETTINGS[Math.min(level - 1, LEVEL_SETTINGS.length - 1)];
  }, [level]);

  const nextDot = useMemo(() => connectedDots.length + 1, [connectedDots]);

  const lines = useMemo(() => {
    const result: { from: DotType; to: DotType }[] = [];
    for (let i = 0; i < connectedDots.length - 1; i++) {
      const fromDot = dots.find((d) => d.id === connectedDots[i]);
      const toDot = dots.find((d) => d.id === connectedDots[i + 1]);
      if (fromDot && toDot) {
        result.push({ from: fromDot, to: toDot });
      }
    }
    return result;
  }, [connectedDots, dots]);

  const setupLevel = useCallback((levelNum: number) => {
    const settings =
      LEVEL_SETTINGS[Math.min(levelNum - 1, LEVEL_SETTINGS.length - 1)];
    setDots(generateDots(settings.dots));
    setConnectedDots([]);
  }, []);

  const startGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setupLevel(1);
    setGameState("playing");
  }, [setupLevel]);

  const handleDotClick = useCallback(
    (dotId: number) => {
      if (gameState !== "playing" || dotId !== nextDot) {
        return;
      }

      const newConnectedDots = [...connectedDots, dotId];
      setConnectedDots(newConnectedDots);
      setScore((s) => s + 10 * level);

      if (newConnectedDots.length === dots.length) {
        setGameState("level-complete");
      }
    },
    [gameState, nextDot, connectedDots, dots.length, level],
  );

  const nextLevel = useCallback(() => {
    const newLevel = level + 1;
    setLevel(newLevel);
    setupLevel(newLevel);
    setGameState("playing");
  }, [level, setupLevel]);

  const gameOver = useCallback(() => {
    setGameState("game-over");
  }, []);

  return {
    level,
    score,
    gameState,
    dots,
    connectedDots,
    nextDot,
    lines,
    currentLevelSettings,
    startGame,
    handleDotClick,
    nextLevel,
    gameOver,
  };
};