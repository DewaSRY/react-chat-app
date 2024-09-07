import { db, USER_DB, CHAT_DB, USER_CHAT_DB } from "@/firebase/utils";
import { cn } from "@/lib/utils";
// import { User } from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { where } from "firebase/firestore/lite";
import React, { ComponentProps, PropsWithChildren, useState } from "react";
import type { User } from "@/types/user-types";
import useUserStore from "@/zustand/use-user-store";
interface AddUserComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function AddUserComponent({
  children,
  ...resProps
}: AddUserComponentProps) {
  const [user, setUser] = useState<User | null>(null);
  const { currentUser } = useUserStore();

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    if (!formElement) return;
    const formData = new FormData(formElement);
    const userName = formData.get("username")?.toString() ?? "";
    try {
      const userRef = collection(db, USER_DB);
      const q = query(userRef, where("username", "==", userName));
      const querySnapShot = await getDocs(q);
      if (!querySnapShot.empty && querySnapShot.docs) {
        const data = querySnapShot.docs[0].data() as User;
        setUser(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleAdd = async () => {
    const chatRef = collection(db, CHAT_DB);
    const userChatsRef = collection(db, USER_CHAT_DB);

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user?.id ?? ""), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser?.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser?.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user?.id ?? "",
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={cn(" top-4 right-5  ", "bg-white/10 px-4 py-6 rounded-sm")}>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="flex flex-col gap-4 my-2">
          <div className="flex items-center gap-4">
            <div className="w-[30px] h-[30px]">
              <img src={"./avatar.png"} alt="" />
            </div>
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd} className="bg-green-500 px-6 py-">
            Add User
          </button>
        </div>
      )}
    </div>
  );
}
