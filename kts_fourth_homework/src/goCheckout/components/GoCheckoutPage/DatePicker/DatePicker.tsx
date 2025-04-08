import React, { useEffect, useState } from "react";
import style from "./DatePicker.module.css";
import Text from "src/common/components/Text";
import ValidationInput from "src/common/components/ValidationInput/ValidationInput";
import classNames from "classnames";
import { useClickOutside } from "src/common/hooks/useClickOutside";
import CalendarDefaultIcon from "./icons/CalendarDefaultIcon";
import CalendarSavedIcon from "./icons/CalendarSavedIcon";
import { observer } from "mobx-react-lite";
import paymentStore from "src/goCheckout/stores/payment-store";
import Calendar from "src/common/components/Calendar/Calendar";
import { RuleBuilder } from "src/common/function/RuleBuilder";

const DeliveryDatePicker = observer(() => {
  const { deliveryDate, setDeliveryDate } = paymentStore;

  const { ref: menuRef, isShow, onShow } = useClickOutside<HTMLDivElement>();
  const [isDateValid, setIsDateValid] = useState<boolean>(false);
  const [changeableDate, setChangeableDate] = useState<string>(deliveryDate); //хранить временный date

  const builder = new RuleBuilder<string>();
  const myRules = builder
    .required("Select a date.")
    .dateInFuture()
    .dateWithinOneMonth()
    .build();

  //срабатывает при нажатии на выбранную дату из календаря
  const handleDateChange = (value: string) => {
    setChangeableDate(value);
    onShow();
  };

  useEffect(() => {
    setDeliveryDate("");
    isDateValid == true && setDeliveryDate(changeableDate);
  }, [changeableDate, isDateValid]);

  return (
    <section ref={menuRef} className={style.datePicker}>
      <Text
        view="p-18"
        weight="bold"
        color="primary"
        className={style.datePicker_title}
      >
        When should delivered?
      </Text>
      <div className={style.datePicker_field}>
        <ValidationInput
          isValid={isDateValid}
          className={classNames(style.datePicker_input, {
            [style.input_error]: !isDateValid,
          })}
          value={changeableDate}
          onChange={(e) => {
            setChangeableDate(e);
          }}
          isHandleFocus={isShow}
          afterSlot={
            <div onClick={onShow}>
              {!(changeableDate && isDateValid) ? (
                <CalendarDefaultIcon />
              ) : (
                <CalendarSavedIcon />
              )}
            </div>
          }
          min={new Date().toISOString().split("T")[0]}
          max={
            new Date(new Date().setFullYear(new Date().getFullYear() + 100))
              .toISOString()
              .split("T")[0]
          }
          type="date"
          rules={myRules}
          setIsValid={setIsDateValid}
          classNameError={style.input_errorText}
        />
      </div>
      {isShow && <Calendar onClick={handleDateChange} />}
    </section>
  );
});

export default DeliveryDatePicker;
