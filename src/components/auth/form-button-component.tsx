import { PropsWithChildren } from "react";
export default function FormButtonComponent({
  isSubmited,
  children,
}: PropsWithChildren & { isSubmited: boolean }) {
  return (
    <button
      disabled={isSubmited}
      className="bg-green-500 text-gray-100 py-2 font-black"
    >
      {isSubmited ? <p>Loading</p> : <> {children}</>}
    </button>
  );
}
