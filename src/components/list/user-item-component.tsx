import { ComponentProps, PropsWithChildren } from "react";
import type { UserChat, MessageItem } from "@/types/chat-types";

interface UserItemComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {
  messageItem: MessageItem;
}

export default function UserItemComponent({
  children,
  messageItem,
  ...resProps
}: UserItemComponentProps) {
  const { email, username, avatar } = messageItem.user;
  return (
    <div {...resProps} className="py-2 border-b-[1px] border-gray-50">
      <div className="flex py-2 gap-2">
        <div className="w-[30px] h-[30px]">
          <img className="" src="/avatar.png" alt="" />
        </div>
        <span>{username}</span>
      </div>
      <div>
        <p>{messageItem.lastMessage}</p>
      </div>
    </div>
  );
}
