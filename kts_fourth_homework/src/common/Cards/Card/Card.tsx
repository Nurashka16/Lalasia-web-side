import React, { useState } from "react";
import style from "./Card.module.css";
import classNames from "classnames";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { useNavigate } from "react-router-dom";

export type ICardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick: (id: number) => void;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  id: number;
};

const Card: React.FC<ICardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  actionSlot,
  onClick,
  id,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`); // Переходим на страницу товара
  };

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Остановить всплытие события
    onClick(id);
  };
  return (
    <div
      className={classNames(style.card, className)}
      onClick={() => handleCardClick()}
    >
      <div className={style.imageContainer}>
        <img
          className={style.imageContainer_img}
          src={image}
          alt="there should have been a photo of the product here"
        />
      </div>

      <div className={style.body}>
        <div className={style.info}>
          {captionSlot && (
            <Text className={style.info_subtitle}>{captionSlot}</Text>
          )}
          <Text className={style.info_title}>{title}</Text>
          <Text
            className={style.info_description}
            view="p-16"
            color="secondary"
          >
            {subtitle}
          </Text>
        </div>
        <div className={style.footer}>
          {contentSlot && (
            <Text className={style.footer_price}>{contentSlot}</Text>
          )}
          <Button className={style.footer_btn} onClick={handleButtonClick}>
            {actionSlot}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
