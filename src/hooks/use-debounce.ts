import React, { useEffect, useState } from "react";

export default function useDebounce(callback: (value: string) => void) {
  const [v, setV] = useState("");

  useEffect(() => {
    const timeId = setTimeout(() => {
      callback(v);
    }, 100);

    return () => {
      clearTimeout(timeId);
    };
  }, [v, callback]);

  function handleVChange(e: React.ChangeEvent<HTMLInputElement>) {
    setV(e.target.value);
  }

  return {
    v,
    handleVChange,
  };
}
