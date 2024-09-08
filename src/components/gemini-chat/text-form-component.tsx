import React, {
  ComponentProps,
  ComponentRef,
  PropsWithChildren,
  useRef,
} from "react";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import useChatStore from "@/zustand/user-chat-store";
import useUserStore from "@/zustand/use-user-store";

import { toast } from "react-toastify";
import useSpeeachModal from "@/zustand/user-speeach-modal";
import { Mic } from "lucide-react";
import { sendGeminiMessages } from "@/firebase/gemini-utils";
import useGeminiQuery from "@/zustand/use-gemini-query";
interface TextFormComponentProps
  extends ComponentProps<"form">,
    PropsWithChildren {}

export default function TextFormComponent({
  children,
  ...resProps
}: TextFormComponentProps) {
  const { handleOpen } = useSpeeachModal();
  const { currentUser } = useUserStore();
  const { chatId, user } = useChatStore();
  const { textingGemini, isLoading } = useGeminiQuery();

  const inputRef = useRef<ComponentRef<"input">>(null);

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const fromData = new FormData(formElement);
    const MessageText = fromData.get("text")?.toString() ?? "";
    if (!chatId && !user?.id && !currentUser?.id) return;
    try {
      toast.warn("gemini fetch answer");
      await sendGeminiMessages({
        geminiChatId: currentUser?.id ?? "",
        owner: "user",
        text: MessageText,
      });
      await textingGemini(MessageText);
    } catch (err) {
      toast.error("failed to sending messages");
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex gap-1 items-center"
      {...resProps}
    >
      <input
        className="flex-1 p-2 rounded-sm text-gray-100"
        ref={inputRef}
        name="text"
        type="text"
      />

      <Mic className="cursor-pointer" onClick={handleOpen} />
      <Button
        disabled={isLoading}
        className="disabled:bg-gray-500 disabled:text-gray-200"
      >
        Sendin <PaperPlaneIcon className="ml-2" />
      </Button>
    </form>
  );
}
