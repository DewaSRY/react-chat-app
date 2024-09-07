import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import { Burger } from "@mantine/core";
import useAppShell from "@/zustand/use-app-shell";
import useUserStore from "@/zustand/use-user-store";
export default function UserInfoComponent() {
  const { currentUser, userLogout } = useUserStore();
  const { opened, handleToggle } = useAppShell();

  return (
    <div className="text-white my-4 flex justify-between">
      <div className="flex gap-1 ">
        <div className=" w-[30px] h-[30px] ">
          <img src={currentUser?.avatar || "/avatar.png"} alt="" />
        </div>
        <h2 className="text-lg">{currentUser?.username}</h2>
      </div>
      <div
        className={cn(
          "flex justify-between items-center text-sm gap-2",
          "[&>svg]:font-sm"
        )}
      >
        <button onClick={userLogout}>Logout</button>
        <Ellipsis />
        <Burger
          opened={opened}
          onClick={handleToggle}
          hiddenFrom="sm"
          size="lg"
        />
      </div>
    </div>
  );
}
