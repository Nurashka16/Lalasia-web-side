import classNames from "classnames";
import React from "react";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import Text from "src/common/components/Text";
import Input from "src/common/components/Input/Input";
import Button from "src/common/components/Button";

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <div className={style.pay}>
        <Link to="/payment" className={style.pay_btn}>
          <Button style={{ width: "100%", borderRadius: "7px" }}>
            Pay online
          </Button>
        </Link>

        <Text tag="h5" color="secondary" className={style.pay_description}>
          By clicking on the button, you agree to the Terms of Processing of
          Personal Data, as well as the Terms of Sale
        </Text>
        <div className={style.pay_line}></div>
        <div className={style.total}>
          <Text
            className={style.total_text}
            color="secondary"
            tag="h4"
            weight="bold"
          >
            Total:
          </Text>
          <Text
            className={style.total_price}
            tag="h3"
            weight="bold"
            color="accent"
          >
            800
          </Text>
        </div>
      </div>
      <div className={style.promotionalCode}>
        <Text weight="bold" className={style.promotionalCode_title} view="p-18">
          Promotional code or certificate:
        </Text>
        <div className={style.promotionalCode_input}>
          <Input
            isActive={true}
            value=""
            placeholder="Enter the code"
            onChange={() => console.log(1)}
          />
          <Button style={{ width: "100%", borderRadius: "7px" }}>
            Apply promotional code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
