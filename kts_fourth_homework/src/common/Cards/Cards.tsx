import { ICard } from "src/common/interfaces/ICard";
import { IProduct } from "src/product/interface/IProduct";
import style from "./Cards.module.css";
import Card from "./Card/Card";

interface ICardsProps {
  products: IProduct[];
  onClick: (id:number) => void;
}
const Cards = ({ onClick, products }: ICardsProps) => {
  const cards = products.map((item: ICard) => {

    console.log(products[0]);
    
    return (
      <Card className={style.card}
        id={item.id}
        image={item.images[0]}
        captionSlot={item.category.name}
        title={item.title}
        subtitle={item.description}
        contentSlot={"$" + item.price}
        actionSlot="Add to Cart"
        onClick={onClick}
      />
    );
  });
  return <div className={style.cards}>{cards}</div>;
};

export default Cards;
