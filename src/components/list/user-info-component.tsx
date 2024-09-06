// import { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Ellipsis, Video, Pencil, User } from "lucide-react";
// interface UserInfoComponentProps
//   extends ComponentProps<"div">,
//     PropsWithChildren {}

import useUserStore from "@/zustand/use-user-store";
export default function UserInfoComponent() {
  const { currentUser } = useUserStore();
  return (
    <div className="text-white my-4 flex justify-between">
      {/* User  */}
      <div className="flex gap-4 tex-2xl w-[30px] h-[30px] ">
        {currentUser?.avatar !== null ? (
          <>
            <img src="/avatar.png" alt="" />
          </>
        ) : (
          // <img src={currentUser.avatar} alt="" />
          <User />
        )}

        <h2>{currentUser?.username}</h2>
      </div>
      {/* Icons */}
      <div
        className={cn(
          "flex justify-between items-end text-sm gap-2",
          "[&>svg]:font-sm"
        )}
      >
        <Video />
        <Pencil />
        <Ellipsis />
      </div>
    </div>
  );
}
