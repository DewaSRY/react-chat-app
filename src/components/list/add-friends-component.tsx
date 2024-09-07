import { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

import useUsersModal from "@/zustand/use-users-modal";

interface AddFriendsComponentProps
  extends ComponentProps<"button">,
    PropsWithChildren {}

export default function AddFriendsComponent({
  children,
  ...resProps
}: AddFriendsComponentProps) {
  const { handleOpen } = useUsersModal();
  return (
    <button
      onClick={handleOpen}
      className={cn(
        "[&>svg]:active:transition-transform ease-in-out ",
        "[&>svg]:active:duration-300 ",
        "[&>svg]:active:rotate-45 ",
        "[&>svg]:hover:rotate-45 ",
        "transition-colors duration-500 ease-in-out ",
        "text-lg cursor-pointer duration-200 ",
        " flex items-center justify-between p-2 hover:bg-green-800  w-full my-2"
      )}
      {...resProps}
    >
      Find Some One To talk <Plus />
    </button>
  );
}
