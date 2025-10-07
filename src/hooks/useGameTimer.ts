import { useState, useEffect, useRef, useCallback } from "react";

export const useGameTimer = (
  initialTime: number,
  onTimeUp: () => void,
) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            stop();
            onTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, onTimeUp, stop]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const reset = useCallback(
    (newTime: number) => {
      stop();
      setTime(newTime);
    },
    [stop],
  );

  return { time, start, stop, reset, isRunning };
};