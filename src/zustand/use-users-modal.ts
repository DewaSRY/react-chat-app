import { create } from "zustand";

const initialState = {
  opened: false,
};
type Actions = {
  handleOpen: () => void;
  handleClost: () => void;
};
type State = typeof initialState;
const useUsersModal = create<State & Actions>((set) => ({
  ...initialState,
  handleClost: () => {
    set(() => ({ opened: false }));
  },
  handleOpen: () => {
    set(() => ({ opened: true }));
  },
}));
export default useUsersModal;
