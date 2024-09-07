import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useUserStore from "@/zustand/use-user-store";
import { addUserChat } from "@/firebase/chat-utils";
import { getAllUser } from "@/firebase/user-utils";
import type { User } from "@/types/user-types";
import { Button } from "@mantine/core";

export default function AddUserComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const { currentUser } = useUserStore();

  async function handleAddChat(selectedUser: User) {
    try {
      addUserChat(currentUser?.id ?? "", selectedUser?.id ?? "");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllUser(currentUser as User).then(setUsers);
  }, []);

  return (
    <div className={cn("  ", " px-4 py-6 rounded-sm")}>
      {/* <form className="flex mb-10 gap-1 justify-between">
        <input
          className="flex-1"
          type="text"
          placeholder="searc user "
          name="username"
        />
        <Button>Search</Button>
      </form> */}
      {users.length && (
        <>
          {users.map((u, id) => (
            <div key={id} className="flex justify-between  gap-4 my-2">
              <div className="flex items-center gap-4">
                <div className="w-[30px] h-[30px]">
                  <img src={"./avatar.png"} alt="" />
                </div>
                <span>{u.username}</span>
              </div>

              <button
                onClick={handleAddChat.bind(null, u)}
                className="bg-gray-950 px-6 py-"
              >
                Start Conversation
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
