import { type FunctionType } from "../store/useAppStore";
import { Client } from "@gradio/client";

// Fixed Space slugs handled here (no env needed)
const TEXT_SUMMARIZER_SLUG = "hannes6406/text-summarizer";
const TRANSLATOR_SLUG = "hannes6406/de-en-translator";
const PARAPHRASER_SLUG = "hannes6406/paraphraser";

type PredictResponse<T = unknown> =
  | { data: T | T[] }
  | { [key: string]: unknown };

function unwrapFirst<T>(data: T | T[]): T {
  return Array.isArray(data) ? (data[0] as T) : (data as T);
}

async function predictString(
  slug: string,
  endpoint: string,
  payload: Record<string, unknown>
): Promise<string> {
  if (!slug) throw new Error("Missing Space slug for this operation");
  const client = await Client.connect(slug);
  const result = (await client.predict(
    endpoint,
    payload
  )) as PredictResponse<unknown>;
  const raw = (result as { data?: unknown }).data ?? result;
  const first = unwrapFirst(raw as unknown[] | unknown);
  if (typeof first === "string") return first;
  return JSON.stringify((result as { data?: unknown }).data ?? result);
}

// removed icon prediction helpers

export const generateText = async (
  inputText: string,
  functionType: FunctionType
): Promise<string> => {
  if (functionType === "translate") {
    // Use dedicated translator Space without prefixes
    return await predictString(TRANSLATOR_SLUG, "/predict", {
      text: inputText,
    });
  }

  if (functionType === "rewrite") {
    // Use dedicated paraphraser Space without prefixes
    return await predictString(PARAPHRASER_SLUG, "/predict", {
      text: inputText,
    });
  }

  // Summarize via text-summarizer with prefixed prompt
  return await predictString(TEXT_SUMMARIZER_SLUG, "/predict", {
    text: inputText,
  });
};

// removed icon generator export
