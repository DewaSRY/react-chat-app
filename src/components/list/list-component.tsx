// import { ComponentProps, PropsWithChildren } from "react";
import UserInfoComponent from "./user-info-component";
import ChatListComponent from "./chat-list-component";

// interface ListComponentProps extends ComponentProps<"div">, PropsWithChildren {}

export default function ListComponent() {
  return (
    <div className="max-w-[300px] bg-transparent h-max text-white ">
      <UserInfoComponent />
      <ChatListComponent />
    </div>
  );
}
