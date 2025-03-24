import React, { useState } from "react";
import Input, { InputProps } from "../Input/Input";
import style from "./ValidationInput.module.css";
import classNames from "classnames";

type ValidationInputProps = InputProps & IValidation<string>;

const ValidationInput = (props: ValidationInputProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const onChangeHandler = (value: string) => {
    const errorRule = props.rules?.find((rule) => !rule.validate(value));
    if (errorRule) {
      setErrorMessage(errorRule.errorMessage);
      props.onChange(value);
      return props.setIsValid && props.setIsValid(false);
    }
    props.setIsValid && props.setIsValid(true);
    setErrorMessage("");
    props.onChange(value);
    
  };
  return (
    <div className={style.input}>
      <Input {...(props as InputProps)} onChange={(e) => onChangeHandler(e)} />
      <div className={classNames(style.errorMessage, props.classNameError)} 

      >
        {errorMessage}
      </div>
    </div>
  );
};

export default ValidationInput;
