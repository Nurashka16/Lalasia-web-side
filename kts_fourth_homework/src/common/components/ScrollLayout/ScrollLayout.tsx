import React, { useCallback, useRef, useState } from "react";
import classNames from "classnames";
import { ScrollIcon } from "./ScrollIcon/ScrollIcon";
import LeftArrow from "src/common/components/Carousel/Icons/LeftArrowIcon";
import RightArrow from "src/common/components/Carousel/Icons/RightArrowIcon";
import style from "./ScrollScrollLayout.module.css";
import useOnClickScroll from "src/common/hooks/useOnClickScroll";

interface IScrollLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollLayout = ({ children, className }: IScrollLayoutProps) => {
  const ref = useRef(null!);
  const [isOpacity, setIsOpacity] = useState(false);
  const { scrollToStart, scrollToEnd, canScroll } = useOnClickScroll(ref);

  const handleMouseEnter = useCallback(() => setIsOpacity(true), []);
  const handleMouseLeave = useCallback(() => setIsOpacity(false), []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames(className)}
    >
      {canScroll.start && (
        <ScrollIcon onClick={scrollToStart} isOpacity={isOpacity}>
          <LeftArrow />
        </ScrollIcon>
      )}
      <div className={style.content} ref={ref}>
        {children}
      </div>

      {canScroll.end && (
        <ScrollIcon onClick={scrollToEnd} isOpacity={isOpacity}>
          <RightArrow />
        </ScrollIcon>
      )}
    </div>
  );
};

export default ScrollLayout;
