import { Modal } from "@mantine/core";
import useUsersModal from "@/zustand/use-users-modal";
import UsersListComponent from "./users-list-component";

export default function UsersModalComponent() {
  const { opened, handleClost } = useUsersModal();
  return (
    <Modal size="xl" opened={opened} onClose={handleClost} title="">
      <h2 className="text-center my-2 text-2xl">Friends to tall</h2>

      <UsersListComponent />
    </Modal>
  );
}
