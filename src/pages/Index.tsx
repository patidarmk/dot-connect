import { useEffect } from "react";
import { GameBoard } from "@/components/game/GameBoard";
import { useDotConnect } from "@/hooks/useDotConnect";
import { useGameTimer } from "@/hooks/useGameTimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Clock, Gamepad2, Play, Repeat, Trophy } from "lucide-react";

const Index = () => {
  const {
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
  } = useDotConnect();

  const { time, start, stop, reset } = useGameTimer(
    currentLevelSettings.time,
    gameOver,
  );

  useEffect(() => {
    if (gameState === "playing") {
      reset(currentLevelSettings.time);
      start();
    } else {
      stop();
    }
  }, [gameState, start, stop, reset, currentLevelSettings.time]);

  const renderGameStateOverlay = () => {
    const backdropVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
    const modalVariants = {
      hidden: { scale: 0.8, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 260, damping: 20 },
      },
    };

    return (
      <AnimatePresence>
        {gameState !== "playing" && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
          >
            <motion.div variants={modalVariants} className="w-full max-w-md">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">
                    {gameState === "idle" && "Welcome to Dot Connect!"}
                    {gameState === "level-complete" && "Level Complete!"}
                    {gameState === "game-over" && "Game Over"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {gameState === "idle" && (
                    <p>Connect the dots in order before time runs out.</p>
                  )}
                  {gameState === "level-complete" && (
                    <div>
                      <Trophy className="mx-auto h-16 w-16 text-yellow-500" />
                      <p className="text-xl mt-2">You scored {score} points!</p>
                    </div>
                  )}
                  {gameState === "game-over" && (
                    <div>
                      <p className="text-xl">Your final score is</p>
                      <p className="text-5xl font-bold my-4">{score}</p>
                    </div>
                  )}
                  <div className="flex justify-center gap-4">
                    {gameState === "idle" && (
                      <Button size="lg" onClick={startGame}>
                        <Play className="mr-2 h-5 w-5" /> Start Game
                      </Button>
                    )}
                    {gameState === "level-complete" && (
                      <Button size="lg" onClick={nextLevel}>
                        Next Level
                      </Button>
                    )}
                    {gameState === "game-over" && (
                      <Button size="lg" onClick={startGame}>
                        <Repeat className="mr-2 h-5 w-5" /> Play Again
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{level}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{score}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{time}s</div>
          </CardContent>
        </Card>
      </div>
      <div className="relative">
        {renderGameStateOverlay()}
        <GameBoard
          dots={dots}
          connectedDots={connectedDots}
          nextDot={nextDot}
          lines={lines}
          onDotClick={handleDotClick}
        />
      </div>
    </div>
  );
};

export default Index;