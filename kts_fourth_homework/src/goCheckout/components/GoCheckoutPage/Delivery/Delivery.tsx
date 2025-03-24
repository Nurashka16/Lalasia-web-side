import React, { useState } from "react";
import style from "./Delivery.module.css";
import Text from "src/common/components/Text";
import GeoIcon from "../icons/GeoIcon";
import Button from "src/common/components/Button";
import ValidationInput from "src/common/components/ValidationInput/ValidationInput";
import classNames from "classnames";

const Delivery: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [isSavedAddress, setIsSavedAddress] = useState<boolean>(false);
  const [addressIsValid, setAddressIsValid] = useState<boolean>(false);

  const rules: IRule<string>[] = [
    {
      errorMessage: "Address cannot be empty.",
      validate: (value) => !!value,
    },
    {
      errorMessage: "Address format should be: City Street Number.",
      validate: (value) => {
        const details = value.split(" ");
        return (
          details.length === 3 &&
          details.every((part) => part.trim() !== "") && // Проверка, что все части не пустые
          !isNaN(Number(details[2])) // Проверка, что третья часть - число
        );
      },
    },
  ];

  return (
    <section className={style.delivery}>
      <Text
        tag="h2"
        weight="bold"
        color="primary"
        view="p-18"
        className={style.deliveryTitle}
      >
        Where should the order be delivered?
      </Text>
      <div className={style.address}>
        <ValidationInput
          className={style.addressInput}
          placeholder="example: Moscow Puskina 1"
          value={address}
          onChange={(e) => {
            setAddress(e);
            if (isSavedAddress) setIsSavedAddress(false);
          }}
          rules={rules}
          setIsValid={setAddressIsValid}
          afterSlot={<GeoIcon />}
          classNameError={style.deliveryInvalid}
        />
        <Button
          className={classNames(
            style.deliveryButton,
            isSavedAddress && style.buttonDisabled
          )}
          onClick={() => {
            if (addressIsValid) setIsSavedAddress(true);
          }}
          disabled={!addressIsValid || isSavedAddress}
        >
          {isSavedAddress ? "Address Saved" : "Come Here"}
        </Button>
      </div>
    </section>
  );
};

export default Delivery;
