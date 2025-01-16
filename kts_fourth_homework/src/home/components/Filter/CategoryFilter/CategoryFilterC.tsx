import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import style from "./CategoryFilter.module.css";
import categoriesStore from "src/categories/store/categories-store";
import productsStore from "src/home/store/products-store";
import MultiDropdown, { Option } from "src/common/components/MultiDropdown";

const CategoryFilterC = observer(() => {

  //переписать всю логику убрать опшион, value. Переделать все под себя
  //Ибо много лишнего из за тупого компонента из kts

  const { getCategories, allCategories } = categoriesStore;
  const { filter } = productsStore;

  useEffect(() => {
    getCategories();
  }, []);

  const foundSelectedCategories = (arr) => {
    return arr
    
    // const result: Option[] = [];
    // allCategories.forEach((category) => {
    //   if (arr.includes(category.id)) {
    //     result.push({ key: category.id.toString(), value: category.name });
    //   }
    // });
    // return result;
  };
  console.log(foundSelectedCategories(filter.selectedFilterIds),1);
  

  const [selectedCategories, setSelectedCategories] = useState(
    foundSelectedCategories(filter.selectedFilterIds.keys())
  );

  const onClickCategory = (id: number) => {
    filter.toggleCategory(id);
    setSelectedCategories(foundSelectedCategories(filter.selectedFilterIds.keys()));
  };

  const listAllCategories: Option[] = allCategories.map((category) => ({
    key: category.id.toString(),
    value: category.name,
  }));

  const nameSelectedCategories = (value: Option[]) =>
    value.map((item) => item.value).join(",");

  return (
    <div className={style.filter}>
      <MultiDropdown
        className={style.lists}
        value={selectedCategories}
        onChange={(id: number) => onClickCategory(id)}
        getTitle={
          selectedCategories.length
            ? nameSelectedCategories(selectedCategories)
            : "Filter by category"
        }
        options={allCategories.length ? listAllCategories : []}
      />
    </div>
  );
});
export default CategoryFilterC;
