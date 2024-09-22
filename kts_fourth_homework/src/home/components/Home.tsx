import style from "./Home.module.css";
import Catalog from "../../common/Catalog";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Filter from "./Filter/Search";
import productsStore from "../stores/products-store";

const Home = observer(() => {
  const { partProducts, pagination, setPage, getAllProducts } = productsStore;

  useEffect(() => {
    getAllProducts();
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
        <Filter />
        <Catalog
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
