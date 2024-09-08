import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Button, Tooltip } from "@mantine/core";
import { startChatGemini } from "@/firebase/gemini-utils";
import useBody from "@/zustand/use-body";
// interface StartGeminiComponentProps
//   extends ComponentProps<"button">,
//     PropsWithChildren {}

export default function StartGeminiComponent() {
  const { setCurrentActive } = useBody();
  useEffect(() => {
    startChatGemini();
  }, []);

  return (
    <Tooltip label="Chat with Gemini">
      <Button onClick={setCurrentActive.bind(null, "gemini")}>
        <Sparkles />
      </Button>
    </Tooltip>
  );
}
