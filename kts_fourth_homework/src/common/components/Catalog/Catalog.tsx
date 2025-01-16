import style from "./Catalog.module.css";
import { Link } from "react-router-dom";
import Card from "../Card";
import Text from "../Text";
import { ICard } from "../../interfaces/ICard";
import NotFound from "../NotFound";
import Pagination from "../Pagination";
import { IProduct } from "../../../product/interface/IProduct";
import { useEffect } from "react";
import { IBasketProduct } from "../../../basket/interface/IBasketProduct";
import { IBasketProductsIdToCount } from "src/basket/stores/basket-store";

interface ICatalog {
  partProducts: IProduct[];
  lengthProductsPage: number;
  numberAllProducts: number;
  currentPage?: number;
  setPage: (page?: number) => void;
  lengthVisiblePages?: number;
  addCard: (product: IBasketProductsIdToCount) => void
}

const Catalog = ({
  partProducts,
  lengthProductsPage,
  numberAllProducts,
  currentPage = 1,
  setPage,
  addCard,
  lengthVisiblePages = 5,
}: ICatalog) => {
  const cards = partProducts.map((item: ICard) => {
    return (
      // <Link to={"/product/" + item.id}>
        <Card
          id={item.id}
          image={item.images[0]}
          captionSlot={item.category.name}
          title={item.title}
          subtitle={item.description}
          contentSlot={"$" + item.price}
          actionSlot="Add to Cart"
          addCard={addCard}
        />
      // </Link>
    );
  });

  return (
    <div className={style.catalog}>
      <div className={style.catalog_main}>
        <div className={style.main_counter}>
          <Text
            tag="div"
            maxLines={0}
            className={style.main_title}
            weight="bold"
          >
            Total&thinsp;Product
          </Text>
          <Text
            tag="span"
            view="p-20"
            color="accent"
            weight="bold"
            maxLines={0}
            className={style.main_count}
          >
            {numberAllProducts}
          </Text>
        </div>
        {numberAllProducts !== 0 ? (
          <div className={style.main_products}>{cards}</div>
        ) : (
          <NotFound text="Nothing found" />
        )}
      </div>

      {numberAllProducts > 0 && (
        <Pagination
          currentPage={currentPage}
          setPage={setPage}
          lengthVisiblePages={lengthVisiblePages}
          lengthProductsPage={lengthProductsPage}
          numberAllProducts={numberAllProducts}
        />
      )}
    </div>
  );
};

export default Catalog;
