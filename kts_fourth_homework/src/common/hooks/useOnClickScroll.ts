import React, { RefObject, useState, useEffect } from "react";

const useOnClickScroll = (ref: RefObject<HTMLDivElement>) => {
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(true);

  const calculateScrollValue = () => {
    if (!ref.current) return 0; // Проверка на null
    const portions = Math.ceil(
      ref.current.scrollWidth / ref.current.clientWidth
    );
    return Math.ceil(ref.current.scrollWidth / portions);
  };

  const scrollToEnd = () => {
    if (!ref.current) return; // Проверка на null
    const scrollValue = ref.current.scrollLeft + calculateScrollValue();
    ref.current.scrollLeft = scrollValue;
    isScrollHandler(Math.round(scrollValue));
  };

  const scrollToStart = () => {
    if (!ref.current) return; // Проверка на null
    const scrollValue = ref.current.scrollLeft - calculateScrollValue();
    ref.current.scrollLeft = scrollValue;
    isScrollHandler(Math.round(scrollValue));
  };

  const isScrollHandler = (scrollValue: number) => {
    if (!ref.current) return; // Проверка на null
    const maxScrollWidth = ref.current.scrollWidth - ref.current.clientWidth;
    setCanScrollStart(scrollValue > 0);
    setCanScrollEnd(scrollValue < maxScrollWidth);
  };

  // Используем useEffect для инициализации состояния прокрутки
  useEffect(() => {
    if (ref.current) {
      isScrollHandler(ref.current.scrollLeft);
    }
  }, [ref]);

  return {
    scrollToStart,
    scrollToEnd,
    canScroll: { start: canScrollStart, end: canScrollEnd },
  };
};
export default useOnClickScroll;
