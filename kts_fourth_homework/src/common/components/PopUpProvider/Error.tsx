import React from "react";
import style from "./Popup.module.css";
import Text from "../Text";
import Button from "../Button";

interface IError {
  onClick: (value: boolean) => void;
  errorMessage: string;
}

const Error = ({ onClick, errorMessage }: IError) => {
  return (
    <div className={style.body}>
      <div className={style.wrap}>
        <Text tag="h2" weight="medium" color="secondary">
          {errorMessage}
        </Text>
        <Button className={style.btn_red} onClick={() => onClick(false)}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default Error;
