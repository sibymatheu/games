import { motion } from "framer-motion";
import { Card } from "/@/features/memory-match/components/Card";
import { calculateGrid, GRID_COUNT } from "/@/features/memory-match/utils/gridUtils";
import type { Card as CardType } from "/@/features/memory-match/types";

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (id: number) => void;
  isLocked: boolean;
}

const { cols } = calculateGrid(GRID_COUNT);

export const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, isLocked }) => {
  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div
        className="grid gap-3 p-4 rounded-2xl bg-white/3 border border-white/10"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        aria-label="Memory card game board"
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={onCardClick} isDisabled={isLocked} />
        ))}
      </div>
    </motion.div>
  );
};
