import { create } from "zustand";

export type FunctionType = "summarize" | "translate" | "rewrite";

interface AppState {
  inputText: string;
  outputText: string;
  selectedFunction: FunctionType;
  isLoading: boolean;
  error: string | null;
  setInputText: (text: string) => void;
  setOutputText: (text: string) => void;
  setSelectedFunction: (func: FunctionType) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  inputText: "",
  outputText: "",
  selectedFunction: "summarize",
  isLoading: false,
  error: null,
  setInputText: (text) => set({ inputText: text }),
  setOutputText: (text) => set({ outputText: text }),
  setSelectedFunction: (func) => set({ selectedFunction: func }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error: error }),
  reset: () => set({ inputText: "", outputText: "", error: null }),
}));
