import React, { ComponentRef, useRef } from "react";
import { cn } from "@/lib/utils";

import MessageComponent from "./message-component";
import userChatStore from "@/zustand/user-chat-store";

export default function MessageThredComponent() {
  const endBodyRef = useRef<ComponentRef<"div">>(null);

  const { messagesList } = userChatStore();

  return (
    <div
      className={cn(
        "flex-1 h-[70vh]  no-scrollbar ",
        "flex overflow-y-scroll flex-col gap-2"
      )}
    >
      {messagesList.length > 0 && (
        <>
          {messagesList.map((m, id) => (
            <React.Fragment key={id}>
              <MessageComponent message={m} />
            </React.Fragment>
          ))}
        </>
      )}

      <div ref={endBodyRef} />
    </div>
  );
}
