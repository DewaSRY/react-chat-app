import { create } from "zustand";
import { geminiRequest } from "@/api/utils";
import { sendGeminiMessages } from "@/firebase/gemini-utils";
import useUserStore from "./use-user-store";
import { toast } from "react-toastify";
const initialState = {
  count: 0,
  isLoading: false,
};
type Actions = {
  textingGemini: (_q: string) => Promise<void>;
};
type State = typeof initialState;
const useGeminiQuery = create<State & Actions>((set) => ({
  ...initialState,
  textingGemini: async (q) => {
    const user = useUserStore.getState().currentUser;
    set(() => ({ isLoading: true }));
    try {
      const getGeminiResponse = await geminiRequest(q);
      await sendGeminiMessages({
        geminiChatId: user?.id ?? "",
        owner: "gemini",
        text: getGeminiResponse,
      });
    } catch (e) {
      toast.error("faied to get answer from gemini");
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
}));
export default useGeminiQuery;
