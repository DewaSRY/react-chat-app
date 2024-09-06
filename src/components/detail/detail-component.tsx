import { ComponentProps, PropsWithChildren } from "react";

interface DetailComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function DetailComponent({
  children,
  ...resProps
}: DetailComponentProps) {
  return <div>{children}</div>;
}
