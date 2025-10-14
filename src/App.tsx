import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { useEffect } from "react";
import { useAppStore } from "./store/useAppStore";

function App() {
  const { theme } = useAppStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
