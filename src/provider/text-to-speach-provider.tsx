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
  const voicesRef = useRef(window.speechSynthesis.getVoices());

  const [isReading, setisReading] = useState(false);
  // const [voices, setAllvoices] = useState<SpeechSynthesisVoice[]>(
  //   window.speechSynthesis.getVoices()
  // );

  function readText(text: string) {
    speeachRef.current.text = text;
    speeachRef.current.onend = () => {
      setisReading(false);
    };
    window.speechSynthesis.speak(speeachRef.current);
    setisReading(true);
  }

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      // setAllvoices(window.speechSynthesis.getVoices());
      if (speeachRef.current) {
        speeachRef.current.voice = voicesRef.current[0];
      }
    };
  }, []);

  function setVoices(voiceIndex: number) {
    // if (voices?.length) {
    speeachRef.current.voice = voicesRef.current[voiceIndex];
    // }
  }

  // useEffect(() => {
  //   let time = setTimeout(() => {
  //     if (selectedRef.current) {
  //       voices.forEach((v, idx) => {
  //         selectedRef.current!.options[idx] = new Option(
  //           v.name,
  //           idx.toString()
  //         );
  //       });
  //     }
  //   }, 500);

  //   return () => {
  //     clearTimeout(time);
  //   };
  // }, []);

  // useEffect(() => {
  //   function selectedVoice() {
  //     if (selectedRef.current && speeachRef.current) {
  //       speeachRef.current.voice =
  //         voices[parseInt(selectedRef.current.value ?? 0)];
  //     }
  //   }

  //   if (selectedRef.current) {
  //     selectedRef.current.addEventListener("change", selectedVoice);
  //   }

  //   return () => {
  //     if (selectedRef.current) {
  //       selectedRef.current.removeEventListener("change", selectedVoice);
  //     }
  //   };
  // }, []);

  return (
    <TextToSpeachContext.Provider
      value={{
        selectedRef,
        isReading,
        readText,
        voices: voicesRef.current,
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
