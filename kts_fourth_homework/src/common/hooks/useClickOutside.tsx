import { useEffect, useRef, useState } from "react";

export const useClickOutside = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (!isShow) {
      return;
    }

    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsShow(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isShow]);

  const onShow = () => setIsShow((prev) => !prev);

  return { ref, isShow, onShow };
};
