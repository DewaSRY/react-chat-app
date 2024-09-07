import { ComponentProps, PropsWithChildren } from "react";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface EmojiMenuComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {
  handlePick: (emoji: string) => void;
}

export default function EmojiMenuComponent({
  children,
  handlePick,
  ...resProps
}: EmojiMenuComponentProps) {
  function handleEmojiClick(emoji: EmojiClickData) {
    handlePick(emoji.emoji);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2  text-2xl active:translate-y-[10%] duration-150  ">
        <span className="" {...resProps}>
          😎
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
