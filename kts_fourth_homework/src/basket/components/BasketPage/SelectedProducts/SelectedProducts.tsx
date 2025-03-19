import basketStore from "../../../stores/basket-store";
import SelectedProduct from "./SelectedProduct";
import { EmptyBasket } from "../EmptyBasket/EmptyBasket";
import style from "./SelectedProduct.module.css";
import { observer } from "mobx-react-lite";

const SelectedProducts = observer(() => {
  const {
    allProductsBasket,
    productIdsWithCounts,
    updateCountProduct,
    deleteProduct,
    toggleSelectedProduct,
    updateProductsPayment
  } = basketStore;

  const products = allProductsBasket.map((product) => {
    return (
      <SelectedProduct
      updateProductsPayment={updateProductsPayment}
        key={product.id}
        isActive={product.isSelected}
        deleteProduct={deleteProduct}
        defaultCount={productIdsWithCounts.get(product.id)!}
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
