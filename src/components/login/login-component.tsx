import { ComponentProps, PropsWithChildren } from "react";

interface LoginComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function LoginComponent({
  children,
  ...resProps
}: LoginComponentProps) {
  return <div>{children}</div>;
}
