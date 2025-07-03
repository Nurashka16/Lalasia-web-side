import React from "react";
import style from "./RelatesProducts.module.css";
import { observer } from "mobx-react-lite";
import basketStore from "src/basket/stores/basket-store";
import productStore from "src/product/stores/product-store";
import CatalogLayout from "src/common/CatalogLayout/CatalogLayout";
import NotFound from "src/common/components/NotFound";

const RelatesProducts = observer(() => {
  const { relatesProducts } = productStore;
  const { addProduct } = basketStore;
  
  return (
    <div className={style.relatesProducts}>
      {!!relatesProducts.length ? (
        <CatalogLayout
          className={style.relatesProducts_main}
          title="Relates Items"
          onClick={addProduct}
          products={relatesProducts}
        />
      ) : (
        <NotFound text="No relates products found" />
      )}
    </div>
  );
});

export default RelatesProducts;
