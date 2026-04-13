import { motion } from "framer-motion";
import { HiRefresh } from "react-icons/hi";
import type { GameStats } from "/@/features/memory-match/types";

interface GameCompleteProps {
  stats: GameStats;
  elapsedSeconds: number;
  onRestart: () => void;
}

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

export const GameComplete: React.FC<GameCompleteProps> = ({ stats, elapsedSeconds, onRestart }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="relative mx-4 max-w-md w-full rounded-2xl border border-white/10 bg-bg-surface p-8 text-center shadow-2xl"
        initial={{ scale: 0.7, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.1 }}
      >
        <motion.div
          className="text-6xl mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.3,
          }}
        >
          🎉
        </motion.div>

        <h2 className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          You Won!
        </h2>

        <p className="text-text-muted mb-8">All pairs matched. Great memory!</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-3xl font-bold text-primary">{stats.moves}</div>
            <div className="text-xs text-text-muted uppercase tracking-wider mt-1">Moves</div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-3xl font-bold text-secondary">{formatTime(elapsedSeconds)}</div>
            <div className="text-xs text-text-muted uppercase tracking-wider mt-1">Time</div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-semibold text-white bg-linear-to-r from-primary to-secondary hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <HiRefresh className="text-xl" />
          Play Again
        </button>
      </motion.div>
    </motion.div>
  );
};
