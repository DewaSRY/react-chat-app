import { ComponentRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import useGeminiChat from "@/zustand/use-gemini-chat";
import MessageComponent from "./messages-component";

export default function MessageThredComponent() {
  const endBodyRef = useRef<ComponentRef<"div">>(null);
  const { messages } = useGeminiChat();

  useEffect(() => {
    endBodyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  return (
    <div
      className={cn(
        "flex-1 h-[90vh]  no-scrollbar ",
        "flex overflow-y-scroll flex-col gap-2"
      )}
    >
      {messages.length > 0 && (
        <>
          {messages.map((m, id) => (
            <MessageComponent key={id} message={m} />
          ))}
        </>
      )}

      <div ref={endBodyRef} />
    </div>
  );
}
