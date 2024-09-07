import React, { useState } from "react";
import { cn } from "@/lib/utils";
import useUserStore from "@/zustand/use-user-store";
import { addUserChat } from "@/firebase/chat-utils";
import { searchUser } from "@/firebase/user-utils";
import type { User } from "@/types/user-types";

export default function AddUserComponent() {
  const [user, setUser] = useState<User | null>(null);
  const { currentUser } = useUserStore();

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    if (!formElement) return;
    const formData = new FormData(formElement);
    const userName = formData.get("username")?.toString() ?? "";
    try {
      const getUser = await searchUser(userName);
      setUser(getUser);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleAddChat() {
    try {
      addUserChat(currentUser?.id ?? "", user?.id ?? "");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={cn(" top-4 right-5  ", "bg-white/10 px-4 py-6 rounded-sm")}>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="searc user " name="username" />
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
          <button onClick={handleAddChat} className="bg-green-500 px-6 py-">
            Start Conversation
          </button>
        </div>
      )}
    </div>
  );
}
