import React, { useContext } from "react";
import { HighlightContext } from "./Tabs";
import style from './Tabs.module.css'
import classNames from "classnames";

export interface ITab {
  children: React.ReactNode;
  value: string;
  onClick: (value: string) => void;
  className?:string;
}

const Tab = ({ children, onClick, value, className }: ITab) => {
  const parentValue = useContext(HighlightContext);
  return (
    <div
      className={classNames(style.link,parentValue == value && style.isActive, className)}
      onClick={() => onClick(value)}
    >
      {children}
    </div>
  );
};

export default Tab;
