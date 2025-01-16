import React, { useEffect } from "react";
import style from "../Basket.module.css";
import Text from "../../../../common/components/Text";
import Button from "../../../../common/components/Button";
import { Link } from "react-router-dom";

interface INavbar {
  goods: number;
  price: number;
}

const NavbarBasket = ({ goods, price }: INavbar) => {
  return (
    <div className={style.navbar}>
      <div className={style.navbar_content}>
        <Button className={style.navbar_btn} onClick={() => console.log(2)}>
          <Link className={style.navbar_link} to="/goCheckout">
            Go to registration
          </Link>
        </Button>
        <Text
          maxLines={2}
          tag="h5"
          color="secondary"
          className={style.subtitle}
        >
          Available delivery methods and times can be selected when placing an
          order.
        </Text>
        <div className={style.line}></div>
      </div>

      <div className={style.navbar_footer}>
        <div className={style.navbar_goods}>
          <Text color="secondary" className={style.goods_title} tag="h4">
            Goods:
          </Text>
          <Text className={style.goods_count}>{goods}</Text>
        </div>
        <div className={style.navbar_totalCost}>
          <Text className={style.totalCost_title} tag="h3">
            Total cost:
          </Text>
          <Text
            className={style.totalCost_count}
            weight="bold"
            tag="h3"
            color="accent"
          >
            {price}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default NavbarBasket;
