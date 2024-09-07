import React, { useEffect, useState } from "react";
import { clearTimeout } from "timers";

export default function useDebaunce(callbac: (value: string) => void) {
  const [v, setV] = useState("");

  useEffect(() => {
    let timeId = setTimeout(() => {
      callbac(v);
    }, 500);

    return () => {
      clearTimeout(timeId);
    };
  }, [v]);

  function handleVChange(e: React.ChangeEvent<HTMLInputElement>) {
    setV(e.target.value);
  }

  return {
    v,
    handleVChange,
  };
}
