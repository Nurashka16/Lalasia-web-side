import style from "./Search.module.css";
import Button from "../Button";
import { useEffect, useState } from "react";
import Input from "../Input/Input";

interface ISearch {
  onClick: () => Promise<void>;
  onChange: (value: string) => void;
  disabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
  textBtn?: string;
  className?: string;
}

const Search = ({
  onClick,
  onChange,
  disabled,
  defaultValue = "",
  placeholder,
  textBtn = "Find now",
  className,
}: ISearch) => {
  return (
    <div className={style.search}>
      <Input
        className={className}
        placeholder={placeholder}
        value={defaultValue}
        onChange={onChange}
      />
      <Button
        onClick={onClick}
        className={style.search_btn}
        disabled={disabled}
      >
        {textBtn}
      </Button>
    </div>
  );
};

export default Search;
