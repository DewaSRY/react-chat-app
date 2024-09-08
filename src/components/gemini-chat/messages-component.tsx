import { ComponentProps, PropsWithChildren } from "react";

import { format } from "timeago.js";
import { cn } from "@/lib/utils";
import { usetextToSpeach } from "@/provider/text-to-speach-provider";
import { Speech } from "lucide-react";
import type { GeminiMessages } from "@/types/gemini-chat-types";
interface MessaagesComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {
  message: GeminiMessages;
}

export default function MessagesComponent({
  children,
  message,
  ...resProsp
}: MessaagesComponentProps) {
  const { readText } = usetextToSpeach();
  function readingText() {
    // if (isReading) return;
    readText(message.text);
  }

  return (
    <div
      className={cn(
        "px-2 py-4 max-w-[90vh]  lg:max-w-[600px] ",
        message.owner === "user" && " lg:self-end"
      )}
      {...resProsp}
    >
      <div className="">
        <p
          className={cn(
            " p-2  rounded-md",
            message.owner === "user" ? " bg-blue-400/30" : "bg-gray-800/60 "
          )}
        >
          {message.text}
        </p>
        <div className="flex justify-between">
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
