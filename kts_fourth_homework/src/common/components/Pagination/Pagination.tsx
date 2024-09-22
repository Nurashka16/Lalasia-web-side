
import classNames from "classnames";
import style from "./Pagination.module.css";
import getPagination from "../../function/getPagination";

interface IPagination {
  currentPage: number;
  setPage: (page: number) => Promise<void>;
  lengthVisiblePages: number;
  lengthProductsPage: number;
  numberAllProducts: number;
}

const Pagination = ({
  currentPage,
  setPage,
  lengthVisiblePages,
  lengthProductsPage,
  numberAllProducts,
}: IPagination) => {
  const totalPages = Math.ceil(numberAllProducts / lengthProductsPage);

  const { startPages, endPages } = getPagination(
    currentPage,
    totalPages,
    lengthVisiblePages
  );

  const getPages = () => {
    const partPages = () => {
      if (endPages.length) {
        return [...startPages, "...", ...endPages];
      }
      return [...startPages, ...endPages];
    };
    return partPages().map((page) => (
      <div
        className={classNames(
          style.pagination_count,
          currentPage == Number(page) && style.active_page
        )}
        onClick={() => page != "..." && setPage(Number(page))}
      >
        {page}
      </div>
    ));
  };

  return (
    <div className={style.main_pagination}>
      {totalPages > 5 && (
        <svg
          onClick={() => currentPage > 1 && setPage(currentPage - 1)}
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.12 26.5599L11.4267 17.8666C10.4 16.8399 10.4 15.1599 11.4267 14.1333L20.12 5.43994"
            stroke={currentPage > 1 ? "#151411" : "#AFADB5"}
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
      <ul className={style.pagination_counter}>{getPages()}</ul>
      {numberAllProducts > 5 && (
        <svg
          onClick={() => setPage(currentPage + 1)}
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994"
            stroke={endPages.length ? "#151411" : "#AFADB5"}
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default Pagination;
