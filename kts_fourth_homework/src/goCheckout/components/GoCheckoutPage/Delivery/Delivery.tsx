import React, { useEffect, useState } from "react";
import style from "./Delivery.module.css";
import Text from "src/common/components/Text";
import GeoIcon from "./icons/GeoIcon";
import Button from "src/common/components/Button";
import ValidationInput from "src/common/components/ValidationInput/ValidationInput";
import classNames from "classnames";
import paymentStore from "src/goCheckout/stores/payment-store";
import { RuleBuilder } from "src/common/function/RuleBuilder";

const Delivery = () => {
  const { deliveryAddress, setDeliveryAddress } = paymentStore;

  const [changeableAddress, setChangeableAddress] =
    useState<string>(deliveryAddress);
  const [isValid, setIsValid] = useState<boolean>(false);

  const builder = new RuleBuilder<string>();
  const myRules = builder
    .required("Address cannot be empty.")
    .fieldIsNotEmpty()
    .build();

  useEffect(() => {
    setDeliveryAddress("");
    isValid == true && setDeliveryAddress(changeableAddress);
  }, [changeableAddress, isValid]);

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
        <div className={style.delivery_buttons}>
          <Button
            className={classNames(style.delivery_button)}
            disabled={!isValid}
          >
            Address Saved
          </Button>
        </div>
        <ValidationInput
          isValid={isValid}
          className={style.delivery_field}
          placeholder="example: Moscow Puskina 1"
          value={changeableAddress}
          onChange={(e) => {
            setChangeableAddress(e);
          }}
          rules={myRules}
          setIsValid={setIsValid}
          afterSlot={<GeoIcon />}
          classNameError={style.delivery_errorText}
        />
      </div>
    </section>
  );
};

export default Delivery;
