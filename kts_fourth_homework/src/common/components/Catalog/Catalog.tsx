import { IProduct } from "src/product/interface/IProduct";
import style from "./Catalog.module.css";
import { IBasketProductsIdToCount } from "src/basket/stores/basket-store";
import { ICard } from "src/common/interfaces/ICard";
import Card from "../Card";
import Text from "../Text";
import NotFound from "../NotFound";
import Pagination from "../Pagination";

interface ICatalog {
  productsCurrentPage: IProduct[];
  maxCountProductsPage: number;
  countAllProducts: number;
  currentPage?: number;
  setPage: (page?: number) => void;
  countVisiblePages?: number;
  addCard: (product: IBasketProductsIdToCount) => void;
}
//можно убрать из common и переместить в home
//а catalog в category переписать

const Catalog = ({
  productsCurrentPage,
  maxCountProductsPage,
  countAllProducts,
  currentPage = 1,
  setPage,
  addCard,
  countVisiblePages = 5,
}: ICatalog) => {
  const cards = productsCurrentPage.map((item: ICard) => {
    return (
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
            {countAllProducts}
          </Text>
        </div>
        {countAllProducts !== 0 ? (
          <div className={style.main_products}>{cards}</div>
        ) : (
          <NotFound text="Nothing found" />
        )}
      </div>

      {countAllProducts > 0 && (
        <Pagination
          currentPage={currentPage}
          setPage={setPage}
          lengthVisiblePages={countVisiblePages}
          lengthProductsPage={maxCountProductsPage}
          numberAllProducts={countAllProducts}
        />
      )}
    </div>
  );
};

export default Catalog;
