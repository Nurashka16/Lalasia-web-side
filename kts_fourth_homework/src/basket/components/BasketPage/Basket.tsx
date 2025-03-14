import React, { useEffect, useState } from "react";
import style from "./Basket.module.css";
import basketStore from "../../stores/basket-store";
import Navbar from "./Navbar/NavbarBasket";
import SelectedProducts from "./SelectedProducts/SelectedProducts";
import { observer } from "mobx-react-lite";
import Text from "src/common/components/Text";
import Loader from "src/common/components/Loader";

const Basket = observer(() => {
  const { getProducts, isLoading} = basketStore;

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className={style.basket}>
      <Text className={style.title} weight="bold" tag="h1">
        Basket
      </Text>
      <div className={style.main}>
        <div className={style.content}>
          <div className={style.description}>
            <Text view="p-18" weight="medium">
              Free shipping over $100
            </Text>
          </div>
          {isLoading ? (
            <div className={style.loader}>
              <Text weight="medium" view="p-20" color="primary">
                Loading
              </Text>
              <Loader />
            </div>
          ) : (
            <SelectedProducts />
          )}
        </div>
        <Navbar />
      </div>
    </section>
  );
});

export default Basket;
