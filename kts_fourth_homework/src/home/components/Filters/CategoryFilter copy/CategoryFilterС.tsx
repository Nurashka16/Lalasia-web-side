import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import style from "./CategoryFilter.module.css";
import categoriesStore from "src/categories/store/categories-store";
import MultiDropdown from "src/common/components/MultiDropdown/MultiDropdown";
import productsStore from "src/home/store/products-store";
import { Option } from "src/common/components/MultiDropdown/interface/Option";

const CategoryFilterC = observer(() => {
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

  // const listAllCategories: Option[] = allCategories.map((category) => ({
  //   key: category.id.toString(),
  //   value: category.name,
  // }));
  const variantsSort = ["Popular", "Cheaper", "More expensive", "New Items"]
  return (
    <div className={style.filter}>
<div class="sort-container">
    <label for="sort-options">Сортировать по:</label>
    <select id="sort-options">
        <option value="newest">По новизне</option>
        <option value="price-asc">Дешевле</option>
        <option value="price-desc">Дороже</option>
    </select>
</div>
    </div>
  );
});
export default CategoryFilterC;
