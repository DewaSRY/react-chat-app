import { useEffect } from "react";

import useUserStore from "@/zustand/use-user-store";
import { doc, onSnapshot } from "firebase/firestore";
import { db, USER_CHAT_DB } from "@/firebase/utils";
import type { UserChat } from "@/types/chat-types";
import { getMessageItems } from "@/firebase/chat-utils";
import useFriendsItems from "@/zustand/use-friends-items";
import FilterFriendsComponent from "./filter-friends-component";
import FriendListComponent from "@/components/friend-list/friend-list-component";
import AddFriendsComponent from "./add-friends-component";
export default function ListComponent() {
  const { setMessageItem } = useFriendsItems();

  const { currentUser } = useUserStore();
  useEffect(() => {
    if (!currentUser) return;
    const unSub = onSnapshot(
      doc(db, USER_CHAT_DB, currentUser?.id),
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
      <AddFriendsComponent />
      <FriendListComponent />
    </div>
  );
}
