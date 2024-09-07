import { cn } from "@/lib/utils";
import { Minus, Plus, Search } from "lucide-react";
import React, {
  ComponentProps,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import UserItemComponent from "./user-item-component";
import AddUserComponent from "./add-user-component";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import useUserStore from "@/zustand/use-user-store";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, USER_CHAT_DB, USER_DB } from "@/firebase/utils";
import type { UserChat } from "@/types/chat-types";
import type { User } from "@/types/user-types";
interface ChatListComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

interface UserResponse {
  user: User;
  chatId: string;
  lastMessage: string;
  receiverId: string;
  updatedAt: number;
}

export default function ChatListComponent({
  children,
  ...resProps
}: ChatListComponentProps) {
  const [isAdd, setisAdd] = useState(false);
  // const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  // const { chatId, changeChat } = useChatStore();
  const [chats, setChats] = useState<UserResponse[]>([]);
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, USER_CHAT_DB, currentUser?.id || ""),
      async (res) => {
        if (!res.data()) return;
        const items = res.data() as UserChat;

        const promises = items.chats.map(async (item) => {
          const userDocRef = doc(db, USER_DB, item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const userData = userDocSnap.data() as User;
          return { ...item, user: userData } as UserResponse;
        });

        let chatData = await Promise.all(promises);
        function userChatComparator(a: UserResponse, b: UserResponse) {
          if (a.updatedAt || b.updatedAt) return 0;
          return b.updatedAt - a.updatedAt;
        }
        chatData = chatData.sort(userChatComparator);

        setChats(chatData);
        // console.log(chatData);
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);
  return (
    <div className=" ">
      {/* Search  */}
      <div className="search">
        <form
          action=""
          className={cn(
            "flex  bg-gray-800/90 relative rounded-md items-center"
          )}
        >
          <Search className=" " />
          <input
            className={cn(
              "flex-1 pr-6 rounded-sm text-gray-50 text-wrap outline-none border-0 p-1",
              "bg-transparent "
            )}
            type="text"
          />

          <Dialog>
            <DialogTrigger>
              <div
                onClick={setisAdd.bind(null, !isAdd)}
                className={cn(
                  "[&>svg]:active:translate-y-[10%] ",
                  "text-lg   cursor-pointer duration-200 "
                )}
              >
                {isAdd ? <Plus /> : <Minus />}
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <AddUserComponent />
            </DialogContent>
          </Dialog>
        </form>
      </div>
      <div className="h-[70vh] overflow-y-scroll no-scrollbar ">
        <div className="overflow-y-auto max-h-full ">
          <UserItemComponent />
          {chats.length > 0 && (
            <>
              {chats.map((c, id) => (
                <React.Fragment key={id}> {c.user.username}</React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
