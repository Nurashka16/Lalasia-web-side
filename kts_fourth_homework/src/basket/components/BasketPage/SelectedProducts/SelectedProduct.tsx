import React, { useEffect, useState } from "react";
import style from "./SelectedProduct.module.css";
import CheckBox from "../../../../common/components/CheckBox";
import Text from "../../../../common/components/Text";
import Counter from "../../../../common/components/Counter/Counter";
import basketStore, { ISelectedProduct } from "../../../stores/basket-store";
import { Link } from "react-router-dom";

interface IItemProduct {
  product: ISelectedProduct;
  updateCountProduct: (id: number, count: number) => void;
  defaultCount: number;
  deleteProduct: (id: number) => void;
  toggleSelectedProduct: (id: number, isActive: boolean) => void;
}

const SelectedProduct = ({
  product,
  updateCountProduct,
  defaultCount,
  deleteProduct,
  toggleSelectedProduct,
}: IItemProduct) => {
  const [isActive, setActive] = useState(product.isActive);
  const [count, setCount] = useState(defaultCount);

  const updateProduct = (count: number) => {
    setCount(count);
    updateCountProduct(count, product.data.id);
  };

  const toggleProduct = (id: number, boolean: boolean) => {
    toggleSelectedProduct(id, boolean);
    setActive(boolean);
  };

  return (
    <div className={style.product}>
      <div className={style.product_content}>
        <CheckBox
          className={style.product_checkbox}
          width={30}
          height={30}
          checked={!isActive}
          onChange={() => toggleProduct(product.data.id, !isActive)}
        />
        <div className={style.product_item}>
          {/*добавить ссылку на товар Link по нажатию */}
          <Link className={style.product} to={"/product/" + product.data.id}>
            <img
              className={style.product_image}
              alt="здесь должно быть фото товара"
              src={product.data.images[0]}
            />
          </Link>
          <div className={style.product_description}>
            <Text
              className={style.product_name}
              maxLines={1}
              view="p-16"
              weight="medium"
            >
              {product.data.title}
            </Text>
            <div className={style.product_icons}>
              <div
                className={style.product_icon__delete}
                onClick={() => deleteProduct(product.data.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="m4.888 3.035.275-.826A2.5 2.5 0 0 1 7.535.5h.93a2.5 2.5 0 0 1 2.372 1.71l.275.825c2.267.09 3.555.406 3.555 1.527 0 .938-.417.938-1.25.938H2.583c-.833 0-1.25 0-1.25-.937 0-1.122 1.288-1.438 3.555-1.528m1.856-.299-.088.266Q7.295 3 8 3t1.345.002l-.089-.266a.83.83 0 0 0-.79-.57h-.931a.83.83 0 0 0-.79.57M2.167 7.167c0-.6.416-.834.833-.834h10c.417 0 .833.235.833.834 0 6.666-.416 8.333-5.833 8.333s-5.833-1.667-5.833-8.333m4.166 1.666a.833.833 0 0 0-.833.834v1.666a.833.833 0 1 0 1.667 0V9.667a.833.833 0 0 0-.834-.834m4.167.834a.833.833 0 1 0-1.667 0v1.666a.833.833 0 1 0 1.667 0z"
                  ></path>
                </svg>
              </div>
              <div className={style.product_icon__buy}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M4.932 3.64C3.705 4.886.638 8 3.092 8.996l2.454.997c1.227.498 1.227.498.981 1.744l-.368 1.868c-.859 4.36 3.682 0 4.909-1.245s4.294-4.36 1.84-5.357l-2.454-.996c-1.227-.498-1.227-.498-1.022-1.744.088-.539.272-1.246.409-1.868.958-4.36-3.682 0-4.909 1.245"
                  ></path>
                </svg>

                <Link to={"/order"}>
                  <Text weight="bold">Buy now</Text>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Text maxLines={1} className={style.product_price}>
          {product.data.price} $
        </Text>
        <div className={style.product_counter}>
          <Counter defaultCount={count} onClick={updateProduct} />
        </div>
      </>
    </div>
  );
};

export default SelectedProduct;
