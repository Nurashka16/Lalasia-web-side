import React, { useState } from "react";
import style from "./Search.module.css";
import Input from "../Input";
import Button from "../Button";
import { IProductsFilter } from "../../../home/interface/IProductsFilter";

interface ISearch {
  onClick: () => Promise<void>;
  onChange: (value: string)=> void;
  disabled?: boolean;
  value: string;
  placeholder?: string;
}

const Search = ({
  onClick,
  onChange,
  disabled,
  value,
  placeholder,
}: ISearch) => {
  return (
    <div className={style.search}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />
      <Button
        onClick={() => onClick()}
        className={style.search_btn}
        disabled={disabled}
      >
        Find now
      </Button>
    </div>
  );
};

export default Search;
