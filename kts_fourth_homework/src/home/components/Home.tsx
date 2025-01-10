import style from "./Home.module.css";
import Catalog from "../../common/components/Catalog";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ProductsFilters from "./ProductsFilters/ProductsFilters";
import productsStore from "../store/products-store";
import basketStore from "../../basket/stores/basket-store";

const Home = observer(() => {
  const { partProducts, pagination, setPage, getAll } = productsStore;
  const {addSelectedProducts}=basketStore

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className={style.home}>
      <div className={style.home_description}>
        <h3 className={style.home_title}>Products</h3>
        <div className={style.home_text}>
          We display products based on the latest products we have, if you want
          <br /> to see our old products please enter the name of the item
        </div>
      </div>
      <div className={style.home_main}>
        <ProductsFilters />
        <Catalog addCard={addSelectedProducts}
          partProducts={partProducts}
          lengthProductsPage={pagination.limitPage}
          numberAllProducts={pagination.numberAllProducts}
          currentPage={pagination.currentPage}
          setPage={setPage}
        />
      </div>
    </div>
  );
});

export default Home;
