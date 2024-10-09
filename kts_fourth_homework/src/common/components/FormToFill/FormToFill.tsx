import Text from "../Text";
import ValidationInput from "../ValidationInput/ValidationInput";
import style from './FormToFill.module.css'

interface IFormFill<T> {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  rules: IRule<T>[];
  setIsValid: (value: boolean) => void;
  text?: string;
  placeholder?: string;
  afterSlot?: React.ReactNode;
}

const FormToFill = ({
  className,
  value,
  onChange,
  rules,
  setIsValid,
  text,
  placeholder,
  afterSlot
}: IFormFill<T>) => {
  return (
    <div className={className}>
      <Text tag="h3" color="secondary" weight="medium">
        {text}
      </Text>
      <ValidationInput
      className={style.input}
      placeholder={placeholder}
        value={value}
        onChange={onChange}
        rules={rules}
        setIsValid={setIsValid}
        afterSlot={afterSlot}
      />
    </div>
  );
};

export default FormToFill;
