import classNames from "classnames";
import React, { useContext } from "react";
import style from "./Tabs.module.css";
import { HighlightContext } from "./Tabs";
import { Link } from "react-router-dom";

export interface ILinkTab {
  children: React.ReactNode;
  value: string;
  className?: string;
  to: string;
}

const LinkTab = ({ children, value, className, to }: ILinkTab) => {
  const { activeValue, onClick } = useContext(HighlightContext);
  return (
    <Link
      to={to}
      className={classNames(
        style.link,
        activeValue == value && style.isActive,
        className
      )}
      onClick={() => onClick(value)}
    >
      {children}
      {activeValue == value && <div className={style.line}></div>}
    </Link>
  );
};

export default LinkTab;
