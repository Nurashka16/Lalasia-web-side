import { useState } from "react";
import style from "./PriceDiapasonFilter.module.css";
import Text from "../../../../common/components/Text";
import RangeSlider from "../../../../common/components/RangeSlider/RangeSlider";
import { observer } from "mobx-react-lite";
import productsStore from "../../../store/products-store";

const PriceDiapasonFilter = observer(() => {
  const { filter } = productsStore;

  const [minPrice, setMinPrice] = useState<number>(filter.diapason.min);
  const [maxPrice, setMaxPrice] = useState<number>(filter.diapason.max);

  const limitRange = { min: 0, max: 1000 };
  const difference = 10;

  const onChangeMinPriceInput = (value: number) => {
    if (value <= maxPrice - difference && value >= limitRange.min) {
      setMinPrice(value);
      filter.setDiapason({ min: value, max: maxPrice });
    }
  };

  const onChangeMaxPriceInput = (value: number) => {
    if (value - minPrice >= difference && value <= limitRange.max) {
      setMaxPrice(value);
      filter.setDiapason({ min: minPrice, max: value });
    }
  };
  return (
    <div className={style.container}>
      <div className={style.price}>
        <div className={style.inputField}>
          <Text
            className={style.text}
            view="button"
            weight="bold"
            tag="span"
            color="secondary"
          >
            Min $
          </Text>

          <input
            onInput={(e) =>
              onChangeMinPriceInput(Number(e.currentTarget.value))
            }
            type="number"
            name="min"
            className={style.minInput}
            value={minPrice}
          />
        </div>
        <div className={style.divider}></div>
        <div className={style.inputField}>
          <Text
            className={style.text}
            view="button"
            weight="bold"
            tag="span"
            color="secondary"
          >
            Max $
          </Text>
          <input
            type="number"
            name="max"
            onInput={(e) =>
              onChangeMaxPriceInput(Number(e.currentTarget.value))
            }
            value={maxPrice}
            className={style.maxInput}
          />
        </div>
      </div>

      <RangeSlider
        onChangeMin={onChangeMinPriceInput}
        onChangeMax={onChangeMaxPriceInput}
        limitRange={limitRange}
        step={10}
        maxValue={maxPrice}
        difference={difference}
        minValue={minPrice}
      />
    </div>
  );
});

export default PriceDiapasonFilter;
