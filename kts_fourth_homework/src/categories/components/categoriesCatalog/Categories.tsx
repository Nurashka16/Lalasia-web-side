import { useEffect } from "react";
import style from "./Categories.module.css";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { PRODUCTS_CATEGORY } from "../../../utils/const";
import Text from "../../../common/components/Text";
import categoriesStore from "../../store/categories-store";

const Categories = observer(() => {
  const { getCategories, categoriesData } =
    categoriesStore;

  useEffect(() => {
    getCategories();
  }, []);

  const categories = categoriesData.map((category) => (
    <Link
      to={PRODUCTS_CATEGORY + category.id}
      className={style.main_content}
      id={category.id.toString()}
    >
      <img className={style.main_img} src={category.image} alt="хуета" />
      <Text
        className={style.main_name}
        tag="h2"
        weight="normal"
        color="primary"
      >
        {category.name}
      </Text>
    </Link>
  ));

  return (
    <div className={style.categories}>
      <div className={style.header}>
        <Text color="primary" weight="bold" tag="h1" maxLines={1}>
          Product category
        </Text>
        <Text tag="h2" className={style.count} weight="bold" color="accent">
          {categories.length}
        </Text>
      </div>
      <div className={style.main}>{categories}</div>
    </div>
  );
});

export default Categories;
