import { create } from "zustand";

const initialState = {
  opened: false,
};
type Actions = {
  handleOpen: () => void;
  handleClost: () => void;
  handleToggle: () => void;
};
type State = typeof initialState;
const useSpeeachModal = create<State & Actions>((set) => ({
  ...initialState,
  handleClost: () => {
    set(() => ({ opened: false }));
  },
  handleOpen: () => {
    set(() => ({ opened: true }));
  },
  handleToggle: () => {
    set((s) => ({ opened: !s.opened }));
  },
}));
export default useSpeeachModal;
