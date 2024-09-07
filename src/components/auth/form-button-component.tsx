import { PropsWithChildren } from "react";
// import { Button } from "@mantine/core";
export default function FormButtonComponent({
  isSubmited,
  children,
}: PropsWithChildren & { isSubmited: boolean }) {
  return (
    <button disabled={isSubmited} className="bg-green-500">
      {isSubmited ? <p>Loading</p> : <> {children}</>}
    </button>
  );
}
