import React, { useState } from "react";
import style from "./Payment.module.css";
import Text from "src/common/components/Text";
import classNames from "classnames";
import PaymentCardIcon from "./icons/PaymentCardIcon";
import PaymentCashIcon from "./icons/PaymentCashIcon";
import PaymentQRIcon from "./icons/PaymentQRIcon";
import paymentStore, { PaymentType } from "src/goCheckout/stores/payment-store";
import { observer } from "mobx-react-lite";
import Button from "src/common/components/Button";

const typesData = new Map<PaymentType, React.ReactNode>([
  ["Card", <PaymentCardIcon />],
  ["Cash", <PaymentCashIcon />],
  ["QR", <PaymentQRIcon />],
]);

const Payment = observer(() => {
  const { paymentType, setPaymentType } = paymentStore;

  const buttonTypeComponents = () => {
    const buttons: React.ReactNode[] = [];
    typesData.forEach((icon, name) => {
      buttons.push(
        <div
          className={classNames(
            style.payment_button,
            paymentType === name
              ? style.payment_button__isActive
              : style.payment_button__isNotActive
          )}
          onClick={() => {
            setPaymentType(name);
          }}
        >
          <div className={style.payment_icon}>{icon}</div>
          <div className={style.payment_text}>{name}</div>
        </div>
      );
    });
    return buttons;
  };

  return (
    <section className={style.payment}>
      <Text
        view="p-18"
        weight="bold"
        color="primary"
        className={style.payment_title}
      >
        Which payment method suits you?
      </Text>
      <div
        className={style.payment_buttons}
        style={{ paddingBottom: paymentType ? "24px" : "42px" }}
      >
        {buttonTypeComponents()}
      </div>
      {!paymentType && (
        <Text className={style.payment_description} color="secondary">
          Please, select payment method
        </Text>
      )}
    </section>
  );
});

export default Payment;
