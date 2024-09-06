import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";

interface AddUserComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function AddUserComponent({
  children,
  ...resProps
}: AddUserComponentProps) {
  const user = true;

  return (
    <div className={cn(" top-4 right-5  ", "bg-white/10 px-4 py-6 rounded-sm")}>
      <form>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="flex flex-col gap-4 my-2">
          <div className="flex items-center gap-4">
            <div className="w-[30px] h-[30px]">
              <img src={"./avatar.png"} alt="" />
            </div>
            <span>Jhane Deo</span>
          </div>
          <button className="bg-green-500 px-6 py-">Add User</button>
        </div>
      )}
    </div>
  );
}
