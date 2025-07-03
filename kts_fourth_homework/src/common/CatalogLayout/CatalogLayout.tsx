import style from "./CatalogLayout.module.css";
import Text from "src/common/components/Text";
import Cards from "../Cards/Cards";
import { IProduct } from "src/product/interface/IProduct";
import classNames from "classnames";
import { ReactNode } from "react";
import NotFound from "../components/NotFound";

interface ICatalogLayoutProps {
  onClick?: (id: number) => void;
  products?: IProduct[];
  countAllProducts?: number;
  title?: string;
  className?: string;
  children?: ReactNode;
}

const CatalogLayout = ({
  onClick,
  products = [],
  title,
  className,
  children,
}: ICatalogLayoutProps) => {
const hasProducts = products.length > 0 && !!onClick;
  const countAllProducts = products.length;
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
            {countAllProducts}
          </Text>
        </div>
      )}
      {countAllProducts > 0 ? (
        !!hasProducts ? (
          <Cards onClick={onClick} products={products} />
        ) : (
          children
        )
      ) : (
        <NotFound text="Not found" />
      )}
    </div>
  );
};

export default CatalogLayout;
