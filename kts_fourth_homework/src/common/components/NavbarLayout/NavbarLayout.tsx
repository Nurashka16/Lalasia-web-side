import React from "react";
import style from "./NavbarLayout.module.css";
import classNames from "classnames";

interface INavbarLayoutProps {
  className?: string;
  actionSlot: React.ReactNode /** Слот для действия */;
  titleSlot?: React.ReactNode /** Слот над заголовком */;
  subtitle?: React.ReactNode /** текст*/;
  contentSlot: React.ReactNode /**/;
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
      {titleSlot}
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
