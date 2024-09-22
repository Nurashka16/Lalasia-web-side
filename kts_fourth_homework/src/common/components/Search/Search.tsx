import React, { useState } from "react";
import style from "./Search.module.css";
import Input from "../Input";
import Button from "../Button";

interface ISearch {
  onClick: (value: string) => Promise<void>;
}

const Search = ({ onClick }: ISearch) => {
  const [value, setValue] = useState("");
  return (
    <div className={style.search}>
      <Input
        placeholder="Search product"
        value={value}
        onChange={(e) => setValue(String(e))}
      />
      <Button
        onClick={() => onClick(value)} //searchProducts({categoryId:1})
        className={style.search_btn}
      >
        Find now
      </Button>
    </div>
  );
};

export default Search;
