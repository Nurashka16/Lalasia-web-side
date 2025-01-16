
import style from "./Filters.module.css";
import PriceDiapasonFilter from "./PriceDiapasonFilter/PriceDiapasonFilter";
import { observer } from "mobx-react-lite";
import productsStore from "src/home/store/products-store";
import Search from "src/common/components/Search";
import CategoryFilter from "./CategoryFilter/CategoryFilterC";
import CategoryFilterC from "./CategoryFilter/CategoryFilterC";

export interface IRange {
  min: number;
  max: number;
}

const Filters = observer(() => {
  const { search, filter } = productsStore;
  return (
    <div className={style.filters}>
      <Search
        onClick={search}
        value={filter.title}
        onChange={filter.setTitle}
        placeholder="Search product"
      />
      <div className={style.filters_lower}>
        <CategoryFilterC />
        <div className={style.filter_range}>
          <PriceDiapasonFilter />
        </div>
      </div>
    </div>
  );
});

export default Filters;
