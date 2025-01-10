import { useEffect, useState } from "react";
import style from "./Header.module.css";
import Logo from "./Logo";
import { ABOUT_US, BASKET, CATEGORIES, HOME } from "../../../utils/const";
import { Tabs } from "../../../common/components/Tabs/Tabs";
import LinkTab from "../../../common/components/Tabs/LinkTab";
import Text from "../../../common/components/Text";
import basketStore from "../../../basket/stores/basket-store";

const Header = (props: any) => {


  return (
    <div className={style.header}>
      <Logo />
      {props.isAuth && (
        <Tabs className={style.main} value="products">
          <div className={style.mainPages}>
            <LinkTab
              className={style.text}
              to={HOME}
              value="products"
            >
              Products
            </LinkTab>
            <LinkTab
              className={style.text}
              value="categories"
              to={CATEGORIES}
            >
              Categories
            </LinkTab>
            <LinkTab
              className={style.text}
              value="aboutUs"
              to={ABOUT_US}
            >
              About us
            </LinkTab>
          </div>
          <div className={style.additionalPages}>
            <LinkTab
              className={style.icon}
              value="basket"
              to="/basket"
            >
              {/* <div className={style.icon_basket}> */}
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.375 9.58751V8.37501C9.375 5.56251 11.6375 2.80001 14.45 2.53751C17.8 2.21251 20.625 4.85001 20.625 8.13751V9.86251"
                  stroke="#151411"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.25 27.5H18.75C23.775 27.5 24.675 25.4875 24.9375 23.0375L25.875 15.5375C26.2125 12.4875 25.3375 10 20 10H10C4.66253 10 3.78753 12.4875 4.12503 15.5375L5.06253 23.0375C5.32503 25.4875 6.22503 27.5 11.25 27.5Z"
                  stroke="#151411"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.3694 15H19.3806"
                  stroke="#151411"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.6181 15H10.6294"
                  stroke="#151411"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <Text
                className={style.icon_text}
                color="accent"
                weight="bold"
                tag="h6"
              >
                {props.count}
              </Text>
              {/* </div> */}
            </LinkTab>
            <LinkTab
              className={style.icon}
              to="*"
              value="profile"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 15C18.4518 15 21.25 12.2018 21.25 8.75C21.25 5.29822 18.4518 2.5 15 2.5C11.5482 2.5 8.75 5.29822 8.75 8.75C8.75 12.2018 11.5482 15 15 15Z"
                  stroke="#151411"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M25.7374 27.5C25.7374 22.6625 20.9249 18.75 14.9999 18.75C9.07495 18.75 4.26245 22.6625 4.26245 27.5"
                  stroke="#151411"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </LinkTab>

            {/* <Link to="/profile">Auth</Link> */}
          </div>
        </Tabs>
      )}
    </div>
  );
};

export default Header;
