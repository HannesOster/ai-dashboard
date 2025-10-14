import { FunctionType } from "../store/useAppStore";

const API_URL =
  "https://api-inference.huggingface.co/models/google/flan-t5-small";
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY || "";

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

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
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
