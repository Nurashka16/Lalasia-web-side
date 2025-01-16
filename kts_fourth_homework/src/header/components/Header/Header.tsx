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

interface IHeaderProps {
  isAuth: boolean;
  countSelectedProducts: number;
}

const Header = ({ isAuth, countSelectedProducts }: IHeaderProps) => {
  return (
    <header className={style.header}>
      <Logo />
      {isAuth && (
        <Tabs className={style.main} value="products">
          <nav
            className={classNames(style.main_pages, style.main_pages__basic)}
          >
            <LinkTab className={style.main_page} to={HOME} value="products">
              <span className="sr-only">link to home page</span>
              Products
            </LinkTab>
            <LinkTab
              className={style.main_page}
              value="categories"
              to={CATEGORIES}
            >
              <span className="sr-only">link to categories page</span>
              Categories
            </LinkTab>
            <LinkTab className={style.main_page} value="aboutUs" to={ABOUT_US}>
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
              value="basket"
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
              value="profile"
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
