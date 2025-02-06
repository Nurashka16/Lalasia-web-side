import React, { useState } from "react";
import style from "./InfoCard.module.css";
import { IProduct } from "src/product/interface/IProduct";
import basketStore from "src/basket/stores/basket-store";
import Text from "src/common/components/Text";
import Button from "src/common/components/Button";
import classNames from "classnames";
import RightArrow from "src/common/components/Pagination/svg/RightArrow";
import LeftArrow from "src/common/components/Pagination/svg/LeftArrow";
import Images from "./Images";

interface IInfoCardProps {
  product: IProduct;
}

const InfoCard = ({ product }: IInfoCardProps) => {
  const [count, setCount] = useState(1);
  // const [currentImg, setCurrentImg] = useState(0);
  // const [isActiveIconRight, setIsActiveIconRight] = useState(false);
  // const [isActiveIconLeft, setIsActiveIconLeft] = useState(false);

  // const maxImages = product.images.length;

  const { addProduct } = basketStore;
  const addProducts = () => {
    setCount(count + 1);
    addProduct({ id: product.id, count });
  };

  // const toggleActiveIcons = () => {
  //   currentImg > 0 ? setIsActiveIconLeft(true) : setIsActiveIconLeft(false);
  //   currentImg < maxImages-1
  //     ? setIsActiveIconRight(true)
  //     : setIsActiveIconRight(false);
  // };
  // const onClick = (num: number) => {
  //   toggleActiveIcons();
  //   if (num >= 0 || num < 2) {
  //     setCurrentImg(num);
  //   }
  // };
  const imgs:string[] = []
  const filterImages = (arr:string[])=> {
     arr.map((img)=> {
        imgs.push(img.replace( /["\[\]]/g, ""))
    })
  }
  filterImages(product?.images)
  return (
    <div className={style.card}>
      <Images
        currentItem={0}
        images={imgs}
        maxCountItem={product?.images.length}
      />
      {/* <div
        className={style.card_carousel}
        onMouseOver={() => toggleActiveIcons()}
        onMouseLeave={() => toggleActiveIcons()}
      >
        <div
          onClick={() => onClick(currentImg - 1)}
          style={{ display: isActiveIconLeft ? "flex" : "none" }}
          className={classNames(isActiveIconLeft && style.carousel_icon)}
        >
          <LeftArrow />
        </div>    
        <img
          className={style.carousel_img}
          src={product?.images[currentImg]}
          alt="there should have been a photo of the product here"
        />
        <div
          onClick={() => onClick(currentImg + 1)}
          style={{ display: isActiveIconRight ? "flex" : "none" }}
          className={classNames(
            isActiveIconRight && style.carousel_icon,
            style.carousel_icon__right
          )}
        >
          <RightArrow />
        </div>
      </div> */}
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
