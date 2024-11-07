import React, { useState } from "react";
import "./Input.css";
import classNames from "classnames";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
  isActive?:boolean
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, disabled,isActive, ...props }) => {
    const [newValue, setNewValue] = useState(value);
    const onChangeHandler = (value: string) => {
      setNewValue(value);
      onChange(value);
    };
    return (
      <form className={classNames(props.className, "form")}>
        <input
          {...props}
          disabled={disabled}
          className={classNames("input", isActive && "isActiveInput")}
          onChange={(e) => onChangeHandler(e.target.value)}
          type="text"
          placeholder={props.placeholder}
          value={newValue}
        />
        {afterSlot && <div className="wrap_icon"> {afterSlot}</div>}
      </form>
    );
  }
);

export default Input;
