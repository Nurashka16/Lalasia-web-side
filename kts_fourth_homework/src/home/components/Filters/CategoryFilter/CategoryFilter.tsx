import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import style from "./CategoryFilter.module.css";
import categoriesStore from "src/categories/store/categories-store";
import MultiDropdown from "src/common/components/MultiDropdown/MultiDropdown";
import productsStore from "src/home/store/products-store";
import { Option } from "src/common/components/MultiDropdown/interface/Option";

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

  return (
    <div className={style.filter}>
      <MultiDropdown
        isLoading={isLoading}
        className={style.lists}
        variants={listAllCategories}
        onClick={filter.toggleCategory}
        defaultPlaceholder="Filter by category"
        selectedVariants={filter.selectedFilterIds}
      />
    </div>
  );
});
export default CategoryFilter;
