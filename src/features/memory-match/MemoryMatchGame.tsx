import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { HiRefresh } from "react-icons/hi";
import { GameBoard } from "/@/features/memory-match/components/GameBoard";
import { GameStats } from "/@/features/memory-match/components/GameStats";
import { GameComplete } from "/@/features/memory-match/components/GameComplete";
import { useMemoryGame } from "/@/features/memory-match/hooks/useMemoryGame";

export const MemoryMatchGame: React.FC = () => {
  const { cards, stats, status, isLocked, elapsedSeconds, handleCardFlip, resetGame } =
    useMemoryGame();

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-8 gap-6">
      <Helmet>
        <title>Memory Match — Games</title>
        <meta
          name="description"
          content="Flip cards and find all matching pairs. Test your memory!"
        />
      </Helmet>
      <motion.div
        className="w-full max-w-lg flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Memory Match
        </h1>

        <button
          onClick={resetGame}
          aria-label="Reset game"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all duration-200 text-sm font-medium text-text-muted cursor-pointer"
        >
          <HiRefresh className="text-base" />
          Reset
        </button>
      </motion.div>

      <GameStats stats={stats} elapsedSeconds={elapsedSeconds} />

      <GameBoard cards={cards} onCardClick={handleCardFlip} isLocked={isLocked} />

      {status === "complete" && (
        <GameComplete stats={stats} elapsedSeconds={elapsedSeconds} onRestart={resetGame} />
      )}
    </main>
  );
};

export default MemoryMatchGame;
