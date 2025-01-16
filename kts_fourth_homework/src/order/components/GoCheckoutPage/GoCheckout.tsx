import React from "react";
import style from "./GoCheckout.module.css";
import { Link } from "react-router-dom";
import { BASKET } from "../../../utils/const";
import Input from "../../../common/components/Input";
import Button from "../../../common/components/Button";
import Text from "../../../common/components/Text";
import ButtonBack from "../../../common/components/ButtonBack/ButtonBack";
import Search from "../../../common/components/Search";
import { search } from "../../../home/api/search";

const GoCheckout = () => {
  return (
    <div className={style.goCheckout}>
      <ButtonBack />
      {/* <Link className={style.link} to={BASKET}>
        Return to basket
      </Link> */}
      {/* <Text weight="bold" tag="h1" className={style.title}>
        Placing an order
      </Text> */}
      <div className={style.content}>
        <div className={style.main}>
          <div className={style.payment}>
            <Text
              view="p-18"
              weight="bold"
              color="primary"
              className={style.payment_title}
            >
              Payment method:
            </Text>
            <div className={style.payment_buttons}>
              <div className={style.payment_button}>
                <div className={style.payment_icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                  </svg>
                </div>
                <div className={style.payment_text}>By card</div>
              </div>
              <div className={style.payment_button}>
                <div className={style.payment_icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
                  </svg>
                </div>
                <div className={style.payment_text}>Upon receipt</div>
              </div>
            </div>
          </div>
          <div className={style.delivery}>
            <Text
              weight="bold"
              color="primary"
              view="p-18"
              className={style.delivery_title}
            >
              Where should the order be delivered?
            </Text>
            <div className={style.address}>
              <div className={style.address_icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10m-3 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M12 1a9 9 0 0 0-9 9c0 2.514 1.136 4.848 2.699 6.942 1.565 2.099 3.631 4.05 5.643 5.81a1 1 0 0 0 1.316 0c2.012-1.76 4.078-3.711 5.644-5.81C19.864 14.848 21 12.514 21 10a9 9 0 0 0-9-9m-7 9a7 7 0 0 1 14 0c0 1.904-.864 3.82-2.302 5.746-1.275 1.71-2.945 3.353-4.698 4.92-1.753-1.567-3.423-3.21-4.699-4.92C5.864 13.82 5 11.904 5 10"
                  ></path>
                </svg>
              </div>
              <div className={style.address_input}>
                <Search isActiveInput={true} placeholder="Address" textBtn="Come here" />
              </div>
            </div>
            {/* <Input className={style.input} value="address" onChange={() => console.log(1)} />
            <Button className={style.delivery_button} >Come here</Button> */}
          </div>
        </div>
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
            <Text
              weight="bold"
              className={style.promotionalCode_title}
              view="p-18"
            >
              Promotional code or certificate:
            </Text>
            <div className={style.promotionalCode_input}>
              <Input isActive={true}
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
      </div>
    </div>
  );
};

export default GoCheckout;
