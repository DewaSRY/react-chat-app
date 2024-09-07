import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import UserItemComponent from "./user-item-component";

import useUserStore from "@/zustand/use-user-store";
import { doc, onSnapshot } from "firebase/firestore";
import { db, USER_CHAT_DB } from "@/firebase/utils";
import type { UserChat } from "@/types/chat-types";
import { getMessageItems } from "@/firebase/chat-utils";
import useFriendsItems from "@/zustand/use-friends-items";
import FilterFriendsComponent from "./filter-friends-component";
export default function ChatListComponent() {
  const { setMessageItem, itemList } = useFriendsItems();

  const { currentUser } = useUserStore();
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, USER_CHAT_DB, currentUser?.id || ""),
      async (res) => {
        if (!res.data()) return;
        const userChat = res.data() as UserChat;
        const chatData = await getMessageItems(userChat);
        setMessageItem(chatData);
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser?.id]);
  return (
    <div className=" ">
      <FilterFriendsComponent />
      <div className="h-[70vh] overflow-y-scroll no-scrollbar ">
        <div className="overflow-y-auto max-h-full ">
          {itemList.length > 0 && (
            <>
              {itemList.map((c, id) => (
                <React.Fragment key={id}>
                  <UserItemComponent messageItem={c} />
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
