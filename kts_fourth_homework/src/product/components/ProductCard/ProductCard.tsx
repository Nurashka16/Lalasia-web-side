import React, { useState } from "react";
import style from "./ProductCard.module.css";
import { IProduct } from "src/product/interface/IProduct";
import basketStore from "src/basket/stores/basket-store";
import Text from "src/common/components/Text";
import Button from "src/common/components/Button";
import Carousel from "../../../common/components/Carousel/Carousel";
import classNames from "classnames";

interface IInfoCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: IInfoCardProps) => {
  const [countProduct, setCountProduct] = useState(1);
  const [currentImgNumber, setCurrentImgNumber] = useState(1);

  const { addProduct } = basketStore;

  //в будущем переписать эти функции, чтобы нигде не было setCount и т.п.
  //вместо этого, нужно чтобы этим занимался store: добавлял элемент если, его не было как count:1,
  //а если есть то обращался к его count и делал +1
  const addProducts = () => {
    setCountProduct(countProduct + 1);
    addProduct({ id: product.id, count: countProduct });
  };

  return (
    <div className={style.card}>
      <Carousel
        isActive={false}
        className={style.carousel_icon}
        onClick={setCurrentImgNumber}
        currentItem={currentImgNumber}
        maxCountItem={product?.images.length}
      >
        <img
          className={style.carousel_img}
          src={product?.images[currentImgNumber - 1]}
          alt="there should have been a photo of the product here"
        />
      </Carousel>
      <div className={style.main}>
        <div className={style.main_info}>
          <Text className={style.info_header} weight="bold" view="title">
            {product?.title}
          </Text>
          <Text
            className={style.info_description}
            view="p-20"
            weight="normal"
            color="secondary"
            maxLines={7}
          >
            {product?.description}
          </Text>
        </div>
        <div className={style.main_footer}>
          <Text className={style.footer_price} weight="bold" view="title">
            {"$" + product?.price}
          </Text>
          <div className={style.footer_buttons}>
            <Button className={style.footer_btn} onClick={() => console.log(1)}>
              Buy Now
            </Button>
            <Button
              className={classNames(style.footer_btn, style.footer_btn__add)}
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

export default ProductCard;
