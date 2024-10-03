import React, { useState } from "react";
import Input, { InputProps } from "../Input/Input";
import style from "./ValidationInput.module.css";

type ValidationInputProps = InputProps & IValidation<string>;

const ValidationInput = (props: ValidationInputProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const onChangeHandler = (value: string) => {
    const errorRule = props.rules?.find((rule) => !rule.validate(value));
    if (errorRule) {
      setErrorMessage(errorRule.errorMessage);
      return props.setIsValid && props.setIsValid(false);
    }
    props.setIsValid && props.setIsValid(true);
    setErrorMessage("");
    props.onChange(value);
  };
  return (
    <div className={style.input}>
      <Input {...(props as InputProps)} onChange={(e) => onChangeHandler(e)} />
      <div className={style.errorMessage}

      >
        {errorMessage}
      </div>
    </div>
  );
};

export default ValidationInput;
