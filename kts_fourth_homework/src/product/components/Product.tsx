import React from "react";
import style from "./Product.module.css";
import InfoCard from "./InfoCard";
import SimilarProducts from "./SimilarProducts";
import { Link, useNavigate } from "react-router-dom";
import ButtonBack from "../../common/components/ButtonBack/ButtonBack";
import { HOME } from "../../utils/const";

//продумать лучше названия и сделать более большим эту компоненту и меньше инфо
//переписать ксс на модуль ксс

const Product = () => {
  // const navigate = useNavigate("/")
  return (
    <div className={style.product}>
      <ButtonBack link={HOME} />
      <div className={style.product_main}>
        <InfoCard />
        <SimilarProducts />
      </div>
    </div>
  );
};

export default Product;
