import { useState } from "react";
import { cn } from "@/lib/utils";
import { Minus, Plus, Search } from "lucide-react";

import AddUserComponent from "./add-user-component";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import useFriendsItems from "@/zustand/use-friends-items";
import useDebaunce from "@/hooks/use-debaunch";

// interface FilterFriendsComponentProps
//   extends ComponentProps<"div">,
//     PropsWithChildren {}

export default function FilterFriendsComponent() {
  const [isAdd, setisAdd] = useState(false);

  const { searchItems } = useFriendsItems();
  const { v, handleVChange } = useDebaunce(searchItems);

  return (
    <form
      action=""
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

      <Dialog>
        <DialogTrigger>
          <div
            onClick={setisAdd.bind(null, !isAdd)}
            className={cn(
              "[&>svg]:active:translate-y-[10%] ",
              "text-lg   cursor-pointer duration-200 "
            )}
          >
            {isAdd ? <Plus /> : <Minus />}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <AddUserComponent />
        </DialogContent>
      </Dialog>
    </form>
  );
}
