import React from "react";
import style from "./Navbar.module.css";
import classNames from "classnames";

interface INavbarLayoutProps {
  className?: string;
  actionSlot: React.ReactNode /** Слот для действия */;
  titleSlot?: React.ReactNode /** Слот над заголовком */;
  subtitle?: React.ReactNode /** текст*/;
  contentSlot: React.ReactNode /** Содержимое карточки (футер/боковая часть), может быть пустым */;
  onClick?: (id: number) => void /** Клик на карточку */;
}

const NavbarLayout = ({
  actionSlot,
  onClick,
  subtitle,
  className,
  contentSlot,
  titleSlot,
}: INavbarLayoutProps) => {
  return (
    <nav className={style.navbar}>
      <div className={classNames(style.content, className)}>
        {actionSlot}
        {subtitle}
        <div className={style.line}></div>
      </div>
      <footer className={style.footer}>{contentSlot}</footer>
    </nav>
  );
};

export default NavbarLayout;
