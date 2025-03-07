import React from "react";
import { Link } from "react-router-dom";
import { HOME } from "src/utils/const";
import style from "./Categories.module.css";
import { ICategory } from "../interface/ICategory";
import Text from "src/common/components/Text";
import { Option } from "src/common/MultiDropDown/interface/Option";

interface ICategoryProps {
  category: ICategory;
  onClick: (category: Option<string>) => void;
}

const Category = ({ category, onClick }: ICategoryProps) => {
  return (
    <Link
      to={HOME}
      className={style.category}
      id={category.id.toString()}
      onClick={() => onClick(new Option(category.id.toString(), category.name))}
    >
      <div className={style.main_frame}>
        <img
          className={style.main_img}
          src={category.image}
          alt="there should be a category picture here"
        />
      </div>
      <Text
        className={style.main_name}
        tag="h2"
        weight="normal"
        color="primary"
      >
        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
      </Text>
    </Link>
  );
};

export default Category;
