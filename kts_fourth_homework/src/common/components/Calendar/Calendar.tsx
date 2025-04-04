import { useMemo, useState } from "react";
import style from "./Calendar.module.css";
import LeftArrow from "src/common/components/Carousel/Icons/LeftArrowIcon";
import RightArrow from "src/common/components/Carousel/Icons/RightArrowIcon";
import Days from "./Days/Days";
import classNames from "classnames";

interface ICalendarProps {
  className?: string;
  onClick: (value: string) => void;
}

const Calendar = ({ onClick, className }: ICalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const currentMonth = useMemo(() => {
    return currentDate.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [currentDate]);

  const changeMonth = (direction: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  return (
    <div className={classNames(style.calendar, className)}>
      <header className={style.calendar_header}>
        <button
          aria-label="Previous month"
          className={style.calendar_buttonIcon}
          onClick={() => changeMonth(-1)}
        >
          <LeftArrow />
        </button>
        <span className={style.currentMonth}>{currentMonth}</span>
        <button
          className={style.calendar_buttonIcon}
          onClick={() => changeMonth(1)}
          aria-label="Next month"
        >
          <RightArrow />
        </button>
      </header>
      <nav className={style.calendar_weekNames}>
        <ul>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day, index) => (
              <li key={index} className={style.calendar_weekName}>
                {day}
              </li>
            )
          )}
        </ul>
      </nav>
      <div className={style.calendar_days}>
        <Days
          onClick={onClick}
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
        />
      </div>
    </div>
  );
};

export default Calendar;
