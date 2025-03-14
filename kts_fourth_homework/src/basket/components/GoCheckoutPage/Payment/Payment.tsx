import React from "react";
import style from "./Payment.module.css";
import Text from "src/common/components/Text";
import PaymentCardIcon from "../icons/PaymentCardIcon";
import PaymentCashIcon from "../icons/PaymentCashIcon";

const Payment = () => {
  return (
    <div className={style.payment}>
      <Text
        view="p-18"
        weight="bold"
        color="primary"
        className={style.payment_title}
      >
        Payment method:
      </Text>
      <div className={style.payment_buttons}>
        <div className={style.payment_button}>
          <div className={style.payment_icon}>
            <PaymentCardIcon />
          </div>
          <div className={style.payment_text}>By card</div>
        </div>
        <div className={style.payment_button}>
          <div className={style.payment_icon}>
            <PaymentCashIcon />
          </div>
          <div className={style.payment_text}>Upon receipt</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
