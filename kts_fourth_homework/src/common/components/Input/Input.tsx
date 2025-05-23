import React, { useEffect } from "react";
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
  isActive?: boolean;
  classNameIcon?: string;
  type?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    value,
    onChange,
    afterSlot,
    disabled,
    isActive,
    classNameIcon,
    type = "text",
    ...props
  }) => {
    return (
      <form className="input_form">
        <input
          type={type}
          {...props}
          disabled={disabled}
          className={classNames(
            "input",
            props.className,
            isActive && "isActiveInput"
          )}
          onChange={(e) => onChange(e.target.value)}
          placeholder={props.placeholder}
          value={value}
        />
        {afterSlot && (
          <div className={classNames("wrap_icon", classNameIcon)}>
            {afterSlot}
          </div>
        )}
      </form>
    );
  }
);

export default Input;
