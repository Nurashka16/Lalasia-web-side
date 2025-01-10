import React from "react";
import { Link } from "react-router-dom";
import style from "./ButtonBack.module.css";
import Text from "../Text";

interface IButtonBack {
  link?: string;
  onClick?: () => void;
}

const ButtonBack = ({ link, onClick,  ...props }: IButtonBack) => {
  return (
    <Link 
      // onClick={() => (onClick ? onClick() : "")}
      className={style.btn_back}
      to={link ? link : ""}
    >
      <div className={style.btn_icon}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
            stroke="black"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <Text view="p-20" weight="normal">
        Назад
      </Text>
    </Link>
  );
};

export default ButtonBack;
