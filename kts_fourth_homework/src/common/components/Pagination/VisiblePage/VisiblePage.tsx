import React from "react";
import style from "./VisiblePage.module.css";
import classNames from "classnames";

interface IPaginationPageProps {
  className?: string;
  isActive: boolean;
  onClick: (count: number) => void;
  numberPage: number | string;
  disabled?: boolean;
}

const Pagination = ({
  isActive = false,
  onClick,
  className,
  numberPage,
  disabled,
}: IPaginationPageProps) => {
  return (
    <button
      disabled={disabled}
      className={classNames(
        style.pagination_page,
        isActive && style.pagination_page__active,
        className
      )}
      onClick={() => onClick(Number(numberPage))}
    >
      {numberPage}
    </button>
  );
};

export default Pagination;
