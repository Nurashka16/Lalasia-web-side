import React, { useState } from "react";
import style from "./Card.module.css";
import classNames from "classnames";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { useNavigate } from "react-router-dom";
import { IBasketProductsIdToCount } from "src/basket/stores/basket-store";

export type CardProps = {
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
  onClick: (product: IBasketProductsIdToCount) => void;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  id: number;
};

const Card: React.FC<CardProps> = ({
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
  const [count, setCount] = useState(1);
  const addProduct = () => {
    onClick({ id: id, count: count });
    setCount(count + 1);
  };
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`); // Переходим на страницу товара
  };

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Остановить всплытие события
    addProduct();
  };
  return (
    <div
      className={classNames(style.card, className)}
      onClick={() => handleCardClick()}
    >
      <img
        className={style.card_image}
        src={image}
        alt="there should have been a photo of the product here"
      />

      <div className={style.card_body}>
        <div className={style.body_info}>
          {captionSlot && (
            <Text weight="medium" color="secondary" view="p-14">
              {captionSlot}
            </Text>
          )}
          <Text
            className={style.body_title}
            maxLines={2}
            weight="medium"
            color="primary"
            view="p-20"
          >
            {title}
          </Text>
          <Text className={style.body_subtitle} view="p-16" color="secondary">
            {subtitle}
          </Text>
        </div>
        <div className={style.card_footer}>
          {contentSlot && (
            <Text weight="bold" view="p-18" color="primary">
              {contentSlot}
            </Text>
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
