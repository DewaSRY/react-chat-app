import useUserStore from "@/zustand/use-user-store";
import { ComponentProps, PropsWithChildren } from "react";
import { Button } from "@mantine/core";
import useUsersSetting from "@/zustand/use-users-setting";
interface SettingPanelComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function SettingPanelComponent({
  children,
  ...resProps
}: SettingPanelComponentProps) {
  const { currentUser, userLogout } = useUserStore();
  const { handleClost } = useUsersSetting();

  function handleLogOut() {
    handleClost();
    userLogout();
  }
  return (
    <div
      key={currentUser?.id}
      className=" items-center gap-3 py-2 relative "
      {...resProps}
    >
      <div key={currentUser?.avatar} className="w-[100px] h-[100px] my-2">
        <img src={"/avatar.png"} alt={currentUser?.username} />
      </div>

      <div className="flex-1">
        <h2 className="">
          <span className="mr-4">User Name :</span>
          <span>{currentUser?.username}</span>
        </h2>
        <h2 className="">
          <span className="mr-4">Email :</span>
          <span>{currentUser?.email}</span>
        </h2>
      </div>
      {/* <h2>
        <span>User Name</span>
        <span>{currentUser?.username}</span>
      </h2> */}
      <Button
        className="absolute mt-10 w-full"
        color="red"
        variant="outline"
        onClick={handleLogOut}
      >
        Logout
      </Button>
    </div>
  );
}
