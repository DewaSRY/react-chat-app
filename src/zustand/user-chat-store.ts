import { create } from "zustand";
import useUserStore from "./use-user-store";
import type { User } from "@/types/user-types";
import type { Messages } from "@/types/chat-types";
const initialState = {
  user: null as null | User,
  chatId: null as null | string,
  messagesList: [] as Messages[],
};
type Actions = {
  startChat: (chatId: string, user: User) => Promise<void>;
  resetChat: () => void;
  setMessagesList: (messagesList: Messages[]) => void;
};
type State = typeof initialState;
const useChatStore = create<State & Actions>((set) => ({
  ...initialState,
  startChat: async (chatId, user) => {
    const currrentUser = useUserStore.getState().currentUser;
    if (!currrentUser) return;
    return set({
      chatId,
      user,
    });
  },
  setMessagesList: (m) => {
    set((s) => ({ ...s, messagesList: m }));
  },

  resetChat: () => {
    set({
      chatId: null,
      user: null,
    });
  },
}));
export default useChatStore;
