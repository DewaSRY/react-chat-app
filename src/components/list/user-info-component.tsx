import { cn } from "@/lib/utils";
import { Ellipsis, Video, Pencil } from "lucide-react";

import useUserStore from "@/zustand/use-user-store";
export default function UserInfoComponent() {
  const { currentUser, userLogout } = useUserStore();
  return (
    <div className="text-white my-4 flex justify-between">
      <div className="flex gap-4 tex-2xl w-[30px] h-[30px] ">
        <img src={currentUser?.avatar || "/avatar.png"} alt="" />
        <h2>{currentUser?.username}</h2>
      </div>
      <div
        className={cn(
          "flex justify-between items-end text-sm gap-2",
          "[&>svg]:font-sm"
        )}
      >
        <Video />
        <Pencil />
        <button onClick={userLogout}>Logout</button>
        <Ellipsis />
      </div>
    </div>
  );
}
