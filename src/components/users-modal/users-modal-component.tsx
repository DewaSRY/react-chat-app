import { Modal } from "@mantine/core";
import useUsersModal from "@/zustand/use-users-modal";
import UsersListComponent from "./users-list-component";

export default function UsersModalComponent() {
  const { opened, handleClost } = useUsersModal();
  return (
    <Modal opened={opened} onClose={handleClost} title="Authentication">
      <UsersListComponent />
    </Modal>
  );
}
