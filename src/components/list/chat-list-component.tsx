import { cn } from "@/lib/utils";
import { Minus, Plus, Search } from "lucide-react";
import { ComponentProps, PropsWithChildren, useState } from "react";
import UserItemComponent from "./user-item-component";
import AddUserComponent from "./add-user-component";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ChatListComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function ChatListComponent({
  children,
  ...resProps
}: ChatListComponentProps) {
  const [isAdd, setisAdd] = useState(false);
  return (
    <div className=" ">
      {/* Search  */}
      <div className="search">
        <form
          action=""
          className={cn(
            "flex  bg-gray-800/90 relative rounded-md items-center"
          )}
        >
          <Search className=" " />
          <input
            className={cn(
              "flex-1 pr-6 rounded-sm text-gray-50 text-wrap outline-none border-0 p-1",
              "bg-transparent "
            )}
            type="text"
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
              <AddUserComponent />
            </DialogContent>
          </Dialog>
        </form>
      </div>
      <div className="h-[70vh] overflow-y-scroll no-scrollbar ">
        <div className="overflow-y-auto max-h-full ">
          <UserItemComponent />
          <UserItemComponent />
          <UserItemComponent />
          <UserItemComponent />
          <UserItemComponent />
        </div>
      </div>
    </div>
  );
}
