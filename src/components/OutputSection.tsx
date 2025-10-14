import { useAppStore } from "../store/useAppStore";
import { Copy, CheckCheck, AlertCircle } from "lucide-react";
import { useState } from "react";

const OutputSection = () => {
  const { outputText, error } = useAppStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-300">
          Output
        </label>
        {outputText && (
          <button
            onClick={handleCopy}
            className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            {copied ? (
              <>
                <CheckCheck size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-2 text-red-400">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="w-full min-h-40 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100">
        {outputText ? (
          <p className="whitespace-pre-wrap">{outputText}</p>
        ) : (
          <p className="text-slate-500 italic">
            Generated content will appear here...
          </p>
        )}
      </div>
    </div>
  );
};

export default OutputSection;
