import { useEffect } from "react";
import style from "./Categories.module.css";
import { observer } from "mobx-react-lite";
import categoriesStore from "../store/categories-store";
import Text from "src/common/components/Text";
import Loader from "src/common/components/Loader";
import CatalogLayout from "src/common/CatalogLayout/CatalogLayout";
import NotFound from "src/common/components/NotFound";
import productsStore from "src/home/store/products-store";
import { Option } from "src/common/MultiDropDown/interface/Option";
import Category from "./Category";

const Categories = observer(() => {
  const { getCategories, allCategories, isLoading } = categoriesStore;
  const { search, filter } = productsStore;

  useEffect(() => {
    getCategories();
  }, []);

  const selectCategory = (category: Option<string>) => {
    filter.clearAllFilters();
    filter.toggleCategory(category);
    search();
  };

  const categories = allCategories.map((category) => {
    return <Category category={category} onClick={selectCategory} />;
  });

  return (
    <div className={style.categories}>
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
            title="Product categories"
            countAllProducts={allCategories.length}
            children={<div className={style.main}>{categories}</div>}
          />
          {allCategories.length ? (
            <div></div>
          ) : (
            <NotFound text="Nothing found" />
          )}
        </div>
      )}
    </div>
  );
});

export default Categories;
