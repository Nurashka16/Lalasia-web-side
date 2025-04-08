import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import Text from "src/common/components/Text";
import Button from "src/common/components/Button";
import { observer } from "mobx-react-lite";
import paymentStore from "src/goCheckout/stores/payment-store";
import PromotionalCode from "./PromotionalCode/PromotionalCode";
import NavbarLayout from "src/common/components/NavbarLayout/NavbarLayout";
import profileStore from "src/profile/stores/profile-store";

interface INavbarProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = observer(({ setIsLoading }: INavbarProps) => {
  const {
    sumProducts,
    deliveryAddress,
    paymentType,
    deliveryDate,
    discountValue,
    resetCoupon,
  } = paymentStore;
  const { addOrder } = profileStore;

  const isPaymentReady =
    paymentType != undefined && deliveryAddress != "" && deliveryDate != "";

  const sumDelivery = sumProducts > 100 ? 0 : sumProducts / 10;

  return (
    <div className={style.navbar}>
      <NavbarLayout
        actionSlot={
          <Link to="/checkout" className={style.navbar_btn}>
            <Button
              aria-label="Proceed to online payment"
              disabled={!isPaymentReady}
              style={{ width: "100%", borderRadius: "7px" }}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  addOrder({
                    address: "",
                    dateDelivery: "",
                    paymentType: "",
                    products: [],
                    totalCount: "",
                  });
                  resetCoupon();
                }, 1000);
              }}
            >
              Pay online
            </Button>
          </Link>
        }
        contentSlot={
          <div className={style.footer}>
            <div className={style.footer_deliverySum}>
              <Text color="secondary" tag="h4">
                Delivery:
              </Text>
              <Text
                tag="h4"
                color="secondary"
                className={
                  sumDelivery ? style.footer_totalSumCount__isActive : ""
                }
              >
                {sumDelivery} $
              </Text>
            </div>
            <div className={style.footer_discountSum}>
              <Text color="secondary" tag="h4">
                Discount:
              </Text>
              <Text
                tag="h4"
                color="secondary"
                className={
                  discountValue ? style.footer_totalSumCount__isActive : ""
                }
              >
                {discountValue} $
              </Text>
            </div>
            <div className={style.footer_totalSum}>
              <Text
                className={style.footer_totalSumText}
                color="primary"
                tag="h3"
              >
                Total:
              </Text>
              <Text
                className={style.footer_totalSumCount}
                tag="p"
                view="p-20"
                weight="bold"
                color="accent"
              >
                {Math.trunc(sumProducts + sumDelivery)} $
              </Text>
            </div>
          </div>
        }
        subtitle={
          <Text tag="h5" color="secondary" className={style.navbar_description}>
            By clicking on the button, you agree to the Terms of Processing of
            Personal Data, as well as the Terms of Sale
          </Text>
        }
      />
      <PromotionalCode />
    </div>
  );
});

export default Navbar;
