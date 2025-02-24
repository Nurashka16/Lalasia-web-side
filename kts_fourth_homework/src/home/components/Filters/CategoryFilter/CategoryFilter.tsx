import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import style from "./CategoryFilter.module.css";
import categoriesStore from "src/categories/store/categories-store";
import productsStore from "src/home/store/products-store";
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
    }, 2000);
  }, []);

  const listAllCategories: Option<string>[] = allCategories.map(
    (category) => new Option(category.id.toString(), category.name)
  );

  return (
    <div className={style.filter}>
      <MultiDropdown
        isLoading={isLoading}
        className={style.lists}
        variants={listAllCategories}
        defaultPlaceholder={"Filter by category"}
        selectedVariants={filter.selectedCategories}
        afterSlot={<button className={style.btn}>×</button>}
        onClick={filter.toggleCategory}
      />
    </div>
  );
});
export default CategoryFilter;
