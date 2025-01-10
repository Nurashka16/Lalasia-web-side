import React, { useEffect, useState } from "react";
import style from "./Counter.module.css";
import Button from "../Button";
import classNames from "classnames";

interface ICounter {
  className?: string;
  defaultCount?: number;
  onClick: (count: number) => void

}

const Counter = ({ className, defaultCount = 1, onClick }: ICounter) => {
  // const [currentValue, setCurrentValue] = useState(defaultCount);

  return (
    <div className={classNames(style.product_count, className)}>
      <Button
        onClick={() =>
          onClick(Number(defaultCount > 0 ? defaultCount - 1 : defaultCount))
        }
        className={style.product_decrease}
        disabled={defaultCount > 1 ? false : true}
      >
        -
      </Button>
      <input
        className={style.product_input}
        onChange={(value) => onClick(Number(value.currentTarget.value))}
        value={defaultCount?.toString()}
      />
      <Button
        onClick={() => onClick(Number(defaultCount + 1))}
        className={style.product_add}
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
