import React, { ReactEventHandler, useState } from "react";
import { Option } from "./MultiDropdown";
import classNames from "classnames";
import Button from "../Button";
//переименовать

interface IItem {
  item: Option;
  onClick: (id:number) => void;
  isActiveDefault: boolean;
}

const MultiDropdownItemCopy = ({
  item,
  onClick,
  isActiveDefault = true,
}: IItem) => {
  const [isActive, setIsActive] = useState(isActiveDefault);

  const addOption = (data: Option) => {
    setIsActive(!isActive);

    onClick(Number(data.key));
  };

  return (
    <div
      id={item.key}
      onClick={(e) =>
        addOption({
          key: e.currentTarget.id,
          value: e.currentTarget.firstChild.innerHTML,//убрать
        })
      }
      className={classNames(
        "multiDropdownItem",
        isActive && "multiDropdown_title__active"
      )}
    >
      <span>{item.value}</span>
      {!isActive && <span className="multiDropdownItem_button">×</span>}
    </div>
  );
};

export default MultiDropdownItemCopy;
