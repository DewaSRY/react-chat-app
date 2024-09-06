import { ComponentProps, PropsWithChildren } from "react";

interface UserItemComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function UserItemComponent({
  children,
  ...resProps
}: UserItemComponentProps) {
  return (
    <div {...resProps} className="py-2 border-b-[1px] border-gray-50">
      <div className="flex py-2 gap-2">
        <div className="w-[30px] h-[30px]">
          <img className="" src="/avatar.png" alt="" />
        </div>
        <span>Jhane Deo Friends</span>
      </div>
      <div>
        <p>Hallo bro</p>
      </div>
    </div>
  );
}
