import React, {
  ComponentProps,
  ComponentRef,
  PropsWithChildren,
  useRef,
} from "react";
import EmojiMenu from "./emoji-menu-component";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import useChatStore from "@/zustand/user-chat-store";
import useUserStore from "@/zustand/use-user-store";

import { sendMessaage } from "@/firebase/chat-utils";
import { toast } from "react-toastify";
import useSpeeachModal from "@/zustand/user-speeach-modal";
import { Mic } from "lucide-react";
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

  // const [img, setImg] = useState({
  //   file: null as null | File,
  //   url: "",
  // });

  const inputRef = useRef<ComponentRef<"input">>(null);

  function handleEmojiClick(emoji: string) {
    if (inputRef.current) {
      inputRef.current.value += emoji;
    }
  }

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const fromData = new FormData(formElement);
    const MessageText = fromData.get("text")?.toString() ?? "";
    if (!chatId && !user?.id && !currentUser?.id) return;
    try {
      await sendMessaage({
        chatId: chatId ?? "",
        receiver: user?.id ?? "",
        senderId: currentUser?.id ?? "",
        // image: img.file ?? null,
        text: MessageText,
      });
    } catch (err) {
      console.log(err);
      toast.error("failed to sending messages");
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      // setImg({
      //   file: null,
      //   url: "",
      // });
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

      <Mic onClick={handleOpen} />
      <EmojiMenu handlePick={handleEmojiClick} />
      <Button className="">
        Sendin <PaperPlaneIcon className="ml-2" />
      </Button>
    </form>
  );
}
