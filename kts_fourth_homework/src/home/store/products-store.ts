import { makeAutoObservable, runInAction } from "mobx";
import { getAll } from "../api/getAll";
import { IProduct } from "src/product/interface/IProduct";
import { Pagination } from "src/common/api/Pagination";
import ProductsFilter from "src/common/api/ProductsFilter";
import { search } from "../api/search";

class ProductsStore {
  filter = ProductsFilter;
  productsCurrentPage: IProduct[] = [];
  pagination = new Pagination(9);
  allProducts: IProduct[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  setPage = (page: number = 1) => {
    this.pagination.currentPage = page;
    this.productsCurrentPage = this.allProducts.slice(
      this.pagination.getStartIndex(),
      this.pagination.getEndIndex()
    );
  };

  search = async () => {//не работает
    this.pagination.numberAllProducts = 0;
    this.allProducts = [];
    try {
      let response = await search({
        title: this.filter.title,
        categoryIds: [...this.filter.selectedFilterIds],
        diapason: {
          priceMin: this.filter.diapason.min,
          priceMax: this.filter.diapason.max,
        },
      });
      runInAction(() => {
        if (response.length > 1000) {
          response = response.slice(0, 1000);
        }
        this.pagination.numberAllProducts += response.length;
        this.allProducts.push(...response);
      });
      this.setPage();
    } catch {
      throw new Error("Ошибка в поиске элементов");
    }
  };

  getAll = async () => {
    try {
      let response = await getAll();
      runInAction(() => {
        if (response.length > 1000) {
          response = response.slice(0, 1000);
        }
        this.pagination.numberAllProducts = response.length;
        this.allProducts = response;
        this.setPage();
      });
    } catch {
      throw new Error("Ошибка в получении всех элементов каталога");
    }
  };
}
export default new ProductsStore();
