// import { ComponentProps, PropsWithChildren } from "react";
import useBody from "@/zustand/use-body";

import DefaultChatBodyComponent from "@/components/default-chat-body/default-chat-body-component";
import GeminiChatComponent from "@/components/gemini-chat/gemini-chat-component";
import ChatBodyComponent from "@/components/chat/chat-component";
import useChatStore from "@/zustand/user-chat-store";
// interface BodyComponentProps extends ComponentProps<"div">, PropsWithChildren {}

export default function BodyComponent() {
  const { currentActive } = useBody();
  const { user } = useChatStore();

  if (currentActive) {
    if (currentActive === "gemini") {
      return <GeminiChatComponent />;
    } else if (currentActive === "chat" && user !== null) {
      return <ChatBodyComponent />;
    }
  }
  return <DefaultChatBodyComponent />;
}
