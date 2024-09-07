// import { ComponentProps, PropsWithChildren } from "react";
import { Modal } from "@mantine/core";
import useSpeeachModal from "@/zustand/user-speeach-modal";
import MessageTextFormComponent from "./message-text-form-component";
// interface SpeeachModalComponentProps
//   extends ComponentProps<"div">,
//     PropsWithChildren {}

export default function SpeeachModalComponent() {
  const { opened, handleClost } = useSpeeachModal();
  return (
    <Modal
      size="sm"
      opened={opened}
      onClose={handleClost}
      title="Authentication"
    >
      <MessageTextFormComponent />
    </Modal>
  );
}
