import React, { useState } from "react";
import "./Card.css";
import classNames from "classnames";
import Button from "../Button";
import Text from "../Text";
import { Link } from "react-router-dom";
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
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  addCard: (product: IBasketProductsIdToCount) => void
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
  addCard,
  id,
}) => {
  const [count, setCount] = useState(1);
  const addProduct = () => {
    addCard({ id: id, count: count });
    setCount(count + 1);
  };

  return (
    <div className={classNames("card", className)} onClick={onClick}>
      <Link to={"/product/" + id}>
        <img
          className="image"
          src={image}
          alt="здесь должно было быть фото твоей мамаши"
        />
      </Link>
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
          <Button onClick={() => addProduct()}>{actionSlot}</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
