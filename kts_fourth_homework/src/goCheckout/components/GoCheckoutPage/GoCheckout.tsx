import style from "./GoCheckout.module.css";
import ButtonBack from "src/common/components/ButtonBack/ButtonBack";
import { observer } from "mobx-react-lite";
import Navbar from "./Navbar/Navbar";
import ProductsCheckout from "./ProductsCheckout/ProductsCheckout";
import basketStore from "src/basket/stores/basket-store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HOME } from "src/utils/const";
import Payment from "./Payment/Payment";
import Delivery from "./Delivery/Delivery";

const GoCheckout = observer(() => {
  const { selectedProductsPayment } = basketStore;

  // Проверяем наличие выбранных продуктов и если ничего не выбрано, то перенаправляем на другую страницу
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedProductsPayment.length === 0) {
      navigate(HOME);
    }
  }, [selectedProductsPayment, navigate]);

  return (
    <div className={style.checkout}>
      <ButtonBack />
      <div className={style.main}>
        <div className={style.content}>
          <ProductsCheckout />
          <Payment />
          <Delivery />
        </div>
        <Navbar />
      </div>
    </div>
  );
});

export default GoCheckout;
