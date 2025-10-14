import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-700 py-6 px-8">
      <div className="max-w-6xl mx-auto flex items-center gap-3">
        <Sparkles className="text-purple-400" size={32} />
        <div>
          <h1 className="text-3xl font-bold text-white">
            AI Content Assistant
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Powered by Hugging Face AI
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
