import classNames from "classnames";
import React, { useContext } from "react";
import style from "./Tabs.module.css";
import { HighlightContext } from "./Tabs";
import { Link } from "react-router-dom";

export interface ILinkTab {
  children: React.ReactNode;
  name: string;
  className?: string;
  to: string;
}

const LinkTab = ({ children, name, className, to }: ILinkTab) => {
  const { value, onClick } = useContext(HighlightContext);
  return (
    <Link
      to={to}
      className={classNames(
        style.link,
        value == name && style.isActive,
        className
      )}
      onClick={() => onClick(name)}
    >
      {children}
      {value == name && <div className={style.line}></div>}
    </Link>
  );
};

export default LinkTab;
