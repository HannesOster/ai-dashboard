import { type FunctionType } from "../store/useAppStore";
import { HfInference } from "@huggingface/inference";

const API_URL =
  "https://api-inference.huggingface.co/models/google/flan-t5-small?wait_for_model=true";
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY || "";
// Create HF inference client (supports both InferenceClient and HfInference exports)
const hfClient = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY!);

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

      if (typeof result === "string") return result;
      if (
        Array.isArray(result) &&
        result.length > 0 &&
        (result as any)[0]?.summary_text
      ) {
        return (result as any)[0].summary_text as string;
      }
      if ((result as any)?.summary_text) {
        return (result as any).summary_text as string;
      }
      return JSON.stringify(result);
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

    const data = await response.json();

    // Hugging Face API returns an array with generated text
    if (Array.isArray(data) && data.length > 0) {
      return data[0].generated_text || data[0].translation_text || "";
    }

    return JSON.stringify(data);
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    throw error;
  }
};
