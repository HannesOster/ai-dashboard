import { Sparkles, Loader2 } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { generateText } from "../services/huggingface";

const GenerateButton = () => {
  const {
    inputText,
    selectedFunction,
    isLoading,
    setIsLoading,
    setOutputText,
    setError,
  } = useAppStore();

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text first");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutputText("");

    try {
      const result = await generateText(inputText, selectedFunction);
      setOutputText(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={isLoading || !inputText.trim()}
      className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          Generating...
        </>
      ) : (
        <>
          <Sparkles size={20} />
          Generate
        </>
      )}
    </button>
  );
};

export default GenerateButton;
