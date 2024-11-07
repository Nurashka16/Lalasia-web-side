import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { CATEGORIES } from "../../../utils/const";
import { Link, useParams } from "react-router-dom";
import style from "./ProductsCategory.module.css";
import Catalog from "../../../common/components/Catalog";
import productsStore from "../../../home/store/products-store";
import ButtonBack from "../../../common/components/ButtonBack/ButtonBack";

const ProductsCategory = observer(() => {
  const { partProducts, pagination, setPage, search, filter } = productsStore;
  const param = useParams();

  useEffect(() => {
    filter.clearAllCategory();
    filter.setCategoryIds(Number(param.id));
    search();
  }, []);

  return (
    <div className={style.products}>
      <ButtonBack link={CATEGORIES} />
      <Catalog
        partProducts={partProducts}
        currentPage={pagination.currentPage}
        lengthProductsPage={pagination.limitPage}
        lengthVisiblePages={5}
        setPage={setPage}
        numberAllProducts={pagination.numberAllProducts}
      />
    </div>
  );
});

export default ProductsCategory;
