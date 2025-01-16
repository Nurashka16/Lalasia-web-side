import { makeAutoObservable, runInAction } from "mobx";
import { getAll } from "../api/getAll";
import * as productsApi from "../api/search";
import { IProduct } from "src/product/interface/IProduct";
import { PaginationClass } from "src/common/api/Pagination";
import { ProductsFilter } from "src/common/api/ProductsFilter copy";

class ProductsStore {
  filter: ProductsFilter = new ProductsFilter();
  partProducts: IProduct[] = [];
  allProducts: IProduct[] = [];
  pagination: PaginationClass = new PaginationClass(9);

  constructor() {
    makeAutoObservable(this);
  }
  setPage = (page: number = 1) => {
    this.pagination.currentPage = page;
    this.partProducts = this.allProducts.slice(
      this.pagination.getStartIndex(),
      this.pagination.getEndIndex()
    );
  };
  search = async () => {
    this.pagination.numberAllProducts = 0;
    this.allProducts = [];
    try {
      if (this.filter.selectedFilterIds.length !== 0) {
        for (let i = 0; i < this.filter.selectedFilterIds.length; i++) {
          let response: IProduct[] = await productsApi.search({
            title: this.filter.title,
            categoryId: Number(this.filter.selectedFilterIds[i]),
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
        }
        this.setPage();
      } else {
        let response: IProduct[] = await productsApi.search({
          title: this.filter.title,
          diapason: {
            priceMin: this.filter.diapason.min,
            priceMax: this.filter.diapason.max,
          },
        });
        runInAction(() => {
          if (response.length > 1000) {
            response = response.slice(0, 1000);
          }

          this.pagination.numberAllProducts = response.length;
          this.allProducts = response;
          this.setPage();
        });
      }
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
