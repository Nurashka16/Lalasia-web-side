import React, { useState, useEffect } from "react";
import classNames from "classnames";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import "./MultiDropdown.css";
import { Option } from "./interface/Option";
import MultiDropdownItem from "./MultiDropdownItem";
import { useClickOutside } from "src/common/hooks/useClickOutside";
import Text from "../Text";
import Loader from "../Loader";
import Input from "../Input/Input";

export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  variants: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  defaultPlaceholder: string;
  /** Callback, вызываемый при выборе варианта */
  onClick: (id: number) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте.
   *  В случае если опции не выбраны, строка
   *  должна отображаться как placeholder. */
  //  (value: Option[]) => string;
  selectedVariants: Set<number>;
  isLoading?: boolean;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  selectedVariants,
  onClick,
  variants,
  disabled,
  defaultPlaceholder,
  isLoading = false,
}: MultiDropdownProps) => {
  const { ref: menuRef, isShow, onShow } = useClickOutside();
  const [allVariants, setAllVariants] = useState(variants);
  const [placeholder, setPlaceholder] = useState(defaultPlaceholder);
  const [value, setValue] = useState("");

  useEffect(() => {
    setAllVariants(variants);
  }, [variants]);

  const onClickVariant = (id: number) => {
    onClick(id);
    setPlaceholder(getValue());
  };
  const getValue = () => {
    const result: string[] = [];
    allVariants.forEach((variant) => {
      if (selectedVariants.has(Number(variant.key))) {
        result.push(variant.value);
      }
    });
    return result.join(", ");
  };
  const findMatches = (value:string) => {
    if (!value) {
      return setAllVariants(variants);
    }
    const result = allVariants.filter((variant) => {
      return (
        variant.value.slice(0, value.length).toUpperCase() ==
        value.toUpperCase()
      );
    });
    setAllVariants(result);
  };

  const componentsVariants = allVariants.map((variant: Option, i) => {
    return (
      <MultiDropdownItem
        key={i}
        onClick={onClickVariant}
        isActive={selectedVariants.has(Number(variant.key))}
        item={variant}
      />
    );
  });

  return (
    <form className="multiDropdown" ref={menuRef}>
      <Input
        onClick={() => {
          onShow();
        }}
        className="multiDropdown_input"
        value={value}
        placeholder={selectedVariants.size ? placeholder : defaultPlaceholder}
        disabled={disabled}
        onChange={(value) => {
          setValue(value);
          findMatches(value);
        }}
        afterSlot={<ArrowDownIcon className="multiDropdown_icon" />}
      />

      {isShow && (
        <div className="multiDropdown_content">
          {isLoading ? (
            <div className="loading">
              <Text color="primary" weight="medium" tag="h3">
                Loading
              </Text>
              <Loader size="s" />
            </div>
          ) : (
            <div className={classNames("multiDropdown_lists", className)}>
              {componentsVariants}
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default MultiDropdown;
