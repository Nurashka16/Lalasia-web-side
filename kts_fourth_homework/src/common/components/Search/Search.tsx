import React, { useState } from "react";
import style from "./Search.module.css";
import Input from "../Input";
import Button from "../Button";

interface ISearch {
  onClick: () => void;
  onChange? :React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  value: string
}

const Search = ({ onClick, onChange, disabled, value }: ISearch) => {
  // const [value, setValue] = useState("");
  return (
    <div className={style.search}>
      <Input
        placeholder="Search product"
        value={value}
        onChange={(e) => onChange ? onChange(e) : ""}
      />
      <Button
        onClick={() => onClick()} //searchProducts({categoryId:1})
        className={style.search_btn}
        disabled={disabled}
      >
        Find now
      </Button>
    </div>
  );
};

export default Search;
