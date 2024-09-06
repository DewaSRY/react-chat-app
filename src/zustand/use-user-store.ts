import { create } from "zustand";
import { db } from "@/firebase/utils";
import { doc, getDoc } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";

const initialState = {
  currentUser: null as null | DocumentData,
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
      const docRef = doc(db, "user", uuid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      //   console.log(err);
      set({ currentUser: null, isLoading: false });
    }
  },
}));
export default useUserStore;
