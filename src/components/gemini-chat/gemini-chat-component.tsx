import { db, GEMINI_DB } from "@/firebase/utils";
import { GeminiChatThread } from "@/types/gemini-chat-types";
import useGeminiChat from "@/zustand/use-gemini-chat";
import useUserStore from "@/zustand/use-user-store";
import { doc, onSnapshot } from "firebase/firestore";
import { ComponentProps, PropsWithChildren, useEffect } from "react";
import TextFormComponent from "./text-form-component";
import MessageThredComponent from "./message-thred-component";
interface GeminiChatComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function GeminiChatComponent({
  children,
  ...resProps
}: GeminiChatComponentProps) {
  const { currentUser } = useUserStore();
  const { setMessage } = useGeminiChat();
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, GEMINI_DB, currentUser?.id ?? ""),
      (res) => {
        const currentChatThread = res.data() as GeminiChatThread;
        setMessage(currentChatThread.messages);
      }
    );
    return () => {
      unSub();
    };
  }, []);
  return (
    <div {...resProps} className="">
      <MessageThredComponent />
      <TextFormComponent />
    </div>
  );
}
