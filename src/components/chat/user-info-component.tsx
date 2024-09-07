import { ComponentProps, PropsWithChildren } from "react";
import useChatStore from "@/zustand/user-chat-store";
interface UserInfoComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function UserInfoComponent({
  children,
  ...resProps
}: UserInfoComponentProps) {
  const { user } = useChatStore();
  return (
    <div
      className="flex items-center gap-2 border-b py-2 border-white"
      {...resProps}
    >
      <div className="w-[30px] h-[30px]">
        <img src={user?.avatar ?? "/avatar.png"} alt="" />
      </div>
      <div>
        <span className="text-lg">{user?.username}</span>
        {/* <p className="text-sm"></p> */}
      </div>
    </div>
  );
}
