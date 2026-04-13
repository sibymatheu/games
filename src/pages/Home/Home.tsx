import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiPlay } from "react-icons/hi";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handlePlayNow = () => {
    navigate("/play");
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Memory Match
          </span>
        </motion.h1>

        <motion.p
          className="text-lg text-text-muted mb-10 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Flip the cards and find all matching pairs. Challenge your memory and beat your best
          score!
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            onClick={handlePlayNow}
            className="flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-white bg-linear-to-r from-primary to-secondary hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/25 cursor-pointer"
          >
            <HiPlay className="text-2xl" />
            Play Now
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
};
