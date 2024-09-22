import React, { useEffect, useState } from "react";
import { Option } from "./MultiDropdown";
import "./MultiDropdown.css";
import classNames from "classnames";

interface MultiDropdownItemProps {
  onClick: (value: Option[]) => void;
  item: Option;
  onChange: (value: Option[]) => void;
  isValue: Option[];
}
//переписать isActive на true
const MultiDropdownItem: React.FC<MultiDropdownItemProps> = ({
  onClick,
  item,
  onChange,
  isValue,
}) => {
  const arrValues = isValue.map((option) => option.value);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    pressedOption();
  }, [isValue]);
  
  const pressedOption = () => {
    if (arrValues.includes(item.value)) {
      setIsActive(true);
    }
  };

  const disabledOption = (item: Option[]) => {
    setIsActive(true);
    onClick(item);
    onChange(item);
  };
  return (
    <div
      style={{
        fontSize: "16px",
        lineHeight: "20px",
      }}
      className={classNames("list", isActive && "active")}
      onClick={() => !isActive && disabledOption([item])}
    >
      {item.value}
    </div>
  );
};

export default MultiDropdownItem;
