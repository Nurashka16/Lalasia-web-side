import Search from "../../../common/components/Search/Search";
import Filter from "./Filter";
import productsStore from "../../stores/products-store";
import style from "./ProductsFilters.module.css";
import { useState } from "react";
import RangeSlider from "../../../common/components/RangeSlider/RangeSlider";

export interface IRange {
    min: number;
    max:number;
}

const ProductsFilters = () => {
  const { search, selectedFilters, addFilter } = productsStore;

  //как вариант: оставить чисто диапазон без useState
  //и вместо простого инпута, добавить валидашен как в авторизации,
  //ведь нам нужны правильно заполненные данные

  const [rangeValues, setRangeValues] = useState<IRange>({min:0, max:1000});
  
  const rules: IRule[] = [
    {
      errorMessage: "Only numbers",
      validate: (value: string) => !Number.isNaN(Number(value)),
      //почему не работает
    },
  ];
  
  //для валидации диапазона нужно ли заполнять все данные или 1 из 2 хватит
  return (
    <>
      <Search onClick={search} />
      <div className={style.filters}>
        <Filter selectedFilters={selectedFilters} addFilter={addFilter} />
        {/* <ValidationInput
          afterSlot={<div className={style.price}>$</div>}
          placeholder="Filter by price"
          className={style.filter}
          value={price}
          onChange={setPrice}
          rules={rules}
          setIsValid={setPriceIsValid}
        /> */}
        <div className={style.range}>
          <RangeSlider
            onChange={setRangeValues}
            range={{min:0, max:1000}}
            // defaultMaxPrice={range.max}
            // defaultMinPrice={range.min}
            step={50}
            defaultMaxValue={rangeValues.max}
            difference={50}
            defaultMinValue={rangeValues.min}
          />
        </div>
      </div>
    </>
  );
};

export default ProductsFilters;
