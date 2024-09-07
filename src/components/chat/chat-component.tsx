import React, {
  ComponentProps,
  ComponentRef,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
// import EmojiPicker from "emoji-picker-react";
import EmojiMenu from "./emoji-menu-component";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import useChatStore from "@/zustand/user-chat-store";
import useUserStore from "@/zustand/use-user-store";
import { db, USER_CHAT_DB, USER_DB } from "@/firebase/utils";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { sendMessaage } from "@/firebase/chat-utils";
interface ChatComponentProps extends ComponentProps<"div">, PropsWithChildren {}
import MessageComponent from "./message-component";
import { cn } from "@/lib/utils";
export default function ChatComponent({
  children,
  ...resProps
}: ChatComponentProps) {
  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null as null | File,
    url: "",
  });
  // const { fetchUserInfo } = useChatStore();

  // useEffect(() => {
  //   fetchUserInfo();
  // }, []);

  const inputRef = useRef<ComponentRef<"input">>(null);
  const endBodyRef = useRef<ComponentRef<"div">>(null);

  function handleEmojiClick(emoji: string) {
    if (inputRef.current) {
      inputRef.current.value += emoji;
    }
  }

  // useEffect(() => {
  //   endBodyRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [chat.messages]);

  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
  //     setChat(res.data());
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, [chatId]);

  // const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputElement = e.target as HTMLInputElement;
  //   if (!inputElement) return;
  //   if (!inputElement.files) return;
  //   if (inputElement.files[0]) {
  //     setImg({
  //       file: inputElement.files[0],
  //       url: URL.createObjectURL(inputElement.files[0]),
  //     });
  //   }
  // };

  // const handleSend = async () => {
  //   if (text === "") return;

  //   try {
  //     await sendMessaage({
  //       chatId,
  //       receiver,
  //       senderId,
  //       text,
  //       image,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setImg({
  //       file: null,
  //       url: "",
  //     });
  //     setText("");
  //   }
  // };

  return (
    <div className={cn("text-white flex flex-col h-[80vh]")}>
      {/* Top */}
      <div className="flex items-center gap-2 border-b py-2 border-white">
        <div className="w-[30px] h-[30px]">
          <img src="/avatar.png" alt="" />
        </div>
        <div>
          <span className="text-lg">Jahne Deo Friends</span>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          </p>
        </div>
      </div>

      {/* Body */}
      <div
        className={cn(
          "flex-1 h-[70vh]  no-scrollbar ",
          "flex overflow-y-scroll flex-col gap-2"
        )}
      >
        <MessageComponent />
        <MessageComponent />
        <MessageComponent />
        <div ref={endBodyRef} />
      </div>
      {/* Bottom */}
      <div className="flex gap-1 items-center">
        <input
          className="flex-1 p-2 rounded-sm text-gray-800"
          ref={inputRef}
          type="text"
        />

        <EmojiMenu handlePick={handleEmojiClick} />
        <Button className="">
          Sendin <PaperPlaneIcon className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
