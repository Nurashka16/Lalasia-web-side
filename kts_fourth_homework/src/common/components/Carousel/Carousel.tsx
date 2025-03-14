import React from "react";
import style from "./Carousel.module.css";
import classNames from "classnames";
import Button from "src/common/components/Button";
import LeftArrow from "./Icons/LeftArrowIcon";
import RightArrow from "./Icons/RightArrowIcon";

interface IImagesProps {
  currentItem: number;
  maxCountItem: number;
  children: React.ReactNode;
  onClick: (value: number) => void;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
}
const Carousel = ({
  currentItem = 1,
  maxCountItem,
  children,
  onClick,
  className,
  isActive = true,
  disabled = false,
}: IImagesProps) => {

  return (
    <div className={style.carousel}>
      <Button
        disabled={disabled || currentItem < 2}
        onClick={() => onClick(currentItem - 1)}
        className={classNames(
          style.carousel_icon,
          isActive && style.carousel_icon__active,
          className
        )}
      >
        <LeftArrow />
      </Button>
      {children}
      <Button
        disabled={disabled || currentItem == maxCountItem}
        onClick={() => onClick(currentItem + 1)}
        className={classNames(
          style.carousel_icon,
          style.carousel_icon__right,
          isActive && style.carousel_icon__active,
          className
        )}
      >
        <RightArrow />
      </Button>
    </div>
  );
};

export default Carousel;
