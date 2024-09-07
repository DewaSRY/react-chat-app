// import { ComponentProps, PropsWithChildren } from "react";
import { Modal } from "@mantine/core";
import useUsersSetting from "@/zustand/use-users-setting";
import SettingPanelComponent from "./setting-panel-component";
export default function UserSettingComponent() {
  const { opened, handleClost } = useUsersSetting();
  return (
    <Modal
      size="sm"
      opened={opened}
      onClose={handleClost}
      title="Authentication"
    >
      <SettingPanelComponent />
    </Modal>
  );
}
