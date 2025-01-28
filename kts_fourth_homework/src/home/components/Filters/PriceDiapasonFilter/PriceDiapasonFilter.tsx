import style from "./PriceDiapasonFilter.module.css";
import { observer } from "mobx-react-lite";
import Text from "src/common/components/Text";
import RangeSlider from "src/common/components/RangeSlider/RangeSlider";
import productsStore from "src/home/store/products-store";

const PriceDiapasonFilter = observer(() => {
  const { filter } = productsStore;

  const limitRange = { min: 0, max: 1000 };
  const difference = 10;

  const onChangeMinPriceInput = (value: number) => {
    if (value <= filter.diapason.max - difference && value >= limitRange.min) {
      filter.setDiapason({ min: value, max: filter.diapason.max });
    }
  };
  const onChangeMaxPriceInput = (value: number) => {
    if (value - filter.diapason.min >= difference && value <= limitRange.max) {
      filter.setDiapason({ min: filter.diapason.min, max: value });
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
            value={filter.diapason.min}
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
            value={filter.diapason.max}
            className={style.maxInput}
          />
        </div>
      </div>

      <RangeSlider
        onChangeMin={onChangeMinPriceInput}
        onChangeMax={onChangeMaxPriceInput}
        limitRange={limitRange}
        step={10}
        maxValue={filter.diapason.max}
        difference={difference}
        minValue={filter.diapason.min}
      />
    </div>
  );
});

export default PriceDiapasonFilter;
