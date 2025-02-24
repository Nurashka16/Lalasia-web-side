import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./ButtonBack.module.css";
import Text from "../Text";
import ArrowBackIcon from "./svg/ArrowBackIcon";
import classNames from "classnames";

interface IButtonBack {
  link?: string;
  onClick?: () => void;
  className?: string;
}

const ButtonBack: React.FC<IButtonBack> = ({
  link,
  onClick,
  className,
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (!link) {
      navigate(-1);
    }
  };

  return (
    <Link
      onClick={handleClick}
      className={classNames(style.btn, className)}
      to={link || "#"}
      {...props}
    >
      <div className={style.btn_icon}>
        <ArrowBackIcon />
      </div>
      <Text view="p-20" weight="normal" className={style.btn_text}>
        Назад
      </Text>
    </Link>
  );
};

export default ButtonBack;
