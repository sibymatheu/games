import { motion } from "framer-motion";
import type { Card as CardType } from "/@/features/memory-match/types";
import "/@/features/memory-match/styles/memory-match.css";

interface CardProps {
  card: CardType;
  onClick: (id: number) => void;
  isDisabled: boolean;
}

export const Card: React.FC<CardProps> = ({ card, onClick, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled && !card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <motion.div
      className={`card-scene w-full aspect-square ${card.isMatched ? "card-matched" : ""}`}
      onClick={handleClick}
      whileHover={!card.isFlipped && !card.isMatched && !isDisabled ? { scale: 1.04 } : {}}
      whileTap={!card.isFlipped && !card.isMatched && !isDisabled ? { scale: 0.97 } : {}}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      aria-label={`Card ${card.id + 1}${card.isMatched ? ", matched" : ""}`}
      role="button"
      tabIndex={isDisabled || card.isFlipped || card.isMatched ? -1 : 0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <div className={`card-inner ${card.isFlipped || card.isMatched ? "flipped" : ""}`}>
        <div className="card-face card-back">
          <span className="card-back-pattern">✦</span>
        </div>
        <div className="card-face card-front">
          {card.isMatched ? (
            <motion.span
              className="card-symbol"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {card.symbol}
            </motion.span>
          ) : (
            <span className="card-symbol">{card.symbol}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
