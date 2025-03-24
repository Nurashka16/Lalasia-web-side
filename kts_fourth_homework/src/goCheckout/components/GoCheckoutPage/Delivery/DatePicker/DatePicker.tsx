import React, { useState } from "react";
import style from "./DatePicker.module.css"; // Импорт вашего CSS модуля
import Text from "src/common/components/Text";
import ValidationInput from "src/common/components/ValidationInput/ValidationInput";

const DeliveryDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };
    const [isDateValid, setIsDateValid] = useState<boolean>(false);

  // const isDateValid = (dateString: string): boolean => {
  //   const date = new Date(dateString);
  //   return date >= new Date(); // Проверка, что дата не в прошлом
  // };

  const rules: IRule<string>[] = [
    // {
    //   errorMessage: "Address cannot be empty.",
    //   validate: (value) => !!value,
    // },
    {
      errorMessage: "Please select a valid date.",
      validate: (value) => {
        const details = value.split(" ");
        return (
          details.length === 3 &&
          details.every((part) => part.trim() !== "") && // Проверка, что все части не пустые
          !isNaN(Number(details[2])) // Проверка, что третья часть - число
        );
      },
    },
  ];
  return (
    <div className={style.deliveryDatePicker}>
      <Text view="p-18" weight="bold" color="primary" className={style.title}>
        Select Delivery Date:
      </Text>
      <div className={style.content}>
      <ValidationInput
          className={style.addressInput}
          placeholder="example: Moscow Puskina 1"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e);
            // if (isSavedAddress) setIsSavedAddress(false);
          }}
          rules={rules}
          setIsValid={setAddressIsValid}
          afterSlot={<GeoIcon />}
          classNameError={style.deliveryInvalid}
        />
        {/* <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className={style.dateInput}
          min={new Date().toISOString().split("T")[0]}
          // Запрет выбора прошлых дат
        />
        {!isDateValid(selectedDate) && selectedDate && (
          <div className={style.errorMessage}>Please select a valid date.</div>
        )} */}
      </div>
    </div>
  );
};

export default DeliveryDatePicker;
