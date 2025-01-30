import classNames from "classnames";
import style from "./Pagination.module.css";
import getPagination from "../../function/getPagination";
import LeftArrow from "./svg/LeftArrow";
import RightArrow from "./svg/RightArrow";

interface IPagination {
  currentPage: number;
  onClick: (page?: number) => void;
  countVisiblePages: number;
  maxCountProductsPage: number;
  countAllProducts: number;
  className?: string;
}
const Pagination = ({
  currentPage,
  onClick,
  countVisiblePages,
  maxCountProductsPage,
  countAllProducts,
  className,
}: IPagination) => {
  const totalPages = Math.ceil(countAllProducts / maxCountProductsPage);

  const { startPages, endPages } = getPagination(
    currentPage,
    totalPages,
    countVisiblePages
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
          currentPage == Number(page) && style.active_page,
          page !== "..." && currentPage !== Number(page) && style.count
        )}
        onClick={() => page != "..." && onClick(Number(page))}
      >
        {page}
      </div>
    ));
  };

  return (
    <div className={classNames(style.pagination, className)}>
      {totalPages > 5 && (
        <div
          onClick={() => currentPage > 1 && onClick(currentPage - 1)}
          className={style.pagination_scroll}
        >
          <LeftArrow isActive={currentPage > 1} />
        </div>
      )}
      <ul className={style.pagination_pages}>{getPages()}</ul>
      {totalPages > countVisiblePages && (
        <div
          onClick={() => onClick(currentPage + 1)}
          className={style.pagination_scroll}
        >
          <RightArrow isActive={endPages.length > 0} />
        </div>
      )}
    </div>
  );
};

export default Pagination;
