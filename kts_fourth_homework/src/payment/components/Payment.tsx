import React from "react";
import style from "./Payment.module.css";
import classNames from "classnames";
import Text from "../../common/components/Text";

import CheckIcon from "../../common/components/icons/CheckIcon";
import CheckBox from "../../common/components/CheckBox";
import MultiDropdown from "../../common/components/MultiDropdown";
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
  return (
    <div className={style.payment}>
      <MultiDropdown
        options={[{key:"1", value:"1"},{key:"1", value:"2"},{key:"1", value:"3"}]}
        getTitle={() => ""}
        onChange={() => console.log(1)}
        value={[]}
      />
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
