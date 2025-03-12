import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import Button from "src/common/components/Button";
import Text from "src/common/components/Text";
import { observer } from "mobx-react-lite";
import basketStore from "src/basket/stores/basket-store";

const NavbarBasket = observer(() => {
  const isButtonDisabled =
    basketStore.countSelectedProducts === 0 || basketStore.totalPrice === 0;
  return (
    <nav className={style.navbar}>
      <div className={style.content}>
        <Button
          aria-label="Go to registration"
          aria-disabled={isButtonDisabled}
          className={style.btn}
          disabled={isButtonDisabled}
        >
          <Link className={style.link} to="/goCheckout">
            Go to registration
          </Link>
        </Button>
        <Text
          maxLines={3}
          tag="h5"
          color="secondary"
          className={style.subtitle}
        >
          Available delivery methods and times can be selected when placing an
          order.
        </Text>
        <div className={style.line}></div>
      </div>

      <footer className={style.footer}>
        <div className={style.goods}>
          <Text color="secondary" className={style.goodsTitle} tag="h4">
            Goods:
          </Text>
          <Text color="secondary" className={style.goodsCount}>
            {basketStore.countSelectedProducts}
          </Text>
        </div>
        <div className={style.totalCost}>
          <Text className={style.totalCostTitle} tag="h3">
            Total cost:
          </Text>
          <Text className={style.totalCostCount} weight="bold" color="accent">
            {basketStore.totalPrice} $
          </Text>
        </div>
      </footer>
    </nav>
  );
});

export default NavbarBasket;
