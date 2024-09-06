import {
  ComponentProps,
  ComponentRef,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
// import EmojiPicker from "emoji-picker-react";
import EmojiMenu from "./emoji-menu-component";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import useChatStore from "@/zustand/user-chat-store";
import useUserStore from "@/zustand/use-user-store";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, USER_CHAT_DB, USER_DB } from "@/firebase/utils";
interface ChatComponentProps extends ComponentProps<"div">, PropsWithChildren {}
import MessageComponent from "./message-component";
import { cn } from "@/lib/utils";
export default function ChatComponent({
  children,
  ...resProps
}: ChatComponentProps) {
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
