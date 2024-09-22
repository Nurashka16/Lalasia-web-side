import React, { useState, useEffect } from "react";
import Input from "../Input";
import MultiDropdownItem from "./MultiDropdownItem";
import { useClickOutside } from "../../hooks/useClickOutside";
import classNames from "classnames";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import "./MultiDropdown.css";
import Loader from "../Loader";
import Text from "../Text";

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
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте.
   *  В случае если опции не выбраны, строка
   *  должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOptions, setOptions] = useState(options);
  const { ref: menuRef, isShow, onShow } = useClickOutside();
  const [isValue, setIsValue] = useState(value);

  useEffect(() => {
    setIsLoading(true);
    setOptions(options);
    setIsLoading(false);
  }, [options]);

  const newValue = (arr: Option[]) => {
    setIsValue((isValue) => [...isValue, arr[0]]);
  };

  const findMatches = (value: any) => {
    const result = options.filter((option) => {
      return (
        option.value.slice(0, value.length).toUpperCase() == value.toUpperCase()
      );
    });
    setOptions(result);
  };
  const lists = isOptions.map((list) => (
    <MultiDropdownItem
      isValue={isValue}
      onClick={newValue}
      onChange={onChange}
      item={list}
    />
  ));

  return (
    <div className={classNames(className, "wrap")} ref={menuRef}>
      <Input
        disabled={disabled}
        value={isValue?.length ? getTitle(isValue) : ""}
        onClick={() => onShow()}
        onChange={(e: any) => findMatches(e)}
        className={classNames(
          isValue?.length > 0 ? "isNotEmpty" : "isEmpty",
          options?.length > 0 ? "isNotEmpty" : "isEmpty"
        )}
        afterSlot={<ArrowDownIcon color="secondary" />}
        placeholder={
          isValue?.length > 0
            ? isValue?.map(({ value }) => value).join(", ")
            : getTitle(isValue)
        }
      />
      {isShow && (
        <div className="dropdown">
          {isLoading ? (
            <div className="loading">
              <Text color="primary" weight="medium" tag="h3">
                Loading
              </Text>
              <Loader size="s" />
            </div>
          ) : (
            lists
          )}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;