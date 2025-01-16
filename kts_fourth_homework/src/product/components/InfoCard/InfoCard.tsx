import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import productStore from "../../stores/product-store";
import Text from "../../../common/components/Text";
import Button from "../../../common/components/Button";
import basketStore from "../../../basket/stores/basket-store";

const InfoCard = observer(() => {
  const { product, getProductAction } = productStore;
  const { addProduct } = basketStore;
  const params = useParams();
  const [count, setCount] = useState(1);

  const addProducts = () => {
    setCount(count + 1);
    addProduct({ id: Number(params.id), count });


  };

  useEffect(() => {
    getProductAction(params.id!);
  }, [params.id]);
  return (
    <div className="detailedCard">
      <div className="detailedCard_carousel">
        <div className="detailedCard_icon_right">
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.043 25.6126L10.9561 17.5258C10.0011 16.5708 10.0011 15.008 10.9561 14.0529L19.043 5.96613"
              stroke="white"
              stroke-width="3"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <img
          className="detailedCard_img"
          src={product?.images[0]}
          alt="незагрузилась картинка продукта"
        />
        <div className="detailedCard_icon_left">
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.957 25.6126L20.0439 17.5258C20.9989 16.5708 20.9989 15.008 20.0439 14.0529L11.957 5.96613"
              stroke="white"
              stroke-width="3"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="detailedCard_description">
        <div className="detailedCard_info">
          <Text weight="bold" view="title">
            {product?.title}
          </Text>
          <Text
            className="detailedCard_text"
            view="p-20"
            weight="normal"
            color="secondary"
          >
            {product?.description}
          </Text>
        </div>
        <div className="detailedCard_footer">
          <Text className="detailedCard_price" weight="bold" view="title">
            {"$" + product?.price}
          </Text>
          <div className="detailedCard_buttons">
            <Button>Buy Now</Button>
            {/*переписать на button компоненту */}
            <button className="detailedCard_btn" onClick={() => addProducts()}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default InfoCard;
