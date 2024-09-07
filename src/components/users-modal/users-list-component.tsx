import { ComponentProps, PropsWithChildren, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useUserStore from "@/zustand/use-user-store";
import { addUserChat } from "@/firebase/chat-utils";
import { getAllUser } from "@/firebase/user-utils";
import type { User } from "@/types/user-types";
interface UsersListComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function UsersListComponent({
  children,
  ...resProps
}: UsersListComponentProps) {
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
    <div className={cn("  ", " px-4 py-6 rounded-sm")} {...resProps}>
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
