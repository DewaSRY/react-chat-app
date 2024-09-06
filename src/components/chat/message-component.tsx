import { ComponentProps, PropsWithChildren } from "react";
import { format } from "timeago.js";
interface MessageComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function MessageComponent({
  children,
  ...resProps
}: MessageComponentProps) {
  return (
    <div className="px-2 py-4 flex w-full ">
      <div className="">
        <p className=" self-end w-[400px] p-2 bg-blue-400/30 rounded-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, veniam
          consequuntur voluptas enim consectetur praesentium nostrum quo porro a
          fuga accusamus doloremque sed earum excepturi distinctio! Nostrum,
          dolore nesciunt.
        </p>
        <span className="text-sm text-gray-400">{format(new Date())}</span>
      </div>
    </div>
  );
}
