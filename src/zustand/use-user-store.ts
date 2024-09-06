import { create } from "zustand";

const initialState = {
  count: 0,
};
type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};
type State = typeof initialState;
const useUserStore = create<State & Actions>((set) => ({
  ...initialState,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}));
export default useUserStore;
