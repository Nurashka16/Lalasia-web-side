import React, { useState } from "react";
import style from "./Delivery.module.css";
import Text from "src/common/components/Text";
import GeoIcon from "../icons/GeoIcon";
import Button from "src/common/components/Button";
import ValidationInput from "src/common/components/ValidationInput/ValidationInput";
import classNames from "classnames";
import { RuleBuilder } from "../RuleBuilder";
import paymentStore from "src/goCheckout/stores/payment-store";

const Delivery = () => {
  const { deliveryAddress, setDeliveryAddress } = paymentStore;

  const [changeableAddress, setChangeableAddress] =
    useState<string>(deliveryAddress);
  const [isSavedAddress, setIsSavedAddress] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const builder = new RuleBuilder<string>();
  const myRules = builder
    .required("Address cannot be empty.")
    .fieldIsNotEmpty()
    .build();

  return (
    <section className={style.delivery}>
      <Text
        tag="h2"
        weight="bold"
        color="primary"
        view="p-18"
        className={style.delivery_title}
      >
        Where should the order be delivered?
      </Text>
      <div className={style.delivery_input}>
        <ValidationInput
          isValid={isValid}
          className={style.delivery_field}
          placeholder="example: Moscow Puskina 1"
          value={changeableAddress}
          onChange={(e) => {
            setChangeableAddress(e);
            setDeliveryAddress("");
            if (isSavedAddress) setIsSavedAddress(false);
          }}
          rules={myRules}
          setIsValid={setIsValid}
          afterSlot={
            <GeoIcon className={isSavedAddress ? style.delivery_icon : ""} />
          }
          classNameError={style.delivery_errorText}
        />
        <Button
          className={classNames(
            style.delivery_button,
            !isValid && style.delivery_button__disabled,
            isSavedAddress && style.delivery_button__isActive
          )}
          onClick={() => {
            if (isValid) {
              setDeliveryAddress(changeableAddress);
              setIsSavedAddress(true);
            }
          }}
          disabled={!isValid}
        >
          {isSavedAddress ? "Address Saved" : "Come Here"}
        </Button>
      </div>
    </section>
  );
};

export default Delivery;
