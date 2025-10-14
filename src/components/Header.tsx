import { Sparkles, Sun, Moon } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

const Header = () => {
  const { theme, setTheme } = useAppStore();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 py-6 px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Sparkles
            className="text-purple-600 dark:text-purple-400"
            size={32}
          />
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              AI Content Assistant
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Powered by Hugging Face AI
            </p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          <span className="text-sm font-medium">
            {theme === "dark" ? "Light" : "Dark"} mode
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
