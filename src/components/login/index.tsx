import { ComponentProps, PropsWithChildren } from "react";

interface indexProps extends ComponentProps<"div">, PropsWithChildren {}

export default function index({ children, ...resProps }: indexProps) {
  return <div>{children}</div>;
}
