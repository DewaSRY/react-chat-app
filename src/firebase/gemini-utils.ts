import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { GEMINI_DB, db } from "./utils";
import type {
  //   GeminiChatThread,
  GeminiMessagePayload,
} from "@/types/gemini-chat-types";

export async function startChatGemini(userId: string) {
  const q = doc(db, GEMINI_DB, userId);
  const dataSnapeshot = await getDoc(q);
  if (dataSnapeshot.data() === undefined) {
    await setDoc(doc(db, GEMINI_DB, userId), {
      messages: [],
    });
    return await startChatGemini(userId);
  }
  return dataSnapeshot.data();
}

export async function sendGeminiMessages(payload: GeminiMessagePayload) {
  await updateDoc(doc(db, GEMINI_DB, payload.geminiChatId), {
    messages: arrayUnion({
      owner: payload.owner,
      text: payload.text,
      createdAt: Date.now(),
    }),
  });
}
