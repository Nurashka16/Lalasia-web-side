import classNames from "classnames";
import React from "react";
import style from "./Navbar.module.css";
import Button from "../../../../common/components/Button";

interface INavbar {
  /** Дополнительный classname */
  className?: string;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: () => void;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
}

const Navbar = ({
  className,
  subtitle,
  contentSlot,
  actionSlot,
  onClick,
}: INavbar) => {
  return (
    <div className={classNames(style.navbar, className)}>
      <div className={style.content}>
        <Button className={style.btn} onClick={() => onClick && onClick()}>
          {actionSlot}
        </Button>
        <div className={style.subtitle}>{subtitle}</div>
        {/* <div className={style.line}></div> */}
      </div>
      <div className={style.footer}>
        {contentSlot && <div className={style.contentSlot}>{contentSlot}</div>}
      </div>
    </div>
  );
};

export default Navbar;
