import React, { useEffect, useState } from "react";
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
import DeliveryDatePicker from "./DatePicker/DatePicker";
import Text from "src/common/components/Text";
import classNames from "classnames";
import DeliveryTabs from "./Delivery/DeliveryTabs";

const GoCheckout: React.FC = observer(() => {
  const navigate = useNavigate();

  const { productsPayment, isLoading } = paymentStore;

  const isEmptyProductsPayment = productsPayment.length === 0;

  useEffect(() => {
    if (isEmptyProductsPayment) {
      navigate(HOME); // Перенаправление на главную страницу, если корзина пуста
    }
  }, [isEmptyProductsPayment, navigate]);

  if (isEmptyProductsPayment) {
    return null; // Если корзина пуста, ничего не рендерим
  }
  const [isShowLoading, setIsShowLoading] = useState(false);
  return isLoading ? (
    <Loader />
  ) : (
    <div className={style.checkout}>
      {isShowLoading && (
        <div className={style.loader}>
          <Loader />
          <Text className={style.loader_text} weight="normal" tag="h2">
            The order is placed
          </Text>
        </div>
      )}
      <div
        className={classNames(
          style.container,
          isShowLoading && style.container_disabled
        )}
      >
        <ButtonBack aria-label="Назад к корзине" link={BASKET} />
        <div className={style.main}>
          <div className={style.content}>
            <DeliveryTabs />
            <div className={style.additional}>
              <DeliveryDatePicker />
              <Payment />
            </div>
            <ProductsCheckout />
          </div>
          <Navbar setIsLoading={setIsShowLoading} />
        </div>
      </div>
    </div>
  );
});

export default GoCheckout;
