import style from "./Search.module.css";
import Input from "../Input";
import Button from "../Button";

interface ISearch {
  onClick?: () => Promise<void>;
  onChange?: (value: string) => void;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  textBtn?: string;
  isActiveInput?: boolean;
  className?: string;
}

const Search = ({
  onClick,
  onChange,
  disabled,
  value = "",
  placeholder,
  textBtn = "Find now",
  isActiveInput,
  className,
}: ISearch) => {
  return (
    <div className={style.search}>
      <Input
        className={className}
        isActive={isActiveInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e)}
      />
      <Button
        onClick={() => onClick && onClick()}
        className={style.search_btn}
        disabled={disabled}
      >
        {textBtn}
      </Button>
    </div>
  );
};

export default Search;
