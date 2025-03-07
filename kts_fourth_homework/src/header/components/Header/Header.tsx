import style from "./Header.module.css";
import classNames from "classnames";
import BasketIcon from "./svg/BasketIcon";
import ProfileIcon from "./svg/ProfileIcon";
import { Tabs } from "src/common/components/Tabs/Tabs";
import LinkTab from "src/common/components/Tabs/LinkTab";
import Logo from "./Logo";
import {
  ABOUT_US,
  BASKET,
  CATEGORIES,
  EMPTY_PAGE,
  HOME,
} from "src/utils/const";
import Text from "src/common/components/Text";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface IHeaderProps {
  isAuth: boolean;
  countSelectedProducts: number;
}

const Header = ({ isAuth, countSelectedProducts }: IHeaderProps) => {
  const location = useLocation(); // Получаем информацию о текущем местоположении

  const [activeValue, setActiveValue] = useState(HOME);

  useEffect(() => {
    if (location.pathname != activeValue) {
      setActiveValue(location.pathname);
    }
  }, [location]);
  return (
    <header className={style.header}>
      <Logo />
      {isAuth && (
        <Tabs
          onChange={setActiveValue}
          className={style.main}
          value={activeValue}
        >
          <nav
            className={classNames(style.main_pages, style.main_pages__basic)}
          >
            <LinkTab className={style.main_page} to={HOME} name="/">
              <span className="sr-only">link to home page</span>
              Products
            </LinkTab>
            <LinkTab
              className={style.main_page}
              name="/categories"
              to={CATEGORIES}
            >
              <span className="sr-only">link to categories page</span>
              Categories
            </LinkTab>
            <LinkTab className={style.main_page} name="/about" to={ABOUT_US}>
              <span className="sr-only">link to about us page</span>
              About us
            </LinkTab>
          </nav>
          <nav
            className={classNames(
              style.main_pages,
              style.main_pages__additional
            )}
          >
            <LinkTab
              className={classNames(style.main_page, style.main_page__basket)}
              name="/basket"
              to={BASKET}
            >
              <span className="sr-only">link to basket page</span>
              <BasketIcon />
              <Text
                className={style.basket_count}
                color="accent"
                weight="bold"
                tag="span"
              >
                {countSelectedProducts}
              </Text>
            </LinkTab>
            <LinkTab
              className={style.main_page}
              to={EMPTY_PAGE}
              name="/profile"
            >
              <span className="sr-only">link to profile page</span>
              <ProfileIcon />
            </LinkTab>
          </nav>
        </Tabs>
      )}
    </header>
  );
};

export default Header;
