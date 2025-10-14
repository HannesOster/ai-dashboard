import { type FunctionType } from "../store/useAppStore";
import { HfInference } from "@huggingface/inference";

const API_URL =
  "https://api-inference.huggingface.co/models/google/flan-t5-small?wait_for_model=true";
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY || "";
// Create HF inference client (supports both InferenceClient and HfInference exports)
const hfClient = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY!);
// Typed response shapes (unions) for simple narrowing without helpers
type HFSummarization =
  | { summary_text: string }
  | { summary_text: string }[]
  | string;
type HFTranslation =
  | { translation_text: string }
  | { translation_text: string }[]
  | string;
type HFGeneratedArray = Array<{
  generated_text?: string;
  translation_text?: string;
}>;
type HFText2Text =
  | { generated_text: string }
  | { generated_text: string }[]
  | string;

const createPrompt = (text: string, functionType: FunctionType): string => {
  switch (functionType) {
    case "summarize":
      return `Summarize the following text: ${text}`;
    case "translate":
      return `Translate the following text to German if it's in English, or to English if it's in German: ${text}`;
    case "rewrite":
      return `Rewrite or paraphrase the following text: ${text}`;
    default:
      return text;
  }
};

export const generateText = async (
  inputText: string,
  functionType: FunctionType
): Promise<string> => {
  const prompt = createPrompt(inputText, functionType);

  // Check if API key is set
  if (!API_KEY || API_KEY.trim() === "") {
    throw new Error(
      "Hugging Face API Key is missing. Please add VITE_HUGGINGFACE_API_KEY to your .env file"
    );
  }

  try {
    // Use dedicated model via Inference Client for summarization
    if (functionType === "summarize") {
      const result = await hfClient.summarization({
        model: "facebook/bart-large-cnn",
        inputs: inputText,
        provider: "auto",
      });

      const r = result as HFSummarization;
      if (typeof r === "string") return r;
      if (Array.isArray(r)) return r.map((x) => x.summary_text).join("\n\n");
      return r.summary_text;
    }

    // Use dedicated model for German -> English translation
    if (functionType === "translate") {
      const result = await hfClient.translation({
        model: "Helsinki-NLP/opus-mt-de-en",
        inputs: inputText,
        provider: "hf-inference",
      });

      const tr = result as HFTranslation;
      if (typeof tr === "string") return tr;
      if (Array.isArray(tr))
        return tr.map((x) => x.translation_text).join("\n");
      return tr.translation_text;
    }

    // Use T5-small for paraphrasing (text-generation with paraphrase prompt)
    if (functionType === "rewrite") {
      const result = await hfClient.textGeneration({
        model: "google-t5/t5-small",
        inputs: `paraphrase: ${inputText}`,
        provider: "hf-inference",
      });

      const tt = result as HFText2Text;
      if (typeof tt === "string") return tt;
      if (Array.isArray(tt))
        return tt.map((x) => x.generated_text).join("\n\n");
      return tt.generated_text;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "x-wait-for-model": "true",
      },

      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);

      if (response.status === 401) {
        throw new Error(
          "Authentication failed. Please check your Hugging Face API key in the .env file. Make sure there are no quotes around the key."
        );
      }

      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = (await response.json()) as HFGeneratedArray | string;

    // Hugging Face API returns an array with generated or translation text
    if (Array.isArray(data)) {
      const first = data.find((i) => i.generated_text || i.translation_text);
      if (first) return first.generated_text ?? first.translation_text ?? "";
    }

    return typeof data === "string" ? data : JSON.stringify(data);
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    throw error;
  }
};
