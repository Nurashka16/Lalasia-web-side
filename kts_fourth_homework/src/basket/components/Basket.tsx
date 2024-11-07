import React from "react";
import style from "./Basket.module.css";
import Text from "../../common/components/Text";
import CheckIcon from "../../common/components/icons/CheckIcon";
import CheckBox from "../../common/components/CheckBox";
import SelectedProduct from "./SelectedProduct/SelectedProduct";
import Button from "../../common/components/Button";
import { Link } from "react-router-dom";

const Basket = () => {
  const productsName = [
    {
      id: 1,
      title: "Handmade Fresh Table1",
      price: 687,
      description: "Andy shoes are designed to keeping in...",
      category: {
        id: 5,
        name: "Others",
        image: "https://placeimg.com/640/480/any?r=0.591926261873231",
      },
      images: [
        "https://alfanit.ru/upload/iblock/8eb/i6s3axxl4nifmeat1atmsd1qfdujm37c.jpg",
        "https://placeimg.com/640/480/any?r=0.9300320592588625",
        "https://placeimg.com/640/480/any?r=0.8807778235430017",
      ],
    },
    {
      id: 2,
      title: "Handmade Fresh Table2",
      price: 687,
      description: "Andy shoes are designed to keeping in...",
      category: {
        id: 5,
        name: "Others",
        image: "https://placeimg.com/640/480/any?r=0.591926261873231",
      },
      images: [
        "https://chinatoday.ru/wp-content/uploads/2015/11/1111.jpg",
        "https://placeimg.com/640/480/any?r=0.9300320592588625",
        "https://placeimg.com/640/480/any?r=0.8807778235430017",
      ],
    },
  ];
  const products = productsName.map((product) => {
    return <SelectedProduct product={product} />;
  });
  return (
    <div className={style.basket}>
      <Text className={style.title} weight="bold" tag="h1">
        Basket
      </Text>
      <div className={style.content}>
        <div className={style.main}>
          <div className={style.main_description}>
            <Text view="p-18" weight="medium">
            Free shipping over $100
            </Text>
          </div>
          <div className={style.products}>{products}</div>
        </div>
        <div className={style.navbar}>
          <div className={style.navbar_link}>
          <Link to="/goCheckout" className={style.navbar_button}>Go to checkout</Link>
          </div>
          <Text className={style.navbar_description} view="p-14" weight="normal" color="secondary" maxLines={3}>
          Available delivery methods and times can be selected when placing an order.
          </Text>
          <div className={style.line}></div>
          <div className={style.navbar_main}>
            <Text tag="h3" weight="bold" className={style.navbar_title}>
              Your basket
            </Text>
            <div className={style.navbar_count}>
              <Text
                className={style.count__title}
                color="secondary"
                view="p-16"
              >
                Quantity of goods:
              </Text>
              <Text className={style.count} weight="bold" view="p-16">
                2
              </Text>
            </div>

            <div className={style.navbar_footer}>
              <Text color="secondary" maxLines={1}>
                For payment
              </Text>
              <div className={style.account}>
                <Text tag="h2" weight="bold" color="accent">
                  1200
                </Text>
                <Text tag="h2"
                  className={style.product_currency}
                  color="accent"
                >
                  $
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
