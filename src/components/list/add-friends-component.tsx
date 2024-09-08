// import { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

import useUsersModal from "@/zustand/use-users-modal";
import { Button, Tooltip } from "@mantine/core";

// interface AddFriendsComponentProps
//   extends ComponentProps<"button">,
//     PropsWithChildren {}

export default function AddFriendsComponent() {
  const { handleOpen } = useUsersModal();
  return (
    <Tooltip label="Add  friends">
      <Button
        onClick={handleOpen}
        className={cn(
          "[&>svg]:active:transition-transform ease-in-out ",
          "[&>svg]:active:duration-300 ",
          "[&>svg]:active:rotate-45 ",
          "[&>svg]:hover:rotate-45 ",
          "transition-colors duration-500 ease-in-out ",
          "text-lg cursor-pointer duration-200 ",
          "flex items-center justify-between p-2 hover:bg-green-800 "
        )}
      >
        <Plus />
      </Button>
    </Tooltip>
  );
}
