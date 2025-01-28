import basketStore from "../../../stores/basket-store";
import SelectedProduct from "./SelectedProduct";
import { EmptyBasket } from "../EmptyBasket/EmptyBasket";
import style from "./SelectedProduct.module.css";

const SelectedProducts = () => {
  const {
    basketProductsIdToCount,
    selectedProducts,
    updateCountProduct,
    deleteProduct,
    toggleSelectedProduct,
  } = basketStore;

  const products = selectedProducts.map((product) => {
    return (
      <SelectedProduct
        deleteProduct={deleteProduct}
        defaultCount={basketProductsIdToCount.get(product.data.id)!}
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
};

export default SelectedProducts;
