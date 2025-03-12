import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import style from "./SortProducts.module.css";
import productsStore from "src/home/store/products-store";
import MultiDropdown from "src/common/MultiDropDown/MultiDropDown";

const SortProducts = observer(() => {
  const { filter } = productsStore;

  useEffect(() => {
    //для имитации получения типов сортировки
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const options = filter.getOptions;
  return (
    <div className={style.filter}>
      <MultiDropdown
        onClick={filter.setSelectedSort}//потом пофиксить
        isLoading={isLoading}
        className={style.lists}
        variants={options}
        defaultPlaceholder={`Sort by ` + filter.selectedTypeSort}
        selectedVariants={[filter.selectedTypeSort]}
      />
    </div>
  );
});
export default SortProducts;
