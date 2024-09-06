import { create } from "zustand";
import useUserStore from "./use-user-store";
import type { User } from "@/types/user-types";
const initialState = {
  user: null as null | User,
  chatId: null as null | string,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
};
type Actions = {
  changeChat: (chatId: string, user: User) => Promise<void>;
  changeBlock: () => void;
  resetChat: () => void;
};
type State = typeof initialState;
const userChatStore = create<State & Actions>((set) => ({
  ...initialState,
  changeChat: async (chatId, user) => {
    const currrentUser = useUserStore.getState().currentUser;
    if (!currrentUser) return;
    // CHECK IF CURRENT USER IS BLOCKED
    if (user.blocked.includes(currrentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }
    // CHECK IF RECEIVER IS BLOCKED
    else if (currrentUser.blocked.includes(user.id)) {
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
export default userChatStore;
