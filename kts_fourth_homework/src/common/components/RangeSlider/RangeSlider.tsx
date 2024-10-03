import React, { useEffect, useRef } from "react";
import style from "./RangeSlider.module.css";
import Text from "../Text";
import { IRange } from "../../../home/components/ProductsFilters/ProductsFilters";

interface IRangeSlider {
  defaultMinValue: number;
  defaultMaxValue: number;
  difference: number;
  step: number;
  onChange: React.Dispatch<React.SetStateAction<IRange>>;
  range: IRange;
}
const RangeSlider = ({
  defaultMaxValue,
  range,
  defaultMinValue,
  difference = (range.max / 100) * 15, //15%
  step,
  onChange,
}: IRangeSlider) => {
  const rangeMinRef = useRef<HTMLInputElement>(null!);
  const rangeMaxRef = useRef<HTMLInputElement>(null!);

  const priceMinRef = useRef<HTMLInputElement>(null!);
  const priceMaxRef = useRef<HTMLInputElement>(null!);

  const progressRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    onChangeRange(rangeMinRef.current);
  }, []);

  const marginLeft = (min: number) => {
    return (min / Number(rangeMinRef.current.max)) * 100 + "%";
  };

  const marginRight = (max: number) => {
    return 100 - (max /Number(rangeMinRef.current.max)) * 100 + "%";
  };

  const onChangeRange = (e: React.FormEvent<HTMLInputElement>) => {
    const min: number = parseInt(rangeMinRef.current.value);
    const max: number = parseInt(rangeMaxRef.current.value);

    if (max - min < difference) {
      if (e.currentTarget.name == "minRange") {
        rangeMinRef.current.value = String(max - difference);
      } else {
        rangeMaxRef.current.value = String(min + difference);
      }
    } else {
      priceMinRef.current.value = String(min);
      priceMaxRef.current.value = String(max);
      progressRef.current.style.left = marginLeft(min);
      progressRef.current.style.right = marginRight(max);
    }
    onChange({
      min: Number(rangeMinRef.current.value) ,
      max: Number(rangeMaxRef.current.value),
    });
  };

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const min: number = parseInt(priceMinRef.current.value);
    const max: number = parseInt(priceMaxRef.current.value);

    // if(max >3750) { если написано больше чем макс Прайс
    //   progressRef.current.style.right = marginRight(3750);
    //   rangeMax.current.value =3750
    // }
    if (max - min >= difference && max <= range.max) {
      if (e.currentTarget.name == "minPrice") {
        rangeMinRef.current.value = String(min);
        progressRef.current.style.left = marginLeft(min);
      } else {
        rangeMaxRef.current.value = String(max);
        progressRef.current.style.right = marginRight(max);
      }
    }
    onChange({
      min: Number(rangeMinRef.current.value),
      max: Number(rangeMaxRef.current.value),
    });
  };

  return (
    <div className={style.container}>
      <div className={style.price}>
        <div className={style.inputField}>
          <Text className={style.text} tag="span" color="secondary">
            Min $
          </Text>
          <input
            onInput={(e) => onChangeInput(e)}
            type="number"
            ref={priceMinRef}
            defaultValue={defaultMinValue}
            name="minPrice"
            className={style.minInput}
          />
        </div>
        <div className={style.divider}></div>
        <div className={style.inputField}>
          <Text className={style.text} tag="span" color="secondary">
            Max $
          </Text>
          <input
            type="number"
            onInput={(e) => onChangeInput(e)}
            ref={priceMaxRef}
            defaultValue={defaultMaxValue}
            className={style.maxInput}
          />
        </div>
      </div>
      <div className={style.slider}>
        <div className={style.progress} ref={progressRef}></div>
      </div>
      <div className={style.range}>
        <input
          ref={rangeMinRef}
          type="range"
          className={style.minRange}
          name="minRange"
          onInput={(e) => onChangeRange(e)}
          min={range.min}
          max={range.max}
          step={step}
          defaultValue={defaultMinValue}
        />
        <input
          ref={rangeMaxRef}
          onInput={(e) => onChangeRange(e)}
          type="range"
          className={style.maxRange}
          min={range.min}
          max={range.max}
          step={step}
          defaultValue={defaultMaxValue}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
