import { IProduct } from "src/product/interface/IProduct";
import style from "./Catalog.module.css";
import { IBasketProductsIdToCount } from "src/basket/stores/basket-store";
import { ICard } from "src/common/interfaces/ICard";
import Card from "../../Cards/Card";
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
//но лучше это сделать после полного осмотра стр Categories

const Catalog = ({
  productsCurrentPage,
  maxCountProductsPage, // если не передано макс количество продуктов, вывести все!
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
        onClick={addCard}
      />
    );
  });

  return (
    <div className={style.catalog}>
      <div className={style.catalog_title}>
        <Text tag="h1" maxLines={0} className={style.title} weight="bold">
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
      {countAllProducts ? (
        <div className={style.main}>{cards}</div>
      ) : (
        <NotFound text="Nothing found" />
      )}

      {countAllProducts && (
        <Pagination
          className={style.pagination}
          currentPage={currentPage}
          onClick={setPage}
          countVisiblePages={countVisiblePages}
          maxCountProductsPage={maxCountProductsPage}
          countAllProducts={countAllProducts}
        />
      )}
    </div>
  );
};

export default Catalog;
