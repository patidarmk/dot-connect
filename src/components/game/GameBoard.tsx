import { DotType } from "@/types";
import { Dot } from "./Dot";
import { AnimatePresence, motion } from "framer-motion";

interface GameBoardProps {
  dots: DotType[];
  connectedDots: number[];
  nextDot: number;
  lines: { from: DotType; to: DotType }[];
  onDotClick: (id: number) => void;
}

export const GameBoard = ({
  dots,
  connectedDots,
  nextDot,
  lines,
  onDotClick,
}: GameBoardProps) => {
  return (
    <div className="relative w-[500px] h-[500px] bg-white/50 dark:bg-slate-800/50 rounded-2xl shadow-inner border border-gray-200 dark:border-slate-700 overflow-hidden">
      <svg className="absolute top-0 left-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <AnimatePresence>
          {lines.map((line, index) => (
            <motion.line
              key={index}
              x1={line.from.x}
              y1={line.from.y}
              x2={line.to.x}
              y2={line.to.y}
              stroke="rgba(99, 102, 241, 0.8)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </AnimatePresence>
      </svg>
      <AnimatePresence>
        {dots.map((dot) => (
          <Dot
            key={dot.id}
            id={dot.id}
            x={dot.x}
            y={dot.y}
            isNext={dot.id === nextDot}
            isConnected={connectedDots.includes(dot.id)}
            onClick={onDotClick}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};