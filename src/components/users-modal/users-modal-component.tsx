import { Modal } from "@mantine/core";
import useUsersModal from "@/zustand/use-users-modal";
import UsersListComponent from "./users-list-component";

export default function UsersModalComponent() {
  const { opened, handleClost } = useUsersModal();
  return (
    <Modal
      size="xl"
      opened={opened}
      onClose={handleClost}
      title="Friends to talk"
      className="bg-gray-950/60"
    >
      <UsersListComponent />
    </Modal>
  );
}
