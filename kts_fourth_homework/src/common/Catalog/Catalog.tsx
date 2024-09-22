import style from "./Catalog.module.css";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Text from "../components/Text";
import { ICard } from "../interfaces/ICard";
import NotFound from "../components/NotFound";
import Pagination from "../components/Pagination";
import { IProduct } from "../../product/interface/IProduct";

interface ICatalog {
  partProducts: IProduct[];
  lengthProductsPage: number;
  numberAllProducts: number;
  currentPage?: number;
  setPage: (page?: number) => Promise<void>;
  lengthVisiblePages?: number;
}

const Catalog = ({
  partProducts,
  lengthProductsPage,
  numberAllProducts,
  currentPage = 1,
  setPage,
  lengthVisiblePages = 5,
}: ICatalog) => {
  const cards = partProducts.map((item: ICard) => {
    return (
      <Link
        to={"/product/" + item.id}
        className="main_product"
        id={item.id.toString()}
      >
        <Card
          image={item.images[0]}
          captionSlot={item.category.name}
          title={item.title}
          subtitle={item.description}
          contentSlot={"$" + item.price}
          actionSlot="Add to Cart"
          onClick={() => console.log("куплен")}
        />
      </Link>
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
