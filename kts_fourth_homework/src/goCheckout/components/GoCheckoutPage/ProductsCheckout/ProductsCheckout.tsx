import basketStore from "src/basket/stores/basket-store";
import style from "./ProductCheckout.module.css";
import ProductCheckout from "./ProductCheckout";
import ScrollLayout from "src/common/components/ScrollLayout/ScrollLayout";

const ProductsCheckout = () => {
  const { selectedProductsPayment } = basketStore;

  const products = selectedProductsPayment.map((product) => (
    <ProductCheckout
      {...product}
      images={product.images}
      count={product.count}
      price={product.price}
    />
  ));
  return <ScrollLayout className={style.products}>{products}</ScrollLayout>;
};

export default ProductsCheckout;
