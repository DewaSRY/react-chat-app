import TextFormComponent from "./text-form-component";
import MessageThredComponent from "./message-thred-component";
import UserInfoComponent from "./user-info-component";

import { ComponentProps, PropsWithChildren, useEffect } from "react";

import useChatStore from "@/zustand/user-chat-store";
import { db, CHAT_DB } from "@/firebase/utils";
import type { ChatThread } from "@/types/chat-types";
import { doc, onSnapshot } from "firebase/firestore";
import { saveMasagingDeviceToken } from "@/firebase/fcm-utils";
import useUserStore from "@/zustand/use-user-store";
import { cn } from "@/lib/utils";
interface ChatBodyComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function ChatBodyComponent({
  children,
  ...resProps
}: ChatBodyComponentProps) {
  const { currentUser } = useUserStore();
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

  useEffect(() => {
    saveMasagingDeviceToken(currentUser?.id ?? "");
  }, []);

  return (
    <div className={cn("text-white flex flex-col h-[80vh]")} {...resProps}>
      <div {...resProps}>
        <UserInfoComponent />
        <MessageThredComponent />
        <TextFormComponent />
      </div>
    </div>
  );
}
