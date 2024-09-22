import React from "react";
import "./SimilarProducts.css";
import { observer } from "mobx-react-lite";
import productsStore from "../../../../store/products-store";
import Text from "../../../common/Text";
import Card from "../../../common/Card";

const SimilarProducts = observer(() => {
  const { partProducts } = productsStore;
  const cards = partProducts.slice(0, 3).map((item) => {
    return (
      <div className="similar_product">
        <Card
          image={item.images[1]}
          captionSlot={item.category.name}
          title={item.title}
          subtitle={item.description}
          contentSlot={"$" + item.price}
          actionSlot="Add to Cart"
          onClick={() => console.log("куплен")}
        />
      </div>
    );
  });
  return (
    <div className="similar">
      <Text className="similar_title" tag="h1" weight="bold">
        Relates Items
      </Text>
      <div className="similar_cards">{cards}</div>
    </div>
  );
});

export default SimilarProducts;
