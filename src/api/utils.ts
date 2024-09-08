import axios from "axios";
import type { GeminiResponse } from "@/types/gemini-response-types";
export const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
  import.meta.env.VITE_GEMINI_API_KEY
}`;

export async function geminiRequest(question: string = "what is apple") {
  const { data } = await axios<GeminiResponse>({
    url: GEMINI_URL,
    method: "post",
    data: {
      contents: [{ parts: [{ text: question }] }],
    },
  });
  console.log(JSON.stringify(data));
  let textData = data.candidates[0].content.parts[0].text;
  textData = textData
    .replace("/[\\n\\*]/g", " ")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "");
  console.log(textData);
  return textData;
}
