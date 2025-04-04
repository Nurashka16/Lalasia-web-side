import React, { useEffect, useState } from "react";
import Input, { InputProps } from "../Input/Input";
import style from "./ValidationInput.module.css";
import classNames from "classnames";
import { IValidation } from "src/common/interfaces/IValidation";

type ValidationInputProps = InputProps &
  IValidation<string> & {
    isHandleFocus?: boolean;
  };

const ValidationInput: React.FC<ValidationInputProps> = (props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (props.isHandleFocus === false && props.value) {
      onChangeHandler(props.value);
    }
  }, [props.value, props.isHandleFocus]);

  const onChangeHandler = (value: string) => {
    const errorRule = props.rules?.find((rule) => !rule.validate(value));
    const isValid = !errorRule;

    setErrorMessage(isValid ? "" : errorRule?.errorMessage || "");
    props.setIsValid && props.setIsValid(isValid);
    props.onChange(value);
  };

  return (
    <div className={style.input}>
      <Input
        {...(props as InputProps)}
        onChange={(value) => onChangeHandler(value)}
      />
      {!props.isValid && errorMessage && (
        <div className={classNames(style.errorMessage, props.classNameError)}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ValidationInput;
