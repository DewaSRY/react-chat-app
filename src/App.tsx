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
function App() {
  const { currentUser, fetchUserInfo, isLoading } = useUserStore();

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
    <div
      className={cn(
        "my-[5vh] mx-auto py-8 px-4 w-[90vw] h-[90vh] ",
        "bg-gray-700/80 rounded-2xl backdrop-blur-sm saturate-[180%] ",
        ""
      )}
    >
      {currentUser ? (
        <div className="flex gap-1 ">
          <ListComponent />
          <ChatComponent />
          <DetailComponent />
        </div>
      ) : (
        <LoginComponent />
      )}

      {/* <ToastContainer /> */}
      <NotificationComponent />
    </div>
  );
}

export default App;
