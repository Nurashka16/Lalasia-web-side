import Text from "../Text";
import ValidationInput from "../ValidationInput/ValidationInput";

//в папку общее

interface IFormFill {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  rules: IRule[];
  setIsValid: (value: boolean) => void;
  text: string;
}

const FormFill = ({
  className,
  value,
  onChange,
  rules,
  setIsValid,
  text,
}: IFormFill) => {
  return (
    <div className={className}>
      <Text tag="h3" color="secondary" weight="medium">
        {text}
      </Text>
      <ValidationInput
        value={value}
        onChange={onChange}
        rules={rules}
        setIsValid={setIsValid}
      />
    </div>
  );
};

export default FormFill;
