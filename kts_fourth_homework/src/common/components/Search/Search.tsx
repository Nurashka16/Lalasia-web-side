import style from "./Search.module.css";
import Button from "../Button";
import Input from "../Input/Input";
import { useState } from "react";

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
  const [isSearching, setIsSearching] = useState(false);
  return (
    <div className={style.search}>
      <Input
        className={className}
        placeholder={placeholder}
        value={defaultValue}
        onChange={onChange}
      />
      <Button
        className={`${style.search_btn} ${isSearching ? style.colorChange  : ""}`}
        onClick={() => {
          onClick();
          setIsSearching(true);
          setTimeout(() => setIsSearching(false), 500);
        }}
        disabled={disabled}
      >
        {textBtn}
      </Button>
    </div>
  );
};

export default Search;
