import style from "./Filters.module.css";
import PriceDiapasonFilter from "./PriceDiapasonFilter/PriceDiapasonFilter";
import { observer } from "mobx-react-lite";
import productsStore from "src/home/store/products-store";
import Search from "src/common/components/Search";
import CategoryFilter from "./CategoryFilter/CategoryFilter";
import ResetIcon from "./svg/ResetIcon";
import { useEffect, useState } from "react";

const Filters = observer(() => {
  const { search, filter } = productsStore;
  const { getAll } = productsStore;

  const [isActiveReset, setIsActiveReset] = useState(false);
  useEffect(() => {
    if (
      filter.title ||
      filter.selectedFilterIds.size ||
      filter.diapason.max < 1000 ||
      filter.diapason.min > 0
    ) {
      setIsActiveReset(true);
    } else {
      setIsActiveReset(false);
    }
  }, [filter.title, filter.diapason, filter.selectedFilterIds]);

  const reset = () => {
    filter.clearAllFilters();
    getAll();
    setIsActiveReset(false);
  };

  return (
    <div className={style.filters}>
      <Search
      className={style.filter_search}
        onClick={search}
        defaultValue={filter.title}
        onChange={(value: string) => {
          filter.setTitle(value);
        }}
        placeholder="Search product"
      />
      <div className={style.filters_lower}>
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
