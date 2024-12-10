import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import style from "./Filter.module.css";
import MultiDropdown, {
  Option,
} from "../../../../common/components/MultiDropdown";
import categoriesStore from "../../../../categories/store/categories-store";
import productsStore from "../../../store/products-store";

const Filter = observer(() => {
  const { getCategories, allFilters } = categoriesStore;

  const { filter } = productsStore;

  useEffect(() => {
    getCategories();
  }, []);

  const selectedFilter = (arr: number[]) => {
    const result: Option[] = [];
    allFilters.forEach((elem) => {
      if (arr.includes(elem.id)) {
        result.push({ key: elem.id.toString(), value: elem.name });
      }
    });
    return result
  };
  // const arr = selectedFilter(filter.selectedFilterIds)
  const [selectedOptions, setSelectedOptions] = useState(
    selectedFilter(filter.selectedFilterIds)
  );

  const onClick = (id: number) => {
    filter.setCategory(id);
    setSelectedOptions(selectedFilter(filter.selectedFilterIds));
  };

  const listCategories: Option[] = allFilters.map((item) => ({
    key: item.id.toString(),
    value: item.name,
  }));
  const nameOptions = (value: Option[]) =>
    value.map((item) => item.value).join(",");

  return (
    <div className={style.filter}>
      <MultiDropdown
        className="lists"
        value={selectedOptions}
        onChange={(id:number) => onClick(id)}
        getTitle={
          selectedOptions.length
            ? nameOptions(selectedOptions)
            : "Filter by category"
        }
        options={allFilters.length ? listCategories : []}
      />
    </div>
  );
});
export default Filter;
