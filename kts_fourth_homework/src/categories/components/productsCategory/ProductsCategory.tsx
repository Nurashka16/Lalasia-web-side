import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { CATEGORIES } from "../../../utils/const";
import { Link, useParams } from "react-router-dom";
import style from "./ProductsCategory.module.css";
import Catalog from "../../../common/Catalog";
import categoriesStore from "../../store/categories-store";
import productsStore from "../../../home/store/products-store";

const ProductsCategory = observer(() => {
  const { productsData, setProductsSameCategories } = categoriesStore;
  const { pagination, setPage } = productsStore;
  const params = useParams();
  useEffect(() => {}, [setProductsSameCategories(Number(params))]);
  // const products = productsData.map((product) => {
  //   return (
  //     <Link
  //       to={"/product/" + product.id}
  //       className="main_product"
  //       id={product.id.toString()}
  //     >
  //       <Card
  //         image={product.images[0]}
  //         captionSlot={product.category.name}
  //         title={product.title}
  //         subtitle={product.description}
  //         contentSlot={"$" + product.price}
  //         actionSlot="Add to Cart"
  //         onClick={() => console.log("куплен")}
  //       />
  //     </Link>
  //   );
  // });
  return (
    <div className={style.products}>
      <Catalog
        partProducts={productsData}
        currentPage={pagination.currentPage}
        lengthProductsPage={pagination.limitPage}
        lengthVisiblePages={5}
        setPage={setPage}
        numberAllProducts={pagination.numberAllProducts}
      />
      {/* <ButtonBack link={CATEGORIES} />
      <div className={style.catalog_main}>
        {productsData && <div className={style.main_products}>{products}</div>}
      </div> */}
    </div>
  );
});

export default ProductsCategory;
