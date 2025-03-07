import React, { createContext, useState } from "react";
import { ITab } from "./Tab";
import { useLocation, useParams } from "react-router-dom";

interface ITabs {
  value: string;
  children: React.ReactNode;
  className?: string;
  onChange: (value: string) => void;
}
interface ITabProvider {
  value: string;
  onClick: (value: string) => void;
}
export const HighlightContext = createContext<ITabProvider>(null!);

export const Tabs = ({ value, children, className, onChange }: ITabs) => {
  return (
    <HighlightContext.Provider
      value={{
        value,
        onClick: (value) => {
          onChange(value);
        },
      }}
    >
      <div className={className}>{children}</div>
    </HighlightContext.Provider>
  );
};
