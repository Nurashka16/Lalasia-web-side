import classNames from "classnames";
import React, { useState } from "react";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import Text from "src/common/components/Text";
import Input from "src/common/components/Input/Input";
import Button from "src/common/components/Button";
import { observer } from "mobx-react-lite";
import paymentStore from "src/goCheckout/stores/payment-store";
import PromotionalCode from "./PromotionalCode/PromotionalCode";
import NavbarLayout from "src/basket/components/BasketPage/Navbar/NavbarLayout";
import profileStore from "src/profile/stores/profile-store";

const Navbar = observer(() => {
  const { sumProducts, deliveryAddress, paymentType, deliveryDate } =
    paymentStore;
    const {addOrder}=profileStore;

  const isPaymentReady =
    paymentType != undefined && deliveryAddress != "" && deliveryDate != "";

  const sumDelivery = sumProducts > 100 ? 0 : sumProducts / 10;
  return (
    <div className={style.navbar}>
      <NavbarLayout
        actionSlot={
          <Link to="/" className={style.pay_btn}>
            <Button
              aria-label="Proceed to online payment"
              disabled={!isPaymentReady}
              style={{ width: "100%", borderRadius: "7px" }}
              onChange={()=>addOrder({address:"",dateDelivery:"", paymentType:"",products:"", totalCount:""})}
            >
              Pay online
            </Button>
          </Link>
        }
        contentSlot={
          <>
            <div className={style.total}>
              <Text color="secondary" tag="h4">
                Delivery:
              </Text>
              <Text
                // className={style.total_price}
                tag="h4"
                color="secondary"
              >
                {sumDelivery} $
              </Text>
            </div>
            <div className={style.total}>
              <Text className={style.total_text} color="primary" tag="h3">
                Total:
              </Text>
              <Text
                className={style.total_price}
                tag="p"
                view="p-20"
                weight="bold"
                color="accent"
              >
                {sumProducts + sumDelivery} $
              </Text>
            </div>
          </>
        }
        subtitle={
          <Text tag="h5" color="secondary" className={style.pay_description}>
            By clicking on the button, you agree to the Terms of Processing of
            Personal Data, as well as the Terms of Sale
          </Text>
        }
      />
      <div className={style.promotionalCode}>
        <Text weight="bold" className={style.promotionalCode_title} view="p-18">
          Promotional code or certificate:
        </Text>
        <PromotionalCode />
      </div>
    </div>
  );
});

export default Navbar;
