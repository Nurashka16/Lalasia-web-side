import React from "react";
import style from "./ProductCheckout.module.css";
import { IProductPayment } from "src/basket/stores/basket-store";

const ProductCheckout = ({ images, count, price }: IProductPayment) => {
  return (
    <div className={style.product}>
      <div className={style.productFrame}>
        <img className={style.productImage} src={images[0]} />
      </div>
      {count > 1 && <div className={style.productCount}>{count} p.</div>}
      <div className={style.productPrice}>{price} $</div>
    </div>
  );
};

export default ProductCheckout;
