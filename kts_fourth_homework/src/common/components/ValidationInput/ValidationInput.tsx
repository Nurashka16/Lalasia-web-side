import React, { useState } from "react";
import Input, { InputProps } from "../Input/Input";

type ValidationInputProps = InputProps & IValidation;

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
    <>
      <Input {...(props as InputProps)} onChange={(e) => onChangeHandler(e)} />
      <div style={{ color: "red" }}>{errorMessage}</div>
    </>
  );
};

export default ValidationInput;
