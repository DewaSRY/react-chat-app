import useGeminiChat from "@/zustand/use-gemini-chat";

import { format } from "timeago.js";
import { cn } from "@/lib/utils";
import { usetextToSpeach } from "@/provider/text-to-speach-provider";
import { Speech } from "lucide-react";

export default function MessagesListComponent() {
  const { messages } = useGeminiChat();
  const { readText } = usetextToSpeach();

  return (
    <div>
      {messages.map((m, id) => (
        <div key={id} className="w-full flex p2">
          <div
            className={cn(
              "px-2 py-4  max-w-[330p] md:max-w-[30vw] ",
              m.owner === "user" && " self-end"
            )}
          >
            <div className="">
              <p
                className={cn(
                  " p-2  rounded-md",
                  m.owner === "user" ? " bg-blue-400/30" : "bg-gray-800/60 "
                )}
              >
                {m.text}
              </p>
              <div className="flex justify-between">
                <span
                  onClick={readText.bind(null, m.text)}
                  className="text-sm text-gray-400 cursor-pointer flex gap-2"
                >
                  <Speech /> Speach
                </span>
                <span className="text-sm text-gray-400">
                  {format(new Date(m.createdAt))}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
