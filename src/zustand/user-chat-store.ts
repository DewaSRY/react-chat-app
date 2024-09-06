import { create } from "zustand";
import { db } from "@/firebase/utils";
import { doc, getDoc } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import useUserStore from "./use-user-store";
const initialState = {
  user: null as null | DocumentData,
};
type Actions = {
  fetchUserInfo: () => Promise<void>;
};
type State = typeof initialState;
const userChatStore = create<State & Actions>((set) => ({
  ...initialState,
  fetchUserInfo: async () => {
    const currrentUser = useUserStore.getState().currentUser;
    console.log(currrentUser);
  },
}));
export default userChatStore;
