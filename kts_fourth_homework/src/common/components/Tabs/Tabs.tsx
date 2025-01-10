import React, { createContext, useState } from "react";
import { ITab } from "./Tab";

interface ITabs {
  value: string;
  children: React.ReactNode;
  className?: string;
  onChange?: (value: string) => void;
}
interface ITabProvider {
  activeValue: string;
  onClick: (value: string) => void;
}
export const HighlightContext = createContext<ITabProvider>(null!);

export const Tabs = ({ value, children, className, onChange }: ITabs) => {
  const [activeValue, setActiveValue] = useState(value);
  return (
    <HighlightContext.Provider value={{ activeValue, onClick: (value) => {
        setActiveValue(value);
        onChange && onChange(value)
    } }}>
      <div className={className}>{children}</div>
    </HighlightContext.Provider>
  );
};
