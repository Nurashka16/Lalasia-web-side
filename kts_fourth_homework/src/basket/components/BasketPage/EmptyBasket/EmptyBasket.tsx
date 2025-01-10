import React from "react";
import style from "../Basket.module.css";
import { Link } from "react-router-dom";
import Text from "../../../../common/components/Text";
import Button from "../../../../common/components/Button";
import { HOME } from "../../../../utils/const";

export const EmptyBasket = () => {
  return (
    <div className={style.empty}>
      <Text className={style.empty_title} tag="h3">
        Empty basket
      </Text>
      <Button className={style.empty_btn}>
        <Link className={style.empty_link} to={HOME}>
          Start shopping
        </Link>
      </Button>
    </div>
  );
};
