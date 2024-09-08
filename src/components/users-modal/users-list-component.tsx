import { ComponentProps, PropsWithChildren, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useUserStore from "@/zustand/use-user-store";
import { addUserChat } from "@/firebase/chat-utils";
import { getAllUser } from "@/firebase/user-utils";
import type { User, UserItem } from "@/types/user-types";
import useUsersModal from "@/zustand/use-users-modal";
import useBody from "@/zustand/use-body";
import { toast } from "react-toastify";
// import useChatStore from "@/zustand/user-chat-store";
import useAppShell from "@/zustand/use-app-shell";
// import { Button } from "@mantine/core";
// import useChatStore from "@/zustand/user-chat-store";
interface UsersListComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function UsersListComponent({
  children,
  ...resProps
}: UsersListComponentProps) {
  const { handleClost } = useUsersModal();
  const [users, setUsers] = useState<UserItem[]>([]);
  const { currentUser } = useUserStore();
  const { setCurrentActive } = useBody();
  // const { startChat } = useChatStore();
  const { handleOpen } = useAppShell();

  async function handleAddChat(selectedUser: User) {
    try {
      addUserChat(currentUser?.id ?? "", selectedUser?.id ?? "");
      handleClost();
      setCurrentActive("chat");
      handleOpen();
    } catch (err) {
      toast.error("failed to start conversation");
    }
  }

  useEffect(() => {
    getAllUser(currentUser as User).then((d) => {
      setUsers(d);
    });
  }, []);

  function handdleChatWithFriends() {
    handleClost();
    handleOpen();
  }

  return (
    <div className={cn("  ", " px-4 py-6 rounded-sm")} {...resProps}>
      {users.length > 0 && (
        <>
          {users.map((u, id) => (
            <div
              key={id}
              className={cn(
                "flex justify-between  gap-4 my-2",
                u.isFriends && "  "
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-[30px] h-[30px]">
                  <img src={"./avatar.png"} alt="" />
                </div>
                <span>{u.username}</span>
              </div>
              {!u.isFriends ? (
                <button
                  disabled={u.isFriends}
                  onClick={handleAddChat.bind(null, u)}
                  className="bg-gray-950 px-6 "
                >
                  Start Conversation
                </button>
              ) : (
                <p className="bg-blue-400 px-6">Already Friends</p>
              )}
            </div>
          ))}
        </>
      )}

      <button
        className="md:hidden bg-blue-600 w-full mt-10 "
        onClick={handdleChatWithFriends}
      >
        Chat With Friends
      </button>
    </div>
  );
}
