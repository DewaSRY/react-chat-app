import { ComponentProps, PropsWithChildren } from "react";
import { format } from "timeago.js";
import type { Messages } from "@/types/chat-types";
import { cn } from "@/lib/utils";
import useUserStore from "@/zustand/use-user-store";
import { usetextToSpeach } from "@/provider/text-to-speach-provider";
import { Speech } from "lucide-react";

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
  const { readText } = usetextToSpeach();

  function readingText() {
    // if (isReading) return;
    readText(message.text);
  }
  return (
    <div
      className={cn(
        "px-2 py-4  max-w-[90vh]  lg:max-w-[600px] ",
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
              : "bg-gray-800/60 "
          )}
        >
          {message.text}
        </p>
        <div className="flex justify-between my-4 ">
          <span
            onClick={readingText}
            className="text-sm text-gray-400 cursor-pointer flex gap-2"
          >
            <Speech /> Speach
          </span>
          <span className="text-sm text-gray-400">
            {format(new Date(message.createdAt))}
          </span>
        </div>
      </div>
    </div>
  );
}
