import React from "react";
import style from "./Empty.module.css";
import { Link } from "react-router-dom";
import Text from "src/common/components/Text";
import { HOME } from "src/utils/const";

export const EmptyBasket = () => {
  return (
    <div className={style.empty}>
      <Text className={style.title} tag="h3">
        Empty basket
      </Text>
      <Link className={style.link} to={HOME}>
        Start shopping
      </Link>
    </div>
  );
};
