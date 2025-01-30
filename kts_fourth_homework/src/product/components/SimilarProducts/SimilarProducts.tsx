import React from "react";
import "./SimilarProducts.css";
import { observer } from "mobx-react-lite";
import productsStore from "../../../home/store/products-store";
import Card from "../../../common/Cards/Card";
import Text from "../../../common/components/Text";
import basketStore from "../../../basket/stores/basket-store";
import { Link } from "react-router-dom";

const SimilarProducts = observer(() => {
  const { partProducts } = productsStore;
  const { addProduct } = basketStore;
  const cards = partProducts.slice(0, 3).map((item) => {
    return (
      <div className="similar_product">
        <Card
          addCard={addProduct}
          id={item.id}
          image={item.images[1]}
          captionSlot={item.category.name}
          title={item.title}
          subtitle={item.description}
          contentSlot={"$" + item.price}
          actionSlot="Add to Cart"
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
