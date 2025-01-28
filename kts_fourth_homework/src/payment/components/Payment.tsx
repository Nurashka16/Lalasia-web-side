import React, { useState } from "react";
import style from "./Payment.module.css";
import classNames from "classnames";
import Text from "../../common/components/Text";

import CheckIcon from "../../common/components/icons/CheckIcon";
import CheckBox from "../../common/components/CheckBox";
import { Option } from "src/common/components/MultiDropdown/interface/Option";
import MultiDropdown from "src/common/components/MultiDropdown/MultiDropdown";
export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
  checked: boolean;
  disabled?: boolean;
};

const Payment = () => {
  const [values, setValues] = useState<Option[]>([]);

  const onChangeHandler = (value: Option) => {
    if (value) {
      let copy = Object.assign([], values);
      copy.push(value);
      setValues(copy);
    }
  };
  // console.log(values);

  return (
    <div className={style.payment}>
      {/* <MultiDropdown
        options={[
          { key: "1", value: "aa" },
          { key: "1", value: "2" },
          { key: "1", value: "3" },
        ]}
        getTitle={(value: Option[]) => "1"}
        onChange={(value) => console.log(value)}
        value={values}
      /> */}
      {/* <Text className={style.payment_title}>Payment by card</Text>
      <div className={style.payment_total}>
        <div className={style.payment_description}>
          Total including delivery and VAT
        </div>
        <div className={style.payment_price}>1200</div>
      </div> */}
    </div>
  );
};

export default Payment;
