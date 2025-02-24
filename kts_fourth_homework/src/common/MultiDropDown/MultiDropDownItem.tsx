import classNames from "classnames";
import style from "./MultiDropdown.module.css";
import { Option } from "./interface/Option";

interface IMultiDropdownItemProps {
  item: Option<string>;
  onClick: (option: Option<string>) => void;
  isActive: boolean;
  className?: string;
  afterSlot?: React.ReactNode;
  disabled?: boolean;
}

const MultiDropdownItem = ({
  item,
  onClick,
  isActive = false,
  className,
  afterSlot,
  disabled,
}: IMultiDropdownItemProps) => {
  return (
    <div
      style={{ pointerEvents: disabled ? "none" : "auto" }}
      id={item.key}
      onClick={() => onClick(item)}
      className={classNames(
        style.multiDropdownItem,
        isActive && style.multiDropdown_title__active,
        className
      )}
    >
      <span>{item.value}</span>
      {isActive && afterSlot}
    </div>
  );
};

export default MultiDropdownItem;
