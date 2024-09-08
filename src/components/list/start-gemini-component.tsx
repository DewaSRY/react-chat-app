import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Button, Tooltip } from "@mantine/core";
import { startChatGemini } from "@/firebase/gemini-utils";
import useBody from "@/zustand/use-body";
import useUserStore from "@/zustand/use-user-store";
// interface StartGeminiComponentProps
//   extends ComponentProps<"button">,
//     PropsWithChildren {}

export default function StartGeminiComponent() {
  const { setCurrentActive } = useBody();
  const { currentUser } = useUserStore();
  useEffect(() => {
    if (currentUser) {
      startChatGemini(currentUser.id);
    }
  }, []);

  return (
    <Tooltip label="Chat with Gemini">
      <Button onClick={setCurrentActive.bind(null, "gemini")}>
        <Sparkles />
      </Button>
    </Tooltip>
  );
}
