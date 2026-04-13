import { motion } from "framer-motion";
import type { GameStats as GameStatsType } from "/@/features/memory-match/types";
import { GRID_COUNT } from "/@/features/memory-match/utils/gridUtils";

interface GameStatsProps {
  stats: GameStatsType;
  elapsedSeconds: number;
}

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

export const GameStats: React.FC<GameStatsProps> = ({ stats, elapsedSeconds }) => {
  const totalPairs = GRID_COUNT / 2;

  return (
    <motion.div
      className="flex items-center justify-center gap-6 flex-wrap"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center px-5 py-3 rounded-xl bg-white/5 border border-white/10 min-w-20">
        <span className="text-2xl font-bold text-primary">{stats.moves}</span>
        <span className="text-xs text-text-muted uppercase tracking-wider">Moves</span>
      </div>

      <div className="flex flex-col items-center px-5 py-3 rounded-xl bg-white/5 border border-white/10 min-w-20">
        <span className="text-2xl font-bold text-secondary">
          {stats.matches}/{totalPairs}
        </span>
        <span className="text-xs text-text-muted uppercase tracking-wider">Pairs</span>
      </div>

      <div className="flex flex-col items-center px-5 py-3 rounded-xl bg-white/5 border border-white/10 min-w-20">
        <span className="text-2xl font-bold text-text-base">{formatTime(elapsedSeconds)}</span>
        <span className="text-xs text-text-muted uppercase tracking-wider">Time</span>
      </div>
    </motion.div>
  );
};
