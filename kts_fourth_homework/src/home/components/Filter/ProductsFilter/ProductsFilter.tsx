import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import style from "./ProductsFilter.module.css";
import MultiDropdown, {
  Option,
} from "../../../../common/components/MultiDropdown";
import { IProductsFilter } from "../../../interface/IProductsFilter";
import categoriesStore from "../../../../categories/store/categories-store";

interface IFilter {
  selectedFilters: IProductsFilter;
  addFilter: (key: number) => Promise<void>;
}

const Filters = observer(
  ({ selectedFilters, addFilter }: IFilter) => {
    const { categoriesData, setCategories } = categoriesStore;

    useEffect(() => {
      setCategories();
    }, []);

    const listCategories: Option[] = categoriesData.map((item) => ({
      key: item.id.toString(),
      value: item.name,
    }));

    return (
      <div className={style.filter}>
        <MultiDropdown
          value={[]}
          onChange={(value: Option[]) => addFilter(Number(value[0].key))} 
          getTitle={() => "Filter by category"}
          options={categoriesData.length ? listCategories : []}
        />
      </div>
    );
  }
);
export default Filters;
