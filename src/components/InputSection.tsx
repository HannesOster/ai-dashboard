import { useAppStore } from "../store/useAppStore";

const InputSection = () => {
  const { inputText, setInputText } = useAppStore();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">
        Input Text
      </label>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your text here..."
        className="w-full h-40 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
      />
    </div>
  );
};

export default InputSection;
