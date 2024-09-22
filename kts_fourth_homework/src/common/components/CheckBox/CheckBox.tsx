import React from 'react';
import './CheckBox.css';
import classNames from 'classnames';
import CheckIcon from '../icons/CheckIcon';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, disabled, ...props }) => {
  const [value, setValue] = React.useState<boolean | undefined>(checked);
  return (
    <div
      className={classNames(
        'checkboxWrap',
        disabled ? 'checkboxWrapDisabled' : 'checkboxWrapHover'
      )}
    >
      <input
        className="checkbox"
        disabled={disabled}
        onClick={(e) => setValue((value) => !value)}
        type="button"

        // style={{border:props.disabled ? 'secondary' : 'accent'}}
      />
      {value && (
        <div onClick={() => (disabled ? '' : setValue((value) => !value))}>
          <CheckIcon
            className="checkBox_icon"
            color={disabled ? 'secondary' : 'accent'}
            width="40px"
            height="40px"
          />
        </div>
      )}
    </div>
  );
};

export default CheckBox;
