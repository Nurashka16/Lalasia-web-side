import React, { useState, useEffect, ReactElement } from "react";
import Input from "../Input";
import { useClickOutside } from "../../hooks/useClickOutside";
import classNames from "classnames";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import "./MultiDropdown.css";
import Loader from "../Loader";
import Text from "../Text";
import Button from "../Button";
import MultiDropdownItemCopy from "./MultiDropdownItemCopy";
import Pagination from "../Pagination";
export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (id:number) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте.
   *  В случае если опции не выбраны, строка
   *  должна отображаться как placeholder. */
  getTitle: string;
  //  (value: Option[]) => string;
  afterSlot?: JSX.Element;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  afterSlot,
}: MultiDropdownProps) => {
  //забыла стили добавить
  const { ref: menuRef, isShow, onShow } = useClickOutside();
  const [allOptions, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(()=>{
    setIsLoading(true)
    setOptions(options)
    setIsLoading(false)
  }, [options])

  const selectedOptionsIds = value.map((item) => {
    return item.key;
  });
  const set = new Set(selectedOptionsIds);

  const findMatches = (value: string) => {
    if (!value) {
      return setOptions(options);
    }
    const result = allOptions.filter((option) => {
      return (
        option.value.slice(0, value.length).toUpperCase() == value.toUpperCase()
      );
    });
    setOptions(result);
  };

  const lists = allOptions.map((item) => {
    return (
      <MultiDropdownItemCopy
        onClick={(id:number) => onChange(id)}
        isActiveDefault={!set.has(item.key)}
        item={item}
      />
    );
  });

  return (
    <form className="multiDropdown" ref={menuRef}>
      <Input
        onClick={() => onShow()}
        className="multiDropdown_input"
        value=""
        // value={value.length ? getTitle(value) : ""}
        //хз
        placeholder={getTitle}
        disabled={disabled}
        onChange={(e) => findMatches(e)} //find
        afterSlot={<ArrowDownIcon className="multiDropdown_icon" />}
      />
      {isShow && (
        <div className="multiDropdown_content">
          <div className="dropdown">
            {isLoading ? (
              <div className="loading">
                <Text color="primary" weight="medium" tag="h3">
                  Loading
                </Text>
                <Loader size="s" />
              </div>
            ) : (
            <div className={classNames("multiDropdown_lists", className)}>
              {lists}
            </div>
              )} 
          </div>

          {afterSlot}
        </div>
      )}
    </form>
  );
};

export default MultiDropdown;

// const MultiDropdown: React.FC<MultiDropdownProps> = ({
//   className,
//   options,
//   value,
//   onChange,
//   disabled,
//   getTitle,
// }) => {

// const [isOptions, setOptions] = useState(options);
// const { ref: menuRef, isShow, onShow } = useClickOutside();
// const [selectedValues, setSelectedValues] = useState(value);

// useEffect(() => {
//   setIsLoading(true);
//   setOptions(options);
//   setIsLoading(false);
// }, [options]);

// const addValue = (value: Option) => {
//   setSelectedValues((selectedValues) => [...selectedValues, value]);
// };
// const deleteValue = (value: Option) => {
//   setSelectedValues(
//     selectedValues.filter((item) => item.value !== value.value)
//   );
//   onChange(value);
// };

// const lists = isOptions.map((list) => (
//   <MultiDropdownItem
//     isValue={selectedValues}
//     onClick={addValue}
//     onChange={onChange}
//     item={list}
//     deleteValue={deleteValue}
//   />
// ));

// return (
//   <form>

//   </form>
// <div className={classNames(className, "wrap")} ref={menuRef}>
//   <Input
//     disabled={disabled}
//     value={selectedValues?.length ? getTitle(selectedValues) : ""}
//     onClick={() => onShow()}
//     onChange={(e: any) => findMatches(e)}
//     className={classNames(
//       selectedValues?.length > 0 ? "isNotEmpty" : "isEmpty",
//       options?.length > 0 ? "isNotEmpty" : "isEmpty"
//     )}
//     afterSlot={<ArrowDownIcon color="secondary" />}
//     placeholder={
//       selectedValues?.length > 0
//         ? selectedValues?.map(({ value }) => value).join(", ")
//         : getTitle(selectedValues)
//     }
//   />
// {isShow && (
//   <div className="dropdown">
//     {isLoading ? (
//       <div className="loading">
//         <Text color="primary" weight="medium" tag="h3">
//           Loading
//         </Text>
//         <Loader size="s" />
//       </div>
//     ) : (
//       lists
//     )}
//   </div>
// )}
// </div>
//   );
// };
