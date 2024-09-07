import { MessageItem } from "@/types/chat-types";
import { create } from "zustand";

const initialState = {
  search: "",
  messageItems: [] as MessageItem[],
  itemList: [] as MessageItem[],
};
type Actions = {
  setMessageItem: (messageItems: MessageItem[]) => void;
  searchItems: (search: string) => void;
};
type State = typeof initialState;
const useFriendsItems = create<State & Actions>((set) => ({
  ...initialState,
  setMessageItem: (data) => {
    set((state) => ({
      state,
      messageItems: data,
      itemList: data,
    }));
  },
  searchItems: (search) => {
    set((state) => ({
      ...state,
      itemList: state.messageItems.filter(fkSearchByString(search)),
    }));
  },
}));
export default useFriendsItems;

function fkSearchByString(str: string) {
  if (str.length === 0) return (_d: MessageItem) => true;
  return (d: MessageItem) => d.user.username.includes(str);
}
