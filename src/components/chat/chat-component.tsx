import { ComponentProps, PropsWithChildren } from "react";

import useChatStore from "@/zustand/user-chat-store";

interface ChatComponentProps extends ComponentProps<"div">, PropsWithChildren {}
import { cn } from "@/lib/utils";
import ChatBodyComponent from "./chat-body-component";
export default function ChatComponent({
  children,
  ...resProps
}: ChatComponentProps) {
  const { user } = useChatStore();

  return (
    <div className={cn("text-white flex flex-col h-[80vh]")} {...resProps}>
      {user ? <ChatBodyComponent /> : <>no user selected</>}
    </div>
  );
}
