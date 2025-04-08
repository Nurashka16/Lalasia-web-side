import React, { useState } from "react";
import style from "./PromotionalCode.module.css";
import Input from "src/common/components/Input/Input";
import NavbarLayout from "src/common/components/NavbarLayout/NavbarLayout";
import Button from "src/common/components/Button";
import { observer } from "mobx-react-lite";
import paymentStore from "src/goCheckout/stores/payment-store";
import Text from "src/common/components/Text";

const PromotionalCode = observer(() => {
  const { applyCoupon, couponError } = paymentStore;
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={style.promotionalCode}>
      <NavbarLayout
        titleSlot={
          <Text
            weight="bold"
            className={style.promotionalCode_title}
            view="p-18"
          >
            Promotional code or certificate:
          </Text>
        }
        className={style.promotionalCode_navbar}
        actionSlot={
          <Input
            className={style.promotionalCode_input}
            value={inputValue}
            placeholder="Enter the code"
            onChange={(e) => {
              setInputValue(e);
            }}
            aria-label="Enter promotional code"
          />
        }
        contentSlot={
          <Button
            className={style.promotionalCode_btn}
            onClick={() => applyCoupon(inputValue)}
            disabled={!inputValue}
            style={{ width: "100%", borderRadius: "7px" }}
          >
            Apply promotional code
          </Button>
        }
        subtitle={
          <div className={style.promotionalCode_errorText}>{couponError}</div>
        }
      />
    </div>
  );
});

export default PromotionalCode;
