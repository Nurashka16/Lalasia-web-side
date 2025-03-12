import style from "./SelectedProduct.module.css";
import { IProductsSelectedPayment } from "../../../stores/basket-store";
import { Link } from "react-router-dom";
import CheckBox from "src/common/components/CheckBox";
import Text from "src/common/components/Text";
import Counter from "src/common/components/Counter/Counter";
import DeleteIcon from "../../icons/DeleteIcon";
import BuyNowIcon from "../../icons/BuyNowIcon";

interface ISelectedProductProps {
  product: IProductsSelectedPayment;
  updateCountProduct: (id: number, count: number) => void;
  defaultCount: number;
  deleteProduct: (id: number) => void;
  toggleSelectedProduct: (id: number, isActive: boolean) => void;
  isActive: boolean;
  updateProductsPayment: () => void;
}
const SelectedProduct = ({
  product,
  updateCountProduct,
  defaultCount,
  deleteProduct,
  toggleSelectedProduct,
  updateProductsPayment,
  isActive,
}: ISelectedProductProps) => {
  return (
    <article className={style.product}>
      <div className={style.main}>
        <CheckBox
          className={style.checkbox}
          width={30}
          height={30}
          checked={isActive}
          onChange={() => toggleSelectedProduct(product.data.id, !isActive)}
        />
        <div className={style.content}>
          <Link className={style.link} to={`/product/${product.data.id}`}>
            <img
              className={style.image}
              alt="Product image"
              src={product.data.images[0]}
            />
          </Link>
          <div className={style.info}>
            <Text tag="h3" className={style.title} maxLines={1} weight="bold">
              {product.data.title}
            </Text>
            <Text
              className={style.description}
              color="secondary"
              tag="p"
              maxLines={2}
            >
              {product.data.description}
            </Text>
            <div className={style.icons}>
              <button
                className={style.delete}
                aria-label={`Delete ${product.data.title}`}
                onClick={() => deleteProduct(product.data.id)}
              >
                <DeleteIcon />
              </button>
              <Link to={"/order"} onClick={() => console.log()}>
                <button
                  className={style.buy}
                  aria-label={`Buy only this product ${product.data.title}`}
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
          {product.data.price} $
        </Text>
        <div className={style.counter}>
          <Counter
            defaultCount={defaultCount}
            onClick={(count: number) =>
              updateCountProduct(count, product.data.id)
            }
          />
        </div>
      </div>
    </article>
  );
};

export default SelectedProduct;
