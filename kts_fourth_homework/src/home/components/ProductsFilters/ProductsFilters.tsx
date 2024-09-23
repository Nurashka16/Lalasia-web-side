import Search from "../../../common/components/Search/Search";
import Filter from "./Filter";
import productsStore from "../../stores/products-store";
import style from "./ProductsFilters.module.css";
import Input from "../../../common/components/Input";
import { useState } from "react";

const ProductsFilters = () => {
  const { search, selectedFilters, addFilter } = productsStore;
  const [isActiveRange, setActiveRange] = useState(false);

  //как вариант: оставить чисто диапазон без useState 
  //и вместо простого инпута, добавить валидашен как в авторизации,
  //ведь нам нужны правильно заполненные данные
  return (
    <>
      <Search onClick={search} />
      <div className={style.filters}>
        <Filter selectedFilters={selectedFilters} addFilter={addFilter} />
        <Input
          onChange={(e) => console.log(e)}
          className={style.filter}
          value=""
          afterSlot={<div className={style.price}>$</div>}
          placeholder="Filter by price"
        />
        {isActiveRange ? (
          <div className={style.range}>
            <Input
              className={style.filter}
              onClick={() => setActiveRange(true)}
              onChange={(e) => console.log(e)}
              afterSlot={<div className={style.price}>$</div>}
              value=""
              placeholder="min"
            />
            <Input
              className={style.filter}
              onClick={() => setActiveRange(true)}
              onChange={(e) => console.log(e)}
              afterSlot={<div className={style.price}>$</div>}
              value=""
              placeholder="max"
            />
          </div>
        ) : (
          <Input
            className={style.filter}
            onClick={() => setActiveRange(true)}
            onChange={(e) => console.log(e)}
            afterSlot={<div className={style.price}>$</div>}
            value=""
            placeholder="Filter by price range"
          />
        )}
      </div>
    </>
  );
};

export default ProductsFilters;
