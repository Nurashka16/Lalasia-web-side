import Search from "../../../common/components/Search/Search";
import Filter from "./Filter";
import productsStore from "../../store/products-store";
import style from "./ProductsFilters.module.css";
import { useState } from "react";
import PriceDiapasonFilter from "./Filter/PriceDiapasonFilter/PriceDiapasonFilter";

export interface IRange {
  min: number;
  max: number;
}

const ProductsFilters = () => {
  const { search, selectedFilters, addFilter } = productsStore;

  const [searchValue, setSearchValue] = useState("");
  const [rangeValues, setRangeValues] = useState<IRange>({ min: 0, max: 1000 });
  const onClick = () => {
    console.log(rangeValues, selectedFilters.categoryIds, searchValue);
    // search()
  };

  return (
    <>
      <Search onClick={onClick} value={searchValue} onChange={setSearchValue} />
      <div className={style.filters}>
        <Filter selectedFilters={selectedFilters} addFilter={addFilter} />
        <div className={style.range}>
          <PriceDiapasonFilter
            onChange={setRangeValues}
            defaultMaxValue={rangeValues.max}
            defaultMinValue={rangeValues.min}
          />
        </div>
      </div>
    </>
  );
};

export default ProductsFilters;
