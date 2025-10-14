import type { JSX } from "react";
import { useAppStore, type FunctionType } from "../store/useAppStore";
import { FileText, Languages, RefreshCw } from "lucide-react";

const functions: {
  value: FunctionType;
  label: string;
  icon: JSX.Element;
  description: string;
}[] = [
  {
    value: "summarize",
    label: "Text Summarizer",
    icon: <FileText size={20} />,
    description: "Condense text into key points",
  },
  {
    value: "translate",
    label: "Text Translator",
    icon: <Languages size={20} />,
    description: "Translate between English and German",
  },
  {
    value: "rewrite",
    label: "Rewriter / Paraphraser",
    icon: <RefreshCw size={20} />,
    description: "Rephrase text in a different way",
  },
];

const FunctionSelector = () => {
  const { selectedFunction, setSelectedFunction } = useAppStore();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">
        Select Function
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {functions.map((func) => (
          <button
            key={func.value}
            onClick={() => setSelectedFunction(func.value)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedFunction === func.value
                ? "border-purple-500 bg-purple-500/10"
                : "border-slate-700 bg-slate-800 hover:border-slate-600"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={
                  selectedFunction === func.value
                    ? "text-purple-400"
                    : "text-slate-400"
                }
              >
                {func.icon}
              </div>
              <span className="font-semibold text-slate-100">{func.label}</span>
            </div>
            <p className="text-sm text-slate-400">{func.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FunctionSelector;
