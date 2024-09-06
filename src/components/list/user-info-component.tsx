// import { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Ellipsis, Video, Pencil, User } from "lucide-react";
// interface UserInfoComponentProps
//   extends ComponentProps<"div">,
//     PropsWithChildren {}

export default function UserInfoComponent() {
  return (
    <div className="text-white my-4 flex justify-between">
      {/* User  */}
      <div className="flex gap-4 tex-2xl ">
        <User />
        <h2>Jhone Deo</h2>
      </div>
      {/* Icons */}
      <div
        className={cn(
          "flex justify-between items-end text-sm gap-2",
          "[&>svg]:font-sm"
        )}
      >
        <Video />
        <Pencil />
        <Ellipsis />
      </div>
    </div>
  );
}
