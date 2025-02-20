import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import style from "./CategoryFilter.module.css";
import categoriesStore from "src/categories/store/categories-store";
import productsStore from "src/home/store/products-store";
import MultiDropdownItemCheckBox from "src/common/MultiDropDown/MultiDropDownItem";
import { Option } from "src/common/MultiDropDown/interface/Option";
import MultiDropdown from "src/common/MultiDropDown/MultiDropDown";

const CategoryFilter = observer(() => {
  const { getCategories, allCategories } = categoriesStore;
  const { filter } = productsStore;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCategories();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const listAllCategories: Option[] = allCategories.map((category) => ({
    key: category.id.toString(),
    value: category.name,
  }));
  const idAllCategories = filter.selectedCategories.map((category) => {
    return category.key;
  });
  return (
    <div className={style.filter}>
      <MultiDropdown
        isLoading={isLoading}
        className={style.lists}
        variants={listAllCategories}
        defaultPlaceholder={"Filter by category"}
        selectedVariants={filter.selectedCategories}
        children={listAllCategories.map((category) => {
          return (
            <MultiDropdownItemCheckBox
            afterSlot={<button className={style.btn}>×</button>}
              isActive={idAllCategories.includes(category.key)}
              item={category}
              onClick={filter.toggleCategory}
            />
          );
        })}
      />
    </div>
  );
});
export default CategoryFilter;
