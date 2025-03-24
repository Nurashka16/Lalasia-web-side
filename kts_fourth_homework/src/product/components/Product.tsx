import { useEffect, useState } from "react";
import style from "./Product.module.css";
import { useParams } from "react-router-dom";
import productStore from "../stores/product-store";
import Loader from "src/common/components/Loader";
import ButtonBack from "src/common/components/ButtonBack/ButtonBack";
import RelatesProducts from "./RelatesProducts/index.ts";
import ProductCard from "./ProductCard/ProductCard.tsx";
import { observer } from "mobx-react-lite";

const Product = observer(() => {
  const { getProductAction, product, isLoading } = productStore;

  const params = useParams();

  useEffect(() => {
    getProductAction(Number(params.id!));
  }, [params.id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={style.product}>
      <ButtonBack link="" />
      <div className={style.product_main}>
        <ProductCard product={product} />
        <RelatesProducts />
      </div>
    </div>
  );
});

export default Product;
