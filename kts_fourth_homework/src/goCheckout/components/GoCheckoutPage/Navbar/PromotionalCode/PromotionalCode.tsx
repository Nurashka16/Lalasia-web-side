import React, { useState } from "react";
import style from "./PromotionalCode.module.css";
import Input from "src/common/components/Input/Input";
import NavbarLayout from "src/basket/components/BasketPage/Navbar/NavbarLayout";
import Button from "src/common/components/Button";
import { observer } from "mobx-react-lite";
import paymentStore from "src/goCheckout/stores/payment-store";

const PromotionalCode = observer(() => {
  const { applyCoupon, couponError, resetCoupon } = paymentStore;
  const [inputValue, setInputValue] = useState("");

  return (
    <NavbarLayout
      actionSlot={
        <Input
          className={style.input}
          value={inputValue}
          placeholder="Enter the code"
          onChange={(e) => {
            setInputValue(e);
            // resetCoupon();
          }}
          aria-label="Enter promotional code"
        />
      }
      className={style.btn}
      contentSlot={
        <Button
          className={style.b}
          onClick={() => applyCoupon(inputValue)}
          disabled={!inputValue}
          style={{ width: "100%", borderRadius: "7px" }}
        >
          Apply promotional code
        </Button>
      }
      subtitle={<div className={style.errorText}>{couponError}</div>}
    />
  );
});

export default PromotionalCode;
//     <div className={style.promotionalCode_input}>
// <Input
//   className={style.input}
//   value=""
//   placeholder="Enter the code"
//   onChange={(e) => setPromoCode(e)}
//   aria-label="Enter promotional code"
// />
// <Button
//   onClick={() => console.log("Apply promo code:", promoCode)}
//   disabled
//   style={{ width: "100%", borderRadius: "7px" }}
// >
//   Apply promotional code
// </Button>
//   </div>
