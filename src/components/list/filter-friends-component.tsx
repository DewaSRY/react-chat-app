import { cn } from "@/lib/utils";
import { Plus, Search } from "lucide-react";

import useFriendsItems from "@/zustand/use-friends-items";
import useDebounce from "@/hooks/use-debounce";
import useUsersModal from "@/zustand/use-users-modal";

export default function FilterFriendsComponent() {
  const { searchItems } = useFriendsItems();
  const { v, handleVChange } = useDebounce(searchItems);

  const { handleOpen } = useUsersModal();

  return (
    <form
      className={cn("flex  bg-gray-800/90 relative rounded-md items-center")}
    >
      <Search className=" " />
      <input
        className={cn(
          "flex-1 pr-6 rounded-sm text-gray-50 text-wrap outline-none border-0 p-1",
          "bg-transparent "
        )}
        type="text"
        value={v}
        onChange={handleVChange}
      />

      <div
        onClick={handleOpen}
        className={cn(
          "[&>svg]:active:translate-y-[10%] ",
          "text-lg cursor-pointer duration-200 "
        )}
      >
        <Plus />
      </div>
    </form>
  );
}
