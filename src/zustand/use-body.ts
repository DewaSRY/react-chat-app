import { create } from "zustand";

type currentBody = "chat" | "gemini";

const initialState = {
  currentActive: null as currentBody | null,
};
type Actions = {
  setCurrentActive: (a: currentBody) => void;
  resetCurrentActive: () => void;
};
type State = typeof initialState;
const useBody = create<State & Actions>((set) => ({
  ...initialState,
  setCurrentActive: (a) => {
    set((s) => ({ ...s, currentActive: a }));
  },
  resetCurrentActive: () => {
    set((s) => ({ ...s, currentActive: null }));
  },
}));
export default useBody;
