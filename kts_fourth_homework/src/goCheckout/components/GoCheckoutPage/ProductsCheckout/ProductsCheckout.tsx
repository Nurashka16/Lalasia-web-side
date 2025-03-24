import basketStore from "src/basket/stores/basket-store";
import style from "./ProductCheckout.module.css";
import ProductCheckout from "./ProductCheckout";
import ScrollLayout from "src/common/components/ScrollLayout/ScrollLayout";
import paymentStore from "src/goCheckout/stores/payment-store";
import Text from "src/common/components/Text";

const ProductsCheckout = () => {
  const { productsPayment } = paymentStore;

  const products = productsPayment.map((product) => (
    <ProductCheckout
      {...product}
      images={product.images}
      count={product.count}
      price={product.price}
    />
  ));
  return (
    <div className={style.productsCheckout}>
      <Text className={style.content_title}>Selected Products:</Text>
      <ScrollLayout className={style.products}>{products}</ScrollLayout>
    </div>
  );
};

export default ProductsCheckout;
//
