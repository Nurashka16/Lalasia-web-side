import React from "react";
import style from "./Popup.module.css";
import Text from "../Text";
import Loader from "../Loader";

const Loading = () => {
  return (
    <div className={style.body}>
      <div className={style.wrap}>
        <Loader size="l" />
        <Text tag="h2" weight="medium" color="secondary">
          Wait loading
        </Text>
      </div>
    </div>
  );
};

export default Loading;
