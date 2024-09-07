import { useEffect, useRef, useState } from "react";

export default function useSpeekToText(callback = (_text: string) => {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(new webkitSpeechRecognition());

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("it's not support");
      return;
    }

    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.continuous = false;
    if ("webkitSpeechRecognition" in window) {
      const grammer =
        "#JSGF v1.0; grammer punctuation; public <punc> = . | , ? | ! | ; | : ;";
      const speechRecognitionList = new webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammer);
      recognitionRef.current.grammars = speechRecognitionList;
    }

    recognitionRef.current.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
      //   console.log(text);
      callback(text);
    };

    recognitionRef.current.onerror = () => {
      //   console.log("get an error");
    };
    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognitionRef.current.stop();
    };
  }, []);

  function startListening() {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }

  function stopListening() {
    if (recognitionRef.current && isListening) {
      //   console.log("get call");
      recognitionRef.current.stop();
      setIsListening(false);
      // setTranscript("");
    }
  }

  return {
    startListening,
    stopListening,
    transcript,
    isListening,
  };
}
