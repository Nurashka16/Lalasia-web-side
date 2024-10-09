import React, { useEffect, useRef } from "react";
import style from "./RangeSlider.module.css";
import { IRange } from "../../../home/components/ProductsFilters/ProductsFilters";

interface IRangeSlider {
  minValue: number;
  maxValue: number;
  difference: number;
  step: number;
  onChangeMin: (value: number) => void;
  onChangeMax: (value: number) => void;
  limitRange: IRange;
}
const RangeSlider = ({
  maxValue,
  limitRange,
  minValue,
  difference = (limitRange.max / 100) * 15, //15%
  step,
  onChangeMin,
  onChangeMax,
}: IRangeSlider) => {
  const rangeMinRef = useRef<HTMLInputElement>(null!);
  const rangeMaxRef = useRef<HTMLInputElement>(null!);
  const progressRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    onChangeMinRange(minValue);
  }, [minValue]);

  useEffect(() => {
    onChangeMaxRange(maxValue);
  }, [maxValue]);

  const marginLeft = (min: number) => {
    return (min / Number(rangeMinRef.current.max)) * 100 + "%";
  };

  const marginRight = (max: number) => {
    return 100 - (max / Number(rangeMinRef.current.max)) * 100 + "%";
  };

  const onChangeMinRange = (value: number) => {
    // const min: number = parseInt(rangeMinRef.current.value);
    const max: number = parseInt(rangeMaxRef.current.value);
    if (max - value < difference) {
      rangeMinRef.current.value = String(max - difference);
    } else {
      onChangeMin(value);
      progressRef.current.style.left = marginLeft(value);
      rangeMinRef.current.value = String(value);
    }
  };
  const onChangeMaxRange = (value: number) => {
    const min: number = parseInt(rangeMinRef.current.value);
    // const max: number = parseInt(rangeMaxRef.current.value);
    if (value - min < difference) {
      rangeMaxRef.current.value = String(min + difference);
    } else {
      onChangeMax(value);
      // rangeMaxRef.current.style.left = marginRight(value);
      progressRef.current.style.right = marginRight(value);
      rangeMaxRef.current.value = String(value);
    }
  };
  return (
    <>
      <div className={style.slider}>
        <div className={style.progress} ref={progressRef}></div>
      </div>
      <div className={style.range}>
        <input
          ref={rangeMinRef}
          type="range"
          className={style.minRange}
          name="min"
          onInput={(e) => onChangeMinRange(Number(e.currentTarget.value))}
          min={limitRange.min}
          max={limitRange.max}
          step={step}
          defaultValue={minValue}
        />
        <input
          ref={rangeMaxRef}
          onInput={(e) => onChangeMaxRange(Number(e.currentTarget.value))}
          type="range"
          name="max"
          className={style.maxRange}
          min={limitRange.min}
          max={limitRange.max}
          step={step}
          defaultValue={maxValue}
        />
      </div>
    </>
  );
};

export default RangeSlider;
