import React from "react";
import style from "./Popup.module.css";

import { NavLink } from "react-router-dom";
import Button from "../Button";
import Text from "../Text";
import CheckIcon from "../icons/CheckIcon";

interface ISuccess {
  successMessage: string;
  navigate?: string;
  setShowSuccess: (value: boolean) => void;
}

const Success = ({
  successMessage,
  navigate = "/",
  setShowSuccess,
}: ISuccess) => {
  return (
    <div className={style.body}>
      <div className={style.wrap}>
        <CheckIcon className={style.icon} color="secondary"/>
        <Text tag="h2" weight="medium" color="secondary">
          {successMessage}
          {/* Account created successfully */}
        </Text>
        <NavLink to={navigate && navigate}>
          <Button onClick={() => setShowSuccess(false)} className={style.btn}>
            Continue
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Success;
