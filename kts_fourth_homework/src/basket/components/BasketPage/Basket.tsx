import React, { useEffect } from "react";
import style from "./Basket.module.css";
import Text from "../../../common/components/Text";
import SelectedProduct from "./SelectedProducts/SelectedProduct";
import basketStore from "../../stores/basket-store";
import Navbar from "./Navbar/NavbarBasket";
import { EmptyBasket } from "./EmptyBasket/EmptyBasket";
import SelectedProducts from "./SelectedProducts/SelectedProducts";

const Basket = () => {
  const { getProductsBasket, numberAllProducts, totalPrice } = basketStore;

  useEffect(() => {
    getProductsBasket();
  }, []);

  // const products = productsData.map((product) => {
  //   return (
  //     <SelectedProduct
  //       deleteProduct={deleteProduct}
  //       defaultCount={selectedProducts.get(product.id)!}
  //       updateCountProduct={updateCountProduct}
  //       product={product}
  //     />
  //   );
  // });
  return (
    // <div><Layout title="" className="" main navbar/></div>
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
          <SelectedProducts />
        </div>
        <Navbar goods={numberAllProducts} price={totalPrice} />
      </div>
    </div>
  );
};

export default Basket;
