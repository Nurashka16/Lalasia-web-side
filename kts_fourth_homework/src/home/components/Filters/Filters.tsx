import style from "./Filters.module.css";
import PriceDiapasonFilter from "./PriceDiapasonFilter/PriceDiapasonFilter";
import { observer } from "mobx-react-lite";
import productsStore from "src/home/store/products-store";
import Search from "src/common/components/Search";
import CategoryFilter from "./CategoryFilter/CategoryFilter";
import ResetIcon from "./svg/ResetIcon";
import { useEffect, useState } from "react";
import SortProducts from "./SortProducts/SortProducts";

const Filters = observer(() => {
  const { search, filter } = productsStore;
  const { getAll } = productsStore;

  const [isActiveReset, setIsActiveReset] = useState(false);

  useEffect(() => {
    if (
      filter.searchValue ||
      filter.selectedCategories.length ||
      filter.diapason.max < 1000 ||
      filter.diapason.min > 0
      //||filter.selectedSort не получается отследить из за того что во время инициализации конструктором он меняется
    ) {
      setIsActiveReset(true);
    } else {
      setIsActiveReset(false);
    }
  }, [
    filter.searchValue,
    filter.diapason,
    filter.selectedCategories,
    // filter.selectedSort,
  ]);

  const reset = () => {
    filter.clearAllFilters();
    getAll();
    setIsActiveReset(false);
  };

  return (
    <div className={style.filters}>
      <Search
        className={style.filter_search}
        disabled={!isActiveReset}
        onClick={search}
        defaultValue={filter.searchValue}
        onChange={(value: string) => {
          filter.setSearchValue(value);
        }}
        placeholder="Search product"
      />
      <div className={style.filters_lower}>
          <SortProducts />
          <CategoryFilter />

        <div className={style.filter_range}>
          <PriceDiapasonFilter />
        </div>
      </div>

      {isActiveReset && (
        <button onClick={() => reset()} className={style.filters_resetBtn}>
          <ResetIcon />
          reset filters
        </button>
      )}
    </div>
  );
});

export default Filters;
