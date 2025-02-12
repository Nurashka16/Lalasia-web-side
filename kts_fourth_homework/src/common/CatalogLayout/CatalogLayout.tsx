import style from "./CatalogLayout.module.css";
import Text from "src/common/components/Text";
import Cards from "../Cards/Cards";
import { IProduct } from "src/product/interface/IProduct";
import { IBasketProductsIdToCount } from "src/basket/stores/basket-store";
import classNames from "classnames";

interface ICatalogLayoutProps {
  onClick: (product: IBasketProductsIdToCount) => void;
  products: IProduct[];
  countAllProducts?: number;
  title?: string;
  className?: string;
}

const CatalogLayout = ({
  onClick,
  products,
  countAllProducts,
  title,
  className,
}: ICatalogLayoutProps) => {
  return (
    <div className={classNames(style.catalog, className)}>
      {title && (
        <div className={style.catalog_title}>
          <Text tag="h2" maxLines={0} className={style.title} weight="bold">
            {title}
          </Text>
          <Text
            tag="span"
            view="p-20"
            color="accent"
            weight="bold"
            maxLines={0}
            className={style.count}
          >
            {countAllProducts && countAllProducts}
          </Text>
        </div>
      )}
      <Cards onClick={onClick} products={products} />
    </div>
  );
};

export default CatalogLayout;
