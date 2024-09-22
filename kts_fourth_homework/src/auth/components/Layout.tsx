import React from "react";
import style from "./Auth.module.css";
import Text from "../../common/components/Text";
interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <div className={style.auth}>
      <Text
        color="secondary"
        tag="span"
        view="p-18"
        weight="bold"
        maxLines={2}
        className="description"
      >
        I welcome you to the Lalasia website, there is a huge assortment of
        <br />
        different products. To visit this site, you need to log into your
        account
        <br />
      </Text>
      {children}
    </div>
  );
};

export default Layout;
