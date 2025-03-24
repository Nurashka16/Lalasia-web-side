import React, { useState } from "react";
import style from "./Payment.module.css";
import Text from "src/common/components/Text";
import PaymentCardIcon from "../icons/PaymentCardIcon";
import PaymentCashIcon from "../icons/PaymentCashIcon";
import classNames from "classnames";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };

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
      <div
        className={style.payment_buttons}
        style={{ paddingBottom: selectedPaymentMethod ? "24px" : "42px" }}
      >
        <div
          className={classNames(
            style.payment_button,
            {
              [style.payment_button__isActive]:
                selectedPaymentMethod === "card",
            },
            {
              [style.payment_button__isNotActive]:
                selectedPaymentMethod !== "card",
            }
          )}
          onClick={() => handlePaymentMethodSelect("card")}
        >
          <div className={style.payment_icon}>
            <PaymentCardIcon />
          </div>
          <div className={style.payment_text}>By card</div>
        </div>
        {!selectedPaymentMethod && (
          <Text className={style.payment_description} color="secondary">
            Please, select payment method
          </Text>
        )}
        <div
          className={classNames(
            style.payment_button,
            {
              [style.payment_button__isActive]:
                selectedPaymentMethod === "cash",
            },
            {
              [style.payment_button__isNotActive]:
                selectedPaymentMethod !== "cash",
            }
          )}
          onClick={() => handlePaymentMethodSelect("cash")}
        >
          <div className={style.payment_icon}>
            <PaymentCashIcon />
          </div>
          <div className={style.payment_text}>Upon receipt</div>
        </div>
        <div
          className={classNames(
            style.payment_button,
            {
              [style.payment_button__isActive]:
                selectedPaymentMethod === "qr",
            },
            {
              [style.payment_button__isNotActive]:
                selectedPaymentMethod !== "qr",
            }
          )}
          onClick={() => handlePaymentMethodSelect("qr")}
        >
          <div className={style.payment_icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-qr-code"
              viewBox="0 0 16 16"
            >
              <path d="M2 2h2v2H2z" />
              <path d="M6 0v6H0V0zM5 1H1v4h4zM4 12H2v2h2z" />
              <path d="M6 10v6H0v-6zm-5 1v4h4v-4zm11-9h2v2h-2z" />
              <path d="M10 0v6h6V0zm5 1v4h-4V1zM8 1V0h1v2H8v2H7V1zm0 5V4h1v2zM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8zm0 0v1H2V8H1v1H0V7h3v1zm10 1h-1V7h1zm-1 0h-1v2h2v-1h-1zm-4 0h2v1h-1v1h-1zm2 3v-1h-1v1h-1v1H9v1h3v-2zm0 0h3v1h-2v1h-1zm-4-1v1h1v-2H7v1z" />
              <path d="M7 12h1v3h4v1H7zm9 2v2h-3v-1h2v-1z" />
            </svg>
          </div>
          <div className={style.payment_text}>By QR</div>
        </div>
      </div>
    </div>
  );
};
export default Payment;
