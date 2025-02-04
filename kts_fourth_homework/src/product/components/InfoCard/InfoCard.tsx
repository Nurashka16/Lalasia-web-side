import React, { useState } from "react";
import style from "./InfoCard.module.css";
import { IProduct } from "src/product/interface/IProduct";
import basketStore from "src/basket/stores/basket-store";
import Text from "src/common/components/Text";
import Button from "src/common/components/Button";
import RightArrow from "src/common/components/Pagination/svg/RightArrow";
import LeftArrow from "src/common/components/Pagination/svg/LeftArrow";
import classNames from "classnames";

interface IInfoCardProps {
  product: IProduct;
}

const InfoCard = ({ product }: IInfoCardProps) => {
  const [count, setCount] = useState(1);

  const [isActiveIcon, setIsActiveIcon] = useState(false);

  const { addProduct } = basketStore;
  const addProducts = () => {
    setCount(count + 1);
    addProduct({ id: product.id, count });
  };

  return (
    <div className={style.card}>
      <div
        className={style.card_carousel}
        onMouseOver={() => setIsActiveIcon(true)}
        onMouseLeave={() => setIsActiveIcon(false)}
      >
        <div
          style={{ display: isActiveIcon ? "flex" : "none" }}
          className={style.carousel_icon}
        >
          <LeftArrow />
        </div>
        <img
          className={style.carousel_img}
          src={product?.images[0]}
          alt="there should have been a photo of the product here"
        />
        <div
          style={{ display: isActiveIcon ? "flex" : "none" }}
          className={classNames(style.carousel_icon, style.carousel_icon__right)}
        >
          <RightArrow />
        </div>
      </div>
      <div className={style.card_main}>
        <div className={style.main_info}>
          <Text weight="bold" view="title">
            {product?.title}
          </Text>
          <Text
            className={style.main_description}
            view="p-20"
            weight="normal"
            color="secondary"
          >
            {product?.description}
          </Text>
        </div>
        <div className={style.main_footer}>
          <Text className={style.footer_price} weight="bold" view="title">
            {"$" + product?.price}
          </Text>
          <div className={style.footer_buttons}>
            <Button onClick={() => console.log(1)}>Buy Now</Button>
            <Button
              className={style.footer_btn__add}
              onClick={() => addProducts()}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
