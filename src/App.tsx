import { cn } from "./lib/utils";
import { ToastContainer, toast } from "react-toastify";
import ListComponent from "./components/list/list-component";
import ChatComponent from "./components/chat/chat-component";
import DetailComponent from "./components/detail/detail-component";
import LoginComponent from "./components/login/login-component";
import NotificationComponent from "./components/notification/notification-component";
function App() {
  return (
    <div
      className={cn(
        "my-[5vh] mx-auto py-8 px-4 w-[90vw] h-[90vh] ",
        "bg-gray-700/80 rounded-2xl backdrop-blur-sm saturate-[180%] ",
        "relative"
      )}
    >
      {/* <div className="flex gap-1 ">
        <ListComponent />
        <ChatComponent />
        <DetailComponent />
      </div> */}
      <LoginComponent />
      {/* <ToastContainer /> */}
      <NotificationComponent />
    </div>
  );
}

export default App;
