import { cn } from "./lib/utils";
import ListComponent from "./components/list/list-component";
import ChatComponent from "./components/chat/chat-component";
import DetailComponent from "./components/detail/detail-component";
import LoginComponent from "./components/login/login-component";
import NotificationComponent from "./components/notification/notification-component";
import { onAuthStateChanged } from "firebase/auth";
import useUserStore from "@/zustand/use-user-store";
import { useEffect } from "react";
import { auth } from "./firebase/utils";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function App() {
  const { currentUser, fetchUserInfo, isLoading } = useUserStore();
  const [opened, { toggle }] = useDisclosure(currentUser === null);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        fetchUserInfo(user?.uid);
      }
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Logo</div>
        </AppShell.Header>

        {currentUser && (
          <AppShell.Navbar className="" p="md">
            <ListComponent />
          </AppShell.Navbar>
        )}

        <AppShell.Main>
          {currentUser?.id.length ? (
            <>
              <ChatComponent />
            </>
          ) : (
            <LoginComponent />
          )}
        </AppShell.Main>
      </AppShell>
      <NotificationComponent />
    </>
  );
}

export default App;
