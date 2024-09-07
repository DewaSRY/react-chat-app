import { ComponentProps, PropsWithChildren } from "react";
import type { UserChat, UserItem } from "@/types/chat-types";
import userChatStore from "@/zustand/user-chat-store";

interface UserItemComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {
  messageItem: UserItem;
}

export default function UserItemComponent({
  children,
  messageItem,
  ...resProps
}: UserItemComponentProps) {
  const { email, username, avatar } = messageItem.user;
  const { startChat } = userChatStore();

  function handleStartChat() {
    startChat(messageItem.chatId, messageItem.user);
  }
  return (
    <div
      onClick={handleStartChat}
      {...resProps}
      className="py-2 border-b-[1px] border-gray-50 cursor-pointer"
    >
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
