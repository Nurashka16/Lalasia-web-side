import { useEffect, useState } from "react";
import style from "./Product.module.css";
import InfoCard from "./InfoCard";
import SimilarProducts from "./SimilarProducts";
import { useParams } from "react-router-dom";
import ButtonBack from "../../common/components/ButtonBack/ButtonBack";
import { HOME } from "../../utils/const";
import productStore from "../stores/product-store";
import Loader from "src/common/components/Loader";

const Product = () => {
  const { getProductAction, product } = productStore;

  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    getProductAction(params.id!);
    setTimeout(() => setIsLoading(false), 100);
  }, [params.id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={style.product}>
      <ButtonBack link={HOME} />
      <div className={style.product_main}>
        <InfoCard product={product!} />
        <SimilarProducts />
      </div>
    </div>
  );
};

export default Product;
