import { ComponentProps, PropsWithChildren } from "react";
import useFriendsItems from "@/zustand/use-friends-items";

import UserItemComponent from "./user-item-component";

interface FriendListComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function FriendListComponent({
  children,
  ...resProps
}: FriendListComponentProps) {
  const { itemList } = useFriendsItems();

  return (
    <div className="h-[80vh] overflow-y-scroll no-scrollbar ">
      <div className="overflow-y-auto max-h-full ">
        {itemList.length > 0 && (
          <>
            {itemList.map((c, id) => (
              <UserItemComponent key={id} messageItem={c} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
