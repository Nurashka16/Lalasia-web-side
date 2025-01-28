import classNames from "classnames";
import { Option } from "./interface/Option";

interface IMultiDropdownItemProps {
  item: Option;
  onClick: (id: number) => void;
  isActive: boolean;
}

const MultiDropdownItem = ({
  item,
  onClick,
  isActive = false,
}: IMultiDropdownItemProps) => {
  return (
    <div
      id={item.key}
      onClick={(e) => onClick(Number(e.currentTarget.id))}
      className={classNames(
        "multiDropdownItem",
        isActive && "multiDropdown_title__active"
      )}
    >
      <span>{item.value}</span>
      {isActive && <span className="multiDropdownItem_button">×</span>}
    </div>
  );
};

export default MultiDropdownItem;
