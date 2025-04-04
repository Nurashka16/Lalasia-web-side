import React from "react";
import style from "./Days.module.css";
import classNames from "classnames";

interface IDaysProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  onClick: (value: string) => void;
}

const Days = ({ currentDate, onClick, setCurrentDate }: IDaysProps) => {
  const month: number = currentDate.getMonth();
  const year: number = currentDate.getFullYear();

  // Получение текущей даты
  const today = new Date();
  const currentDay: number = today.getDate();
  const currentMonth: number = today.getMonth() + 1;
  const currentYear: number = today.getFullYear();

  //обрабатывает выбор даты, форматирует её в строку
  const selectDate = (day: number) => {
    const formattedDate = `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    onClick(formattedDate);
    setCurrentDate(new Date(year, month, day));
  };

  const renderCalendar = () => {
    const firstDayIndex: number = new Date(year, month, 1).getDay(); // Индекс первого дня месяца
    const lastDay: number = new Date(year, month + 1, 0).getDate(); // Количество дней в месяце

    const days: JSX.Element[] = [];

    // Заполнение пустыми днями
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(
        <div key={`empty-${i}`} className={style.calendar_dayDisabled}></div>
      );
    }

    // Генерация дней месяца
    for (let day = 1; day <= lastDay; day++) {
      const isCurrentDay = currentDay === day && currentMonth === month + 1;
      const isPastDay =
        currentMonth > month + 1 ||
        (currentMonth === month + 1 && day < currentDay) ||
        currentYear > year;

      days.push(
        <div
          key={day}
          className={classNames({
            [style.calendar_dayCurrent]: isCurrentDay,
            [style.calendar_dayDisabled]: isPastDay,
            [style.calendar_day]: !isCurrentDay && !isPastDay,
          })}
          onClick={() => !isCurrentDay && !isPastDay && selectDate(day)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return <>{renderCalendar()}</>;
};

export default Days;
