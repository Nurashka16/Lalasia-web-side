import style from "./CatalogLayout.module.css";
import Text from "src/common/components/Text";
import Cards from "../Cards/Cards";
import { IProduct } from "src/product/interface/IProduct";
import { IBasketProductsIdToCount } from "src/basket/stores/basket-store";

interface ICatalogLayoutProps {
  onClick: (product: IBasketProductsIdToCount) => void;
  products: IProduct[];
  countAllProducts: number;
}

const CatalogLayout = ({
  onClick,
  products,
  countAllProducts,
}: ICatalogLayoutProps) => {
  return (
    <div className={style.catalog}>
      <div className={style.catalog_title}>
        <Text tag="h2" maxLines={0} className={style.title} weight="bold">
          Total&thinsp;Product
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
      <Cards onClick={onClick} products={products} />
      {
        //передавать как чилдрен
      }
    </div>
  );
};

export default CatalogLayout;
