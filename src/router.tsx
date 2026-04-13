import { createBrowserRouter } from "react-router-dom";
import { App } from "/@/App";
import { Home } from "/@/pages/Home";
import { Game } from "/@/pages/Game";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "play",
        children: [
          {
            index: true,
            element: <Game />,
          },
          {
            path: ":gameId",
            element: <Game />,
          },
        ],
      },
    ],
  },
]);
