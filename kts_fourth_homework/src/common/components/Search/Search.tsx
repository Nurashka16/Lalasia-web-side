import React, { useState } from "react";
import style from "./Search.module.css";
import Input from "../Input";
import Button from "../Button";
import { IProductsFilter } from "../../../home/interface/IProductsFilter";

interface ISearch {
  onClick?: () => Promise<void>;
  onChange?: (value: string) => void;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  textBtn?: string;
  isActiveInput?:boolean
}

const Search = ({
  onClick,
  onChange,
  disabled,
  value = "",
  placeholder,
  textBtn = "Find now",
  isActiveInput
}: ISearch) => {
  return (
    <div className={style.search}>
      <Input
      isActive={isActiveInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e)}
      />
      <Button
        onClick={() => onClick && onClick}
        className={style.search_btn}
        disabled={disabled}
      >
        {textBtn}
      </Button>
    </div>
  );
};

export default Search;
