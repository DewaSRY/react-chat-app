import { ComponentRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import MessageComponent from "./message-component";
import userChatStore from "@/zustand/user-chat-store";

export default function MessageThredComponent() {
  const endBodyRef = useRef<ComponentRef<"div">>(null);

  const { messagesList } = userChatStore();
  useEffect(() => {
    endBodyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList.length]);
  return (
    <div
      className={cn(
        "flex-1 h-[80vh]  no-scrollbar ",
        "flex overflow-y-scroll flex-col gap-2"
      )}
    >
      {messagesList.length > 0 && (
        <>
          {messagesList.map((m, id) => (
            <MessageComponent key={id} message={m} />
          ))}
        </>
      )}

      <div ref={endBodyRef} />
    </div>
  );
}
