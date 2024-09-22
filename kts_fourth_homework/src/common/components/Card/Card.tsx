import React from "react";
import "./Card.css";
import classNames from "classnames";
import Button from "../Button";
import Text from "../Text";

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
}) => (
  <div className={classNames("card", className)} onClick={onClick}>
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
        <Button>{actionSlot}</Button>
      </div>
    </div>
  </div>
);

export default Card;
