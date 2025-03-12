import React from "react";
import "./CheckBox.css";
import classNames from "classnames";
import CheckIcon from "../icons/CheckIcon";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
  width?: number;
  height?: number;
  checked: boolean;
  disabled?: boolean;
  className?: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked=true,
  disabled,
  onChange,
  width,
  height,
  ...props
}) => {
  return (
    <form
      className={classNames(
        props.className,
        "form",
        disabled && "form_disabled"
      )}
      style={{ width: width, height: height }}
      onClick={() => !disabled && onChange(!checked)}
    >
      <input
        {...props}
        defaultChecked={checked}
        disabled={disabled}
        style={{ display: !checked ? "none" : "" }}
        className="checkbox"
        type="checkbox"
      />

      <CheckIcon
        style={{ opacity: !checked ? 0 : 1 }}
        className={classNames(
          "checkbox_icon",
          disabled && "checkbox_icon__disabled"
        )}
      />
    </form>
  );
};

export default CheckBox;
