import basketStore from "../../../stores/basket-store";
import SelectedProduct from "./SelectedProduct";
import { EmptyBasket } from "../EmptyBasket/EmptyBasket";
import style from "./SelectedProduct.module.css";
import { observer } from "mobx-react-lite";
import paymentStore from "src/goCheckout/stores/payment-store";

const SelectedProducts = observer(() => {
  const {
    allProductsBasket,
    updateCountProduct,
    deleteProduct,
    toggleSelectedProduct
  } = basketStore;
  const {addProductPayment}=paymentStore
  const products = allProductsBasket.map((product) => {
    return (
      <SelectedProduct
      addProductPayment={addProductPayment}
        key={product.id}
        isActive={product.isSelected}
        deleteProduct={deleteProduct}
        defaultCount={product.count}
        updateCountProduct={updateCountProduct}
        product={product}
        toggleSelectedProduct={toggleSelectedProduct}
      />
    );
  });

  return (
    <div className={style.products}>
      {products.length ? products : <EmptyBasket />}
    </div>
  );
});

export default SelectedProducts;
