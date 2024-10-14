import Search from "../../../common/components/Search/Search";
import Filter from "./CategoryFilter";
import productsStore from "../../store/products-store";
import style from "./ProductsFilters.module.css";
import PriceDiapasonFilter from "./PriceDiapasonFilter/PriceDiapasonFilter";
import { observer } from "mobx-react-lite";

export interface IRange {
  min: number;
  max: number;
}

const ProductsFilters = observer(() => {
  const { search, filter } = productsStore;
  return (
    <>
      <Search
        onClick={search}
        value={filter.title}
        onChange={filter.setTitle}
        placeholder="Search product"
      />
      <div className={style.filters}>
        <Filter />
        <div className={style.range}>
          <PriceDiapasonFilter />
        </div>
      </div>
    </>
  );
});

export default ProductsFilters;
