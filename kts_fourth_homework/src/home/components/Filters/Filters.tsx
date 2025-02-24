import style from "./Filters.module.css";
import PriceDiapasonFilter from "./PriceDiapasonFilter/PriceDiapasonFilter";
import { observer } from "mobx-react-lite";
import productsStore from "src/home/store/products-store";
import Search from "src/common/components/Search";
import CategoryFilter from "./CategoryFilter/CategoryFilter";
import ResetIcon from "./svg/ResetIcon";
import SortProducts from "./SortProducts/SortProducts";

const Filters = observer(() => {
  const { filter, search } = productsStore;
  const { getAll } = productsStore;

  const reset = () => {
    filter.clearAllFilters();
    getAll();
  };

  return (
    <div className={style.filters}>
      <Search
        className={style.filter_search}
        disabled={!filter.isChangeFilters}
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

      {filter.isChangeFilters && (
        <button onClick={() => reset()} className={style.filters_resetBtn}>
          <ResetIcon />
          reset filters
        </button>
      )}
    </div>
  );
});

export default Filters;
