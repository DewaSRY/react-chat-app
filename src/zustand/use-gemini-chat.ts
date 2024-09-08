import { create } from "zustand";
import type { GeminiMessages } from "@/types/gemini-chat-types";
const initialState = {
  messages: [] as GeminiMessages[],
  isGeminiActive: false,
};
type Actions = {
  setMessage: (messages: GeminiMessages[]) => void;
  openGemini: () => void;
  closeGemini: () => void;
};
type State = typeof initialState;
const useGeminiChat = create<State & Actions>((set) => ({
  ...initialState,
  setMessage: (d) => {
    set((s) => ({ ...s, messages: d }));
  },
  openGemini: () => {
    set((s) => ({ ...s, isGeminiActive: true }));
  },
  closeGemini: () => {
    set((s) => ({ ...s, isGeminiActive: false }));
  },
}));
export default useGeminiChat;
