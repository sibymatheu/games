import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ErrorBoundary } from "/@/components/ErrorBoundary/ErrorBoundary";

type GameId = "memorymatch" | "test";

const gameRegistry: Record<GameId, ReturnType<typeof lazy>> = {
  memorymatch: lazy(() => import("/@/features/memory-match/MemoryMatchGame")),
  test: lazy(() => import("/@/features/test/components/TestGame/TestGame")),
};

const isValidGame = (id: string): id is GameId => id in gameRegistry;

const GameLoader: React.FC = () => (
  <motion.div
    className="flex-1 flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <span className="text-text-muted text-sm">Loading game…</span>
    </div>
  </motion.div>
);

const NotFound: React.FC<{ gameId: string }> = ({ gameId }) => (
  <main className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
    <Helmet>
      <title>Game Not Found — Games</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <div className="text-5xl">🎮</div>
    <h1 className="text-2xl font-bold text-text-base">Game not found</h1>
    <p className="text-text-muted">
      No game registered for <span className="text-primary font-mono">{gameId}</span>
    </p>
  </main>
);

export const Game: React.FC = () => {
  const { gameId = "memorymatch" } = useParams<{ gameId?: string }>();

  if (!isValidGame(gameId)) {
    return <NotFound gameId={gameId} />;
  }

  const GameComponent = gameRegistry[gameId];

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<GameLoader />}>
          <GameComponent />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
