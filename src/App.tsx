import ListComponent from "./components/list/list-component";
import ChatComponent from "./components/chat/chat-component";
import UserInfoComponent from "./components/user-info/user-info-component";
import NotificationComponent from "./components/notification/notification-component";
import UserSettingComponent from "./components/user-setting/user-setting-component";
import { onAuthStateChanged } from "firebase/auth";
import useUserStore from "@/zustand/use-user-store";
import { useEffect } from "react";
import { auth } from "./firebase/utils";
import { AppShell, Burger } from "@mantine/core";
import AuthComponent from "./components/auth/auth-component";
import UsersModalComponent from "@/components/users-modal/users-modal-component";
import useAppShell from "./zustand/use-app-shell";
import { initNotifivation } from "@/firebase/fcm-utils";
import { toast } from "react-toastify";
function App() {
  const { currentUser, fetchUserInfo, isLoading } = useUserStore();
  const { opened, handleToggle } = useAppShell();

  useEffect(() => {
    toast.warn("try to fetch user ");
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        fetchUserInfo(user?.uid);
        initNotifivation();
        toast.success("you are singin");
      } else {
        toast.warn("please singup first");
      }
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <>
      {currentUser ? (
        <>
          <div className="fixed top-2 right-1 cursor-pointer ">
            <Burger
              opened={opened}
              onClick={handleToggle}
              hiddenFrom="sm"
              size="xl"
            />
          </div>
          <AppShell
            navbar={{
              width: 300,
              breakpoint: "sm",
              collapsed: { mobile: !opened },
            }}
            padding="md"
          >
            <AppShell.Navbar className="" p="md">
              <UserInfoComponent />
              <ListComponent />
            </AppShell.Navbar>

            <AppShell.Main>
              <ChatComponent />
            </AppShell.Main>
          </AppShell>
        </>
      ) : (
        <AuthComponent />
      )}
      <NotificationComponent />
      <UsersModalComponent />
      <UserSettingComponent />
    </>
  );
}

export default App;
