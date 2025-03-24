import React, { useEffect } from "react";
import style from "./GoCheckout.module.css";
import ButtonBack from "src/common/components/ButtonBack/ButtonBack";
import { observer } from "mobx-react-lite";
import Navbar from "./Navbar/Navbar";
import ProductsCheckout from "./ProductsCheckout/ProductsCheckout";
import { useNavigate } from "react-router-dom";
import { BASKET, HOME } from "src/utils/const";
import Payment from "./Payment/Payment";
import Delivery from "./Delivery/Delivery";
import paymentStore from "src/goCheckout/stores/payment-store";
import Loader from "src/common/components/Loader";
import DeliveryDatePicker from "./Delivery/DatePicker/DatePicker";

const GoCheckout: React.FC = observer(() => {

  const navigate = useNavigate();

  const { productsPayment, isLoading } = paymentStore;

  const isEmptyProductsPayment = productsPayment.length === 0;

  // useEffect(() => {
  //   if (isEmptyProductsPayment) {
  //     navigate(HOME); // Перенаправление на главную страницу, если корзина пуста
  //   }
  // }, [isEmptyProductsPayment, navigate]);

  // if (isEmptyProductsPayment) {
  //   return null; // Если корзина пуста, ничего не рендерим
  // }

  return isLoading ? (
    <Loader />
  ) : (
    <div className={style.checkout}>
      <ButtonBack aria-label="Назад к корзине" link={BASKET} />
      <div className={style.main}>
        <div className={style.content}>
          <div className={style.additional}>
            <Delivery />
            <DeliveryDatePicker />
          </div>
          <Payment />
          <ProductsCheckout />
        </div>
        <Navbar />
      </div>
    </div>
  );
});

export default GoCheckout;
