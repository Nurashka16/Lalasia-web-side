import React, { useEffect } from "react";
import basketStore from "../../../stores/basket-store";
import SelectedProduct from "./SelectedProduct";
import { EmptyBasket } from "../EmptyBasket/EmptyBasket";
import style from "./SelectedProduct.module.css";

// interface ISelectedProducts{
//    productsData:
// }

const SelectedProducts = () => {
  const { productsData, selectedProducts, updateCountProduct, deleteProduct } =
    basketStore;
  useEffect(() => {}, [selectedProducts]);
  const products = productsData.map((product) => {
    return (
      <SelectedProduct
        deleteProduct={deleteProduct}
        defaultCount={selectedProducts.get(product.id)!}
        updateCountProduct={updateCountProduct}
        product={product}
      />
    );
  });
  
console.log(productsData);

  return (
    <div className={style.products}>
      {products.length ? products : <EmptyBasket />}
    </div>
  );
};

export default SelectedProducts;
