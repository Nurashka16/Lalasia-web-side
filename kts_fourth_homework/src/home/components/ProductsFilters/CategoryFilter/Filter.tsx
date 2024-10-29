import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import style from "./Filter.module.css";
import MultiDropdown, {
  Option,
} from "../../../../common/components/MultiDropdown";
import categoriesStore from "../../../../categories/store/categories-store";
import productsStore from "../../../store/products-store";



const Filter = observer(() => {
  const { categoriesData, getCategories } = categoriesStore;
  const {filter} = productsStore
  
  useEffect(() => {
    getCategories();
  }, []);

  const listCategories: Option[] = categoriesData.map((item) => ({
    key: item.id.toString(),
    value: item.name,
  }));
  

  return (
    <div className={style.filter}>
      <MultiDropdown
        value={[]}
        onChange={(value: Option) => filter.setCategoryIds(Number(value.key))}
        getTitle={() => "Filter by category"}
        options={categoriesData.length ? listCategories : []}
      />
    </div>
  );
});
export default Filter;

