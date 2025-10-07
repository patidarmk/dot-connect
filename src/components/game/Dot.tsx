import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DotProps {
  id: number;
  x: number;
  y: number;
  isNext: boolean;
  isConnected: boolean;
  onClick: (id: number) => void;
}

export const Dot = ({ id, x, y, isNext, isConnected, onClick }: DotProps) => {
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.div
      variants={dotVariants}
      initial="hidden"
      animate="visible"
      style={{ left: `${x}px`, top: `${y}px` }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      onClick={() => onClick(id)}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg cursor-pointer transition-all duration-300 shadow-lg",
          "bg-white/80 backdrop-blur-sm border-2",
          isConnected
            ? "bg-indigo-500 border-indigo-600 text-white scale-90"
            : "border-gray-300 text-gray-600",
          isNext &&
            "border-purple-500 ring-4 ring-purple-500/50 scale-110 shadow-2xl",
        )}
      >
        {id}
      </div>
    </motion.div>
  );
};