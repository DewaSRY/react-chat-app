import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Button, Tooltip } from "@mantine/core";
import { startChatGemini } from "@/firebase/gemini-utils";
import useBody from "@/zustand/use-body";
import useUserStore from "@/zustand/use-user-store";
import useAppShell from "@/zustand/use-app-shell";
// interface StartGeminiComponentProps
//   extends ComponentProps<"button">,
//     PropsWithChildren {}

export default function StartGeminiComponent() {
  const { setCurrentActive } = useBody();
  const { currentUser } = useUserStore();
  const { handleClost } = useAppShell();
  useEffect(() => {
    if (currentUser) {
      startChatGemini(currentUser.id);
    }
  }, []);

  function handelStartGemini() {
    handleClost();
    setCurrentActive("gemini");
  }

  return (
    <Tooltip label="Chat with Gemini">
      <Button onClick={handelStartGemini}>
        <Sparkles />
      </Button>
    </Tooltip>
  );
}
