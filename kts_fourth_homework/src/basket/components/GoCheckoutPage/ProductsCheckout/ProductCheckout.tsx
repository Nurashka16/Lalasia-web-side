import React from "react";
import style from "./ProductCheckout.module.css";
import { IProductsCheckout } from "src/basket/stores/basket-store";

const ProductCheckout = ({ product, count, price }: IProductsCheckout) => {
  return (
    <div className={style.product}>
      <div className={style.productFrame}>
        <img className={style.productImage} src={product.images[0]} />
      </div>
      {count > 1 && <div className={style.productCount}>{count} p.</div>}
      <div className={style.productPrice}>{price} $</div>
    </div>
  );
};

export default ProductCheckout;
