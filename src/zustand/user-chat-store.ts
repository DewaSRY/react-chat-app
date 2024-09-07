import { create } from "zustand";
import useUserStore from "./use-user-store";
import type { User } from "@/types/user-types";
import type { Messages } from "@/types/chat-types";
const initialState = {
  user: null as null | User,
  chatId: null as null | string,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  messagesList: [] as Messages[],
};
type Actions = {
  startChat: (chatId: string, user: User) => Promise<void>;
  changeBlock: () => void;
  resetChat: () => void;
  setMessagesList: (messagesList: Messages[]) => void;
};
type State = typeof initialState;
const useChatStore = create<State & Actions>((set) => ({
  ...initialState,
  startChat: async (chatId, user) => {
    const currrentUser = useUserStore.getState().currentUser;
    if (!currrentUser) return;
    if (user.blocked.includes(currrentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    } else if (currrentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
  },
  setMessagesList: (m) => {
    set((s) => ({ ...s, messagesList: m }));
  },
  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
  resetChat: () => {
    set({
      chatId: null,
      user: null,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },
}));
export default useChatStore;
