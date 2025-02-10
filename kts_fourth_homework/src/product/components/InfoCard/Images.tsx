import React, { useEffect, useState } from "react";
import style from "./InfoCard.module.css";
import classNames from "classnames";
import LeftArrow from "src/common/components/Pagination/svg/LeftArrow";
import RightArrow from "src/common/components/Pagination/svg/RightArrow";

interface IImagesProps {
  currentItem: number;
  maxCountItem: number;
  children?: React.ReactNode;
  images: string[];
}
const Images = ({
  currentItem = 0,
  maxCountItem,
  children,
  images,
}: IImagesProps) => {
  const [currentImg, setCurrentImg] = useState(currentItem);
  const [isActiveIconRight, setIsActiveIconRight] = useState(false);
  const [isActiveIconLeft, setIsActiveIconLeft] = useState(false);
  const toggleActiveIcons = (value: boolean) => {
    if (value) {
      if (images.length > 1) {
        currentImg > 0 ? setIsActiveIconLeft(true) : setIsActiveIconLeft(false);
        currentImg < images.length - 1
          ? setIsActiveIconRight(true)
          : setIsActiveIconRight(false);
      }
    } else {
      setIsActiveIconLeft(false);
      setIsActiveIconRight(false);
    }
  };

  const onClick = (num: number) => {
    toggleActiveIcons(false);
    if (num >= 0 || num < 2) {
      setCurrentImg(num);
    }
  };
  return (
    <div  
      onMouseOver={() => toggleActiveIcons(true)}
      onMouseLeave={() => toggleActiveIcons(false)}
    >
      <div
        onClick={() => {
          onClick(currentImg - 1);
        }}
        style={{ display: isActiveIconLeft ? "flex" : "none" }}
        className={classNames(isActiveIconLeft && style.carousel_icon)}
      >
        <LeftArrow />
      </div>
      <img
        className={style.carousel_img}
        src={images[currentImg]}
        alt="there should have been a photo of the product here"
      />

      <div
        onClick={() => {
          onClick(currentImg + 1);
        }}
        style={{ display: isActiveIconRight ? "flex" : "none" }}
        className={classNames(
          isActiveIconRight && style.carousel_icon,
          style.carousel_icon__right
        )}
      >
        <RightArrow />
      </div>
    </div>
  );
};

export default Images;
