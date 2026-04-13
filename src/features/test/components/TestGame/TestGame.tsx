import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { HiVolumeUp } from "react-icons/hi";
import { useTestSounds } from "/@/features/test/hooks/useTestSounds";

export const TestGame: React.FC = () => {
  const { playTestSound } = useTestSounds();

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 gap-8">
      <Helmet>
        <title>Test Game — Games</title>
        <meta name="description" content="A test game feature." />
      </Helmet>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-6xl mb-4">🔊</div>
        <h1 className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          Sound Test
        </h1>
        <p className="text-text-muted">Click the button to test game audio</p>
      </motion.div>

      <motion.button
        onClick={playTestSound}
        className="flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-white bg-linear-to-r from-primary to-secondary hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/25 cursor-pointer"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Play test sound"
      >
        <HiVolumeUp className="text-2xl" />
        Play Sound
      </motion.button>
    </main>
  );
};

export default TestGame;
