import React from "react";
import style from "./NotFound.module.css";
import Text from "../Text";
import Button from "../Button";

interface INotFound {
  onClick?: () => Promise<void>;
  text: string;
}

const NotFound = ({ onClick, text }: INotFound) => {
  return (
    <div className={style.empty}>
      <Text
        color="primary"
        className="color_red"
        tag="h2"
        maxLines={1}
        weight="bold"
      >
        {text}
      </Text>
      {/* <Button onClick={()=>onClick()}>{text}</Button> */}
    </div>
  );
};

export default NotFound;
