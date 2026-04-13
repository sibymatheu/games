import { Outlet } from "react-router-dom";
import { Header } from "/@/components/layout/Header";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-base">
      <Header />
      <Outlet />
    </div>
  );
};
