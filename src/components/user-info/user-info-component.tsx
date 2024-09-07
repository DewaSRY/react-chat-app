import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import { Burger } from "@mantine/core";
import useAppShell from "@/zustand/use-app-shell";
import useUserStore from "@/zustand/use-user-store";
import useUsersSetting from "@/zustand/use-users-setting";
export default function UserInfoComponent() {
  const { currentUser } = useUserStore();
  const { opened, handleToggle } = useAppShell();
  const { handleOpen: settingOpen } = useUsersSetting();

  return (
    <div className="text-white my-4 flex justify-between">
      <div className="flex gap-1 ">
        <div className=" w-[30px] h-[30px] ">
          <img src={"/avatar.png"} alt="" />
        </div>
        <h2 className="text-lg">{currentUser?.username}</h2>
      </div>
      <div
        className={cn(
          "flex justify-between items-center text-sm gap-2",
          "[&>svg]:font-sm"
        )}
      >
        <Ellipsis onClick={settingOpen} />
        <Burger
          opened={opened}
          onClick={handleToggle}
          hiddenFrom="sm"
          size="lg"
          className="cursor-pointer  top-2 right-2 z-50"
        />
      </div>
    </div>
  );
}
