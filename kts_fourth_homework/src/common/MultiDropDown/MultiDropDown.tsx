import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Option } from "./interface/Option";
import { useClickOutside } from "src/common/hooks/useClickOutside";
import style from "./MultiDropdown.module.css";
import Input from "../components/Input/Input";
import ArrowDownIcon from "../components/icons/ArrowDownIcon";
import Text from "../components/Text";
import Loader from "../components/Loader";

export type MultiDropdownProps = {
  className?: string;
  variants: Option[];
  defaultPlaceholder: string;
  disabled?: boolean;
  selectedVariants: Option[];
  isLoading?: boolean;
  children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  variants,
  disabled,
  defaultPlaceholder,
  isLoading = false,
  selectedVariants,
  children,
  ...props
}: MultiDropdownProps) => {
  const { ref: menuRef, isShow, onShow } = useClickOutside();
  const [value, setValue] = useState("");

  const [allVariants, setAllVariants] = useState(variants);

  useEffect(() => {
    setAllVariants(allVariants);
  }, [allVariants]);

  const findMatches = (value: string) => {
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
  const getValue = (arr: Option[]) => {
    return arr.map((item) => item.value).join(", ");
  };
  return (
    <form className={style.multiDropdown} ref={menuRef}>
      <label className={style.inputContainer}>
        <Input
          onClick={() => {
            onShow();
          }}
          className={style.inputContainer_input}
          value={value}
          placeholder={
            selectedVariants.length
              ? getValue(selectedVariants)
              : defaultPlaceholder
          }
          disabled={disabled}
          onChange={(value) => {
            setValue(value);
            findMatches(value);
          }}
          afterSlot={<ArrowDownIcon className={style.multiDropdown_icon} />}
        />
      </label>
      {isShow &&
        (isLoading ? (
          <div className={style.loading}>
            <Text color="primary" weight="medium" tag="h3">
              Loading
            </Text>
            <Loader size="s" />
          </div>
        ) : (
          <div
            {...props}
            className={classNames(
              style.options,
              allVariants.length > 5 && style.options_scroll,
              className
            )}
          >
            {children}
          </div>
        ))}
    </form>
  );
};

export default MultiDropdown;
