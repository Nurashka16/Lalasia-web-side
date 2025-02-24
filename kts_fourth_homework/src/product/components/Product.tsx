import { useEffect, useState } from "react";
import style from "./Product.module.css";
import { useParams } from "react-router-dom";
import productStore from "../stores/product-store";
import Loader from "src/common/components/Loader";
import ButtonBack from "src/common/components/ButtonBack/ButtonBack";
import { HOME } from "src/utils/const";
import RelatesProducts from "./RelatesProducts/index.ts";
import ProductCard from "./ProductCard/ProductCard.tsx";

const Product = () => {
  const { getProductAction, product } = productStore;

  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    getProductAction(params.id!);
    setTimeout(() => setIsLoading(false), 1000);
  }, [params.id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={style.product}>
      <ButtonBack link="" />
      <div className={style.product_main}>
        <ProductCard product={product!} />
        <RelatesProducts />
      </div>
    </div>
  );
};

export default Product;
