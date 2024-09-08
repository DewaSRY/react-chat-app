import {
  ComponentRef,
  HTMLAttributes,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const TextToSpeachContext = createContext({
  selectedRef: null as React.RefObject<HTMLSelectElement> | null,
  isReading: false as boolean,
  readText: (_text: string) => {},
  voices: [] as SpeechSynthesisVoice[],
  setVoices: (_voiceIdx: number) => {},
});

TextToSpeachContext.displayName = " text-to-speach context";

interface ProviderProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}
export default function Provider({ children }: ProviderProps) {
  const selectedRef = useRef<ComponentRef<"select">>(null);
  const speeachRef = useRef(new SpeechSynthesisUtterance());
  const [voices, iniVoices] = useState<SpeechSynthesisVoice[]>([]);

  const [isReading, setisReading] = useState(false);

  function readText(text: string) {
    if (!isReading) {
      speeachRef.current.text = text;
      speeachRef.current.onend = () => {
        setisReading(false);
      };
      window.speechSynthesis.speak(speeachRef.current);
      setisReading(true);
    } else {
      window.speechSynthesis.cancel();
      setisReading(false);
    }
  }

  useEffect(() => {
    iniVoices(window.speechSynthesis.getVoices());
    // console.log(window.speechSynthesis.getVoices());
    window.speechSynthesis.onvoiceschanged = () => {
      if (speeachRef.current) {
        speeachRef.current.voice = voices[0];
      }
    };
  }, []);

  function setVoices(voiceIndex: number) {
    speeachRef.current.voice = voices[voiceIndex];
  }

  return (
    <TextToSpeachContext.Provider
      value={{
        selectedRef,
        isReading,
        readText,
        voices,
        setVoices,
      }}
    >
      {children}
    </TextToSpeachContext.Provider>
  );
}
export function usetextToSpeach() {
  const context = useContext(TextToSpeachContext);

  if (!context) throw Error("use hook inside  text-to-speach provider");

  return context;
}
