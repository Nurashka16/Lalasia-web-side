import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import style from "./SortProducts.module.css";
import MultiDropdownItemCheckBox from "src/common/MultiDropDown/MultiDropDownItem";
import productsStore from "src/home/store/products-store";
import MultiDropdown from "src/common/MultiDropDown/MultiDropDown";

const SortProducts = observer(() => {
  const { filter } = productsStore;

  useEffect(() => {//для имитации получения типов сортировки
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
        style={{
          maxHeight: !options.length ? "0px" : "250px",
        }}
        isLoading={isLoading}
        className={style.lists}
        variants={options}
        defaultPlaceholder={`Sort by ` + filter.selectedSort}
        selectedVariants={[filter.selectedSort]}
        children={options.map((option) => {
          const isActive = filter.selectedSort.value === option.value;
          return (
            <MultiDropdownItemCheckBox
              disabled={isActive}
              isActive={isActive}
              item={option}
              onClick={filter.setSelectedSort}
            />
          );
        })}
      />
    </div>
  );
});
export default SortProducts;
