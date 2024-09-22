import { useEffect, useRef, useState } from 'react';

export const useClickOutside = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (!isShow) {
      return;
    }
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [isShow]);

  const handler = (e: any) => {
    if (!ref.current?.contains(e.target)) {
      setIsShow(false);
    }
  };
  const onShow = () => setIsShow((prev) => !prev);
  return { ref, isShow, onShow };
};
