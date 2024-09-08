import { ComponentProps, PropsWithChildren } from "react";
import type { UserItem } from "@/types/chat-types";
import { format } from "timeago.js";
import userChatStore from "@/zustand/user-chat-store";
import useAppShell from "@/zustand/use-app-shell";
import { cn } from "@/lib/utils";

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
  const { handleClost } = useAppShell();
  const { updatedAt, isSeen } = messageItem;
  const { username, avatar, id } = messageItem.user;
  const { startChat } = userChatStore();

  function handleStartChat() {
    startChat(messageItem.chatId, messageItem.user);
    handleClost();
  }
  return (
    <div
      key={id}
      onClick={handleStartChat}
      {...resProps}
      className={cn(
        "p-2  cursor-pointer transition-colors duration-300 ",
        isSeen
          ? " border-b-[1px] border-gray-50 "
          : " bg-blue-300/50 rounded-xl  "
      )}
    >
      <div className="flex py-2 gap-2 items-center">
        <div className="w-[30px] h-[30px]">
          <img className="" src={avatar ?? "/avatar.png"} alt="" />
        </div>
        <div>
          <p>{username}</p>
          <p className="text-xs font-light">{format(updatedAt)}</p>
        </div>
      </div>
      <div>
        <p className="text-sm">
          {messageItem.lastMessage.length > 10
            ? messageItem.lastMessage.slice(0, 10) + "..."
            : messageItem.lastMessage}
        </p>
      </div>
    </div>
  );
}
