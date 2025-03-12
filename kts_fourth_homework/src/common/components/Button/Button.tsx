import React from "react";
import "./Button.css";
import classNames from "classnames";
import Loader from "../Loader";
import Text from "../Text";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: React.FC<ButtonProps> = ({
  className,
  disabled,
  children,
  loading = false,
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={(e) => onClick && onClick(e)}
      disabled={disabled || loading}
      {...props}
      className={classNames(className, "btn")}
    >
      {loading && <Loader className="btn_loader" color="white" size="s" />}
      <Text tag="span" view="button">
        {children}
      </Text>
    </button>
  );
};

export default Button;
