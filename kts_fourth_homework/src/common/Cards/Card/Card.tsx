import React, { useState } from "react";
import "./Card.css";
import classNames from "classnames";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { Link, useNavigate } from "react-router-dom";
import { IBasketProduct } from "../../../basket/interface/IBasketProduct";
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
      className={classNames("card", className)}
      onClick={() => handleCardClick()}
    >
      <img
        className="image"
        src={image}
        alt="здесь должно было быть фото твоей мамаши"
      />

      <div className="body">
        <div className="card_body">
          {captionSlot && (
            <Text weight="medium" color="secondary" view="p-14">
              {captionSlot}
            </Text>
          )}
          <Text maxLines={2} weight="medium" color="primary" view="p-20">
            {title}
          </Text>
          <Text className="link" maxLines={3} view="p-16" color="secondary">
            {subtitle}
          </Text>
        </div>
        <div className="footer">
          {contentSlot && (
            <Text weight="bold" view="p-18" color="primary">
              {contentSlot}
            </Text>
          )}
          <Button className="card_btn" onClick={handleButtonClick}>
            {actionSlot}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
