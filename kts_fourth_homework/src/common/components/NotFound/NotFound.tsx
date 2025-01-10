import React from "react";
import style from "./NotFound.module.css";
import Text from "../Text";
import Button from "../Button";
import classNames from "classnames";

interface INotFound {
  text: string;
  subtitle?: React.ReactNode;
  className?:string;
}

const NotFound = ({ subtitle, text, className }: INotFound) => {
  return (
    <div className={classNames(style.empty, className)}>
      <Text
        color="primary"
        className="color_red"
        tag="h2"
        maxLines={1}
        weight="bold"
      >
        {text}
      </Text>
      {subtitle && subtitle}
    </div>
  );
};

export default NotFound;
