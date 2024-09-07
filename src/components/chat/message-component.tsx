import { ComponentProps, PropsWithChildren } from "react";
import { format } from "timeago.js";
import type { Messages } from "@/types/chat-types";
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
  return (
    <div className="px-2 py-4 flex w-full " {...resProps}>
      <div className="">
        <p className=" self-end w-[400px] p-2 bg-blue-400/30 rounded-md">
          {message.text}
        </p>
        <span className="text-sm text-gray-400">
          {format(message.createdAt)}
        </span>
      </div>
    </div>
  );
}
