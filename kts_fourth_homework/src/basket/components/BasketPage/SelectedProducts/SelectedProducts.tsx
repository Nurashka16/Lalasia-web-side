import basketStore from "../../../stores/basket-store";
import SelectedProduct from "./SelectedProduct";
import { EmptyBasket } from "../EmptyBasket/EmptyBasket";
import style from "./SelectedProduct.module.css";
import { observer } from "mobx-react-lite";

const SelectedProducts = observer(() => {
  const {
    allProductsBasket,
    dataProductsBasket,
    updateCountProduct,
    deleteProduct,
    toggleSelectedProduct,
    updateProductsPayment
  } = basketStore;

  const products = allProductsBasket.map((product) => {
    return (
      <SelectedProduct
      updateProductsPayment={updateProductsPayment}
        key={product.data.id}
        isActive={product.isActive}
        deleteProduct={deleteProduct}
        defaultCount={dataProductsBasket.get(product.data.id)!}
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
