import classNames from "classnames";
import style from "./Pagination.module.css";
import getPagination from "../../function/getPagination";
import LeftArrow from "./svg/LeftArrow";
import RightArrow from "./svg/RightArrow";
import VisiblePage from "./PaginationPage/PaginationPage";

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

  const getNumberPages = () => {
    if (endPages.length) {
      return [...startPages, "...", ...endPages];
    }
    return [...startPages, ...endPages];
  };

  const pages = getNumberPages().map((page) => (
    <VisiblePage
      numberPage={page}
      isActive={currentPage == page}
      onClick={onClick}
      disabled={page == "..."}
    />
  ));

  return (
    <div className={classNames(style.pagination, className)}>
      {totalPages > 5 && (
        <div
          onClick={() => currentPage > 1 && onClick(currentPage - 1)}
          className={classNames(
            style.pagination_scroll,
            !(currentPage > 1) && style.pagination_scroll__disabled
          )}
        >
          <LeftArrow />
        </div>
      )}
      <ul className={style.pagination_pages}>{pages}</ul>
      {totalPages > countVisiblePages && (
        <div
          onClick={() => onClick(currentPage + 1)}
          className={classNames(
            style.pagination_scroll,
            !(endPages.length > 0) && style.pagination_scroll__disabled
          )}
        >
          <RightArrow />
        </div>
      )}
    </div>
  );
};

export default Pagination;
