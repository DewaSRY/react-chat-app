import { Button, Textarea } from "@mantine/core";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

import React, {
  ComponentProps,
  ComponentRef,
  PropsWithChildren,
  useRef,
  useState,
} from "react";
import useChatStore from "@/zustand/user-chat-store";
import useUserStore from "@/zustand/use-user-store";

import useSpeeachModal from "@/zustand/user-speeach-modal";
import useSpeekToText from "@/hooks/user-speech-to-text";

import { sendMessaage } from "@/firebase/chat-utils";
import { toast } from "react-toastify";
import { Pause, Play } from "lucide-react";

interface MessageTextFormComponentProps
  extends ComponentProps<"form">,
    PropsWithChildren {}

export default function MessageTextFormComponent({
  children,
  ...resProps
}: MessageTextFormComponentProps) {
  const [textValue, setTextValue] = useState("");
  const { isListening, startListening, stopListening } = useSpeekToText((t) => {
    setTextValue(t);
  });
  const { currentUser } = useUserStore();
  const { chatId, user } = useChatStore();
  const { handleClost } = useSpeeachModal();

  const inputRef = useRef<ComponentRef<"input">>(null);

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!chatId && !user?.id && !currentUser?.id) return;
    try {
      await sendMessaage({
        chatId: chatId ?? "",
        receiver: user?.id ?? "",
        senderId: currentUser?.id ?? "",
        text: textValue,
      });
    } catch (err) {
      // console.log(err);
      toast.error("failed to sending messages");
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextValue(e.target.value);
  }
  function handleClik() {
    stopListening();
    handleClost();
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex gap-1 flex-col items-center"
      {...resProps}
    >
      <Textarea
        rows={5}
        className="w-full p-2 rounded-sm text-gray-100"
        name="text"
        value={textValue}
        onChange={handleChange}
      />

      <div className="flex justify-between w-full">
        {isListening ? (
          <Button color="red" onClick={stopListening}>
            Stop Recording <Pause className="ml-2 w-[10px]" />
          </Button>
        ) : (
          <Button color="blue" onClick={startListening}>
            Start Recording <Play className="ml-2" />
          </Button>
        )}
        <Button onClick={handleClik} color="green" type="submit" className="">
          Sendin <PaperPlaneIcon className="ml-2" />
        </Button>
      </div>
    </form>
  );
}
