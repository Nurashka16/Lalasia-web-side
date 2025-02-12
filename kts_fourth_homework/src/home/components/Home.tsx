import style from "./Home.module.css";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Filters from "./Filters/Filters";
import productsStore from "../store/products-store";
import basketStore from "src/basket/stores/basket-store";
import Loader from "src/common/components/Loader";
import Text from "src/common/components/Text";
import CatalogLayout from "../../common/CatalogLayout/CatalogLayout";
import Pagination from "src/common/components/Pagination";
import NotFound from "src/common/components/NotFound";

const Home = observer(() => {
  const { productsCurrentPage, pagination, setPage, getAll } = productsStore;
  const { addProduct } = basketStore;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAll();
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <main className={style.home}>
      <div className={style.header}>
        <h1 className={style.header_title}>Products</h1>
        <p className={style.header_subtitle}>
          We display products based on the latest products we have, if you want
          <br /> to see our old products please enter the name of the item
        </p>
      </div>
      <div className={style.main}>
        <Filters />
        {isLoading ? (
          <div className={style.loader}>
            <Loader />
            <Text className={style.loader_text} weight="normal" tag="h2">
              Loading
            </Text>
          </div>
        ) : (
          <div className={style.catalog}>
            <CatalogLayout
              title="Total Product"
              countAllProducts={pagination.numberAllProducts}
              onClick={addProduct}
              products={productsCurrentPage}
            />
            {pagination.numberAllProducts ? (
              <Pagination
                className={style.pagination}
                currentPage={pagination.currentPage}
                onClick={setPage}
                countVisiblePages={5}
                maxCountProductsPage={pagination.limitPage}
                countAllProducts={pagination.numberAllProducts}
              />
            ) : (
              <NotFound text="Nothing found" />
            )}
          </div>
        )}
      </div>
    </main>
  );
});

export default Home;
