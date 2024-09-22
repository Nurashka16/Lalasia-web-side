import React from "react";
import "./ProductPage.css";
import InfoCard from "./InfoCard";
import SimilarProducts from "./SimilarProducts";
import { Link } from "react-router-dom";
import Text from "../../common/Text";
import ButtonBack from "../../common/ButtonBack/ButtonBack";

//продумать лучше названия и сделать более большим эту компоненту и меньше инфо
//переписать ксс на модуль ксс

const ProductPage = () => {
  return (
    <div className="product">
      <ButtonBack link="/" />
      <div className="product_main">
        <InfoCard />
        <SimilarProducts />
      </div>
    </div>
  );
};

export default ProductPage;
