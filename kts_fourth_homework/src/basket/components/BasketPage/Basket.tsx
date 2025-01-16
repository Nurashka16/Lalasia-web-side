import React, { useEffect, useState } from "react";
import style from "./Basket.module.css";
import Text from "../../../common/components/Text";
import basketStore from "../../stores/basket-store";
import Navbar from "./Navbar/NavbarBasket";
import SelectedProducts from "./SelectedProducts/SelectedProducts";
import Loader from "../../../common/components/Loader";
import { observer } from "mobx-react-lite";

const Basket = observer(() => {
  const { countSelectedProducts, totalPrice, getProducts } = basketStore;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
          {isLoading ? <Loader /> : <SelectedProducts />}
        </div>
        <Navbar goods={countSelectedProducts} price={totalPrice} />
      </div>
    </div>
  );
});

export default Basket;
