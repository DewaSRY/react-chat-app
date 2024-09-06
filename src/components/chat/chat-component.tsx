import { ComponentProps, PropsWithChildren } from "react";

interface ChatComponentProps extends ComponentProps<"div">, PropsWithChildren {}

export default function ChatComponent({
  children,
  ...resProps
}: ChatComponentProps) {
  return <div>{children}</div>;
}
