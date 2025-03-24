import React, { useState } from "react";
import style from "./ProductCard.module.css";
import { IProduct } from "src/product/interface/IProduct";
import basketStore from "src/basket/stores/basket-store";
import Text from "src/common/components/Text";
import Button from "src/common/components/Button";
import classNames from "classnames";
import Loader from "src/common/components/Loader";
import { observer } from "mobx-react-lite";
import Carousel from "src/common/components/Carousel/Carousel";
import paymentStore from "src/goCheckout/stores/payment-store";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = observer(({ product }) => {
  const [currentNumberImg, setCurrentNumberImg] = useState(1);
  const [isLoadingImg, setIsLoadingImg] = useState(false);

  const { addProduct, productIdsWithCounts } = basketStore;
  const { addProductPayment } = paymentStore;

  return (
    product && (
      <div className={style.card}>
        <Carousel
          isActive={false}
          className={style.carousel_icon}
          onClick={(value: number) => {
            setIsLoadingImg(true);
            setCurrentNumberImg(value);
            setTimeout(() => setIsLoadingImg(false), 200);
          }}
          currentItem={currentNumberImg}
          maxCountItem={product.images.length}
        >
          <div className={style.imageContainer}>
            {isLoadingImg ? (
              <div className={style.imageContainer_loader}>
                <Text tag="h2" weight="bold" color="secondary">
                  The picture is loading
                </Text>
                <Loader color="#afadb5" />
              </div>
            ) : (
              <img
                className={style.imageContainer_img}
                src={product?.images[currentNumberImg - 1]}
                alt="Product"
              />
            )}
          </div>
        </Carousel>
        <div className={style.main}>
          <div className={style.main_info}>
            <Text className={style.info_header} weight="bold" view="title">
              {product?.title}
            </Text>
            <Text
              className={style.info_description}
              view="p-20"
              weight="normal"
              color="secondary"
              maxLines={7}
            >
              {product?.description}
            </Text>
          </div>
          <div className={style.main_footer}>
            <Text className={style.footer_price} weight="bold" view="title">
              {"$" + product?.price}
            </Text>
            <div className={style.footer_buttons}>
              <Link
                to={"/checkout"}
                onClick={() => {
                  addProduct(product.id);
                  addProductPayment({
                    ...product,
                    count: productIdsWithCounts.get(product.id) || 1,
                  });
                }}
              >
                <Button
                  className={style.footer_btn}
                  aria-label={`Buy only this product ${product.title}`}
                >
                  Buy now
                </Button>
              </Link>
              <Button
                className={classNames(style.footer_btn, style.footer_btn__add)}
                onClick={() => addProduct(product.id)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
});

export default ProductCard;
