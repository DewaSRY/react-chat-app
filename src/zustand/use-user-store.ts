import { create } from "zustand";
import { db, USER_DB } from "@/firebase/utils";
import { doc, getDoc } from "firebase/firestore";
import type { User } from "@/types/user-types";
const initialState = {
  currentUser: null as null | User,
  isLoading: true,
};
type Actions = {
  fetchUserInfo: (uuid: string) => Promise<void>;
};
type State = typeof initialState;
const useUserStore = create<State & Actions>((set) => ({
  ...initialState,
  fetchUserInfo: async (uuid) => {
    if (!uuid) return set({ currentUser: null, isLoading: false });
    try {
      const docRef = doc(db, USER_DB, uuid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data() as User, isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      set({ currentUser: null, isLoading: false });
    }
  },
}));
export default useUserStore;
