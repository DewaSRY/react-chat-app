import { ComponentProps, PropsWithChildren } from "react";

interface ChatListComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function ChatListComponent({
  children,
  ...resProps
}: ChatListComponentProps) {
  return <div>{children}</div>;
}
