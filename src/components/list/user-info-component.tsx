// import { ComponentProps, PropsWithChildren } from "react";
import { Ellipsis, Video, Pencil, User } from "lucide-react";
// interface UserInfoComponentProps
//   extends ComponentProps<"div">,
//     PropsWithChildren {}

export default function UserInfoComponent() {
  return (
    <div>
      {/* User  */}
      <div>
        <User />
        <h2>Jhone Deo</h2>
      </div>
      {/* Icons */}
      <div>
        <Ellipsis />
        <Video />
        <Pencil />
      </div>
    </div>
  );
}
