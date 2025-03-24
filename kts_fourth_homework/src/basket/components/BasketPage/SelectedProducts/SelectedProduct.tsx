import style from "./SelectedProduct.module.css";
import { Link } from "react-router-dom";
import CheckBox from "src/common/components/CheckBox";
import Text from "src/common/components/Text";
import Counter from "src/common/components/Counter/Counter";
import DeleteIcon from "../../icons/DeleteIcon";
import BuyNowIcon from "../../icons/BuyNowIcon";
import { IProductPayment } from "src/goCheckout/stores/payment-store";
import { IProductBasket } from "src/basket/stores/basket-store";
import { useState } from "react";

interface ISelectedProductProps {
  product: IProductBasket;
  updateCountProduct: (id: number, count: number) => void;
  defaultCount: number;
  deleteProduct: (id: number) => void;
  toggleSelectedProduct: (id: number, isActive: boolean) => void;
  isActive: boolean;
  addProductPayment: (product: IProductPayment) => void;
}
const SelectedProduct = ({
  product,
  updateCountProduct,
  defaultCount,
  deleteProduct,
  toggleSelectedProduct,
  addProductPayment,
  isActive,
}: ISelectedProductProps) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleDelete = () => {
    setIsRemoving(true);
    setTimeout(() => {
      deleteProduct(product.id);
    }, 500); // время анимации
  };
  return (
    <article
      className={`${style.product} ${isRemoving ? style["productLeave"] : ""}`}
    >
      <div className={style.main}>
        <CheckBox
          className={style.checkbox}
          width={30}
          height={30}
          checked={isActive}
          onChange={() => toggleSelectedProduct(product.id, !isActive)}
        />
        <div className={style.content}>
          <Link className={style.link} to={`/product/${product.id}`}>
            <img
              className={style.image}
              alt="Product image"
              src={product.images[0]}
            />
          </Link>
          <div className={style.info}>
            <Text tag="h3" className={style.title} maxLines={1} weight="bold">
              {product.title}
            </Text>
            <Text
              className={style.description}
              color="secondary"
              tag="p"
              maxLines={2}
            >
              {product.description}
            </Text>
            <div className={style.icons}>
              <button
                className={style.delete}
                aria-label={`Delete ${product.title}`}
                onClick={() => handleDelete()}
              >
                <DeleteIcon />
              </button>
              <Link
                to={"/checkout"}
                onClick={() =>
                  addProductPayment({ ...product, count: defaultCount })
                }
              >
                <button
                  className={style.buy}
                  aria-label={`Buy only this product ${product.title}`}
                >
                  <BuyNowIcon />
                  <Text color="primary" className={style.buyText} weight="bold">
                    Buy now
                  </Text>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={style.additional}>
        <Text tag="span" maxLines={1} className={style.price}>
          {product.price} $
        </Text>
        <div className={style.counter}>
          <Counter
            defaultCount={defaultCount}
            onClick={(count: number) => updateCountProduct(count, product.id)}
          />
        </div>
      </div>
    </article>
  );
};

export default SelectedProduct;
