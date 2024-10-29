import React, { useEffect, useState } from "react";
import { Option } from "./MultiDropdown";
import "./MultiDropdown.css";
import classNames from "classnames";
import Button from "../Button";
import Text from "../Text";

interface MultiDropdownItemProps {
  onClick: (value: Option) => void;
  item: Option;
  onChange: (value: Option) => void;
  isValue: Option[];
  deleteValue: (value: Option) => void;
}

const MultiDropdownItem: React.FC<MultiDropdownItemProps> = ({
  onClick,
  item,
  onChange,
  isValue,
  deleteValue,
}) => {
  const arrValues = isValue.map((option) => option.value);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (arrValues.includes(item.value)) {
      setIsActive(false);
    }
  }, [isValue]);

  const addOption = (value:Option) => {
    setIsActive(false);
    onClick(value);
    onChange(value);
  };

  const deleteOption = (value:Option) => {
    setIsActive(true);
    deleteValue(value)
  };

  return (
    <div className="multiDropdownItem">
      <div
        style={{
          fontSize: "16px",
          lineHeight: "20px",
        }}
        className={classNames("list", !isActive && "disabled")}
        onClick={() => isActive && addOption(item)}
      >
        {item.value}
      </div>
      {!isActive && (
        <Button
          onClick={() => deleteOption(item)}
          className="multiDropdownItem_btn"
        >
          ×
        </Button>
      )}
    </div>
  );
};

export default MultiDropdownItem;
