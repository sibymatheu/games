# Games

A game launcher built with React, TypeScript, and Vite.

---

## Setup and Run Instructions

### Prerequisites

- Node.js 
- npm 

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run tests

```bash
npm test           # watch mode
npm run test:run   # single run
npm run test:coverage  # with coverage report
```

---

## Overview

A lightweight game launcher that brings multiple games into one place. Start with the fun and engaging Memory Match game, with more games planned to be added over time for an expanding gaming experience.

---

## Key Decisions

### Feature-based folder structure

All game logic, components, hooks, store, types, and utilities for a feature live under `src/features/<feature-name>/`. This makes features self-contained and easy to reason about or delete independently.

```
src/
  features/
    memory-match/       # all Memory Match code
      components/
      hooks/
      store/
      types/
      utils/
  pages/               # route-level shell pages
  components/          # shared global components
  store/               # global state (mute only)
  utils/               # shared utilities (audio)
```

### Dynamic game registry with code splitting

`src/pages/Game/Game.tsx` maintains a `gameRegistry` that maps URL slugs to `React.lazy()` components. Routes `/play` and `/play/:gameId` both resolve through this registry, so adding a new game is one line:

```ts
const gameRegistry: Record<GameId, ReturnType<typeof lazy>> = {
  memorymatch: lazy(() => import("/@/features/memory-match/MemoryMatchGame")),
  test: lazy(() => import("/@/features/test/components/TestGame/TestGame")),
};
```

Each game's bundle is fetched only when first visited. A `<Suspense>` fallback shows a spinner during loading and an `ErrorBoundary` catches any runtime or lazy-load failures.



### Tailwind v4

Uses `@tailwindcss/vite` plugin with `@import "tailwindcss"` and an `@theme {}` block for design tokens (`--color-primary`, `--color-bg-base`, etc.). Key v4 differences applied: `bg-linear-to-r` instead of `bg-gradient-to-r`; no manual `* { padding: 0 }` reset (Tailwind Preflight handles it — a manual reset outside `@layer` would override utility classes).
