import { ComponentProps, PropsWithChildren } from "react";
import { format } from "timeago.js";
import type { Messages } from "@/types/chat-types";
import { cn } from "@/lib/utils";
import useUserStore from "@/zustand/use-user-store";
interface MessageComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {
  message: Messages;
}

export default function MessageComponent({
  children,
  message,
  ...resProps
}: MessageComponentProps) {
  const { currentUser } = useUserStore();
  console.log(new Date(message.createdAt).toDateString());
  return (
    <div
      className={cn(
        "px-2 py-4 max-w-[330px] ",
        currentUser?.id === message.senderId && " self-end"
      )}
      {...resProps}
    >
      <div className="">
        <p
          className={cn(
            " p-2  rounded-md",
            currentUser?.id === message.senderId
              ? " bg-blue-400/30"
              : "bg-transparent "
          )}
        >
          {message.text}
        </p>
        <span className="text-sm text-gray-400">
          {format(new Date(message.createdAt))}
        </span>
      </div>
    </div>
  );
}
