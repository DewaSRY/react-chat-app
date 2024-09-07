import TextFormComponent from "./text-form-component";
import MessageThredComponent from "./message-thred-component";
import UserInfoComponent from "./user-info-component";

import { ComponentProps, PropsWithChildren, useEffect } from "react";

import useChatStore from "@/zustand/user-chat-store";
import { db, CHAT_DB } from "@/firebase/utils";
import type { ChatThread } from "@/types/chat-types";
import { doc, onSnapshot } from "firebase/firestore";

interface ChatBodyComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function ChatBodyComponent({
  children,
  ...resProps
}: ChatBodyComponentProps) {
  const { chatId, setMessagesList } = useChatStore();
  useEffect(() => {
    if (!chatId) return;
    const unSub = onSnapshot(doc(db, CHAT_DB, chatId ?? ""), (res) => {
      const currentChatData = res.data() as ChatThread;
      setMessagesList(currentChatData.messages);
    });

    return () => {
      unSub();
    };
  }, [chatId]);
  return (
    <div {...resProps}>
      <UserInfoComponent />
      <MessageThredComponent />
      <TextFormComponent />
    </div>
  );
}
