import React from "react";
import { Link } from "react-router-dom";
import style from "./ButtonBack.module.css";
import Text from "../Text";
import ArrowBackIcon from "./svg/ArrowBackIcon";
import classNames from "classnames";

interface IButtonBack {
  link?: string;
  onClick?: () => void;
  className?: string;
}

const ButtonBack = ({ link, onClick, className, ...props }: IButtonBack) => {
  return (
    <Link
      // onClick={() => (onClick ? onClick() : "")}
      className={classNames(style.btn, className)}
      to={link ? link : ""}
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
