import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

import useFriendsItems from "@/zustand/use-friends-items";
import useDebounce from "@/hooks/use-debounce";

export default function FilterFriendsComponent() {
  const { searchItems } = useFriendsItems();
  const { v, handleVChange } = useDebounce(searchItems);

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
    </form>
  );
}
