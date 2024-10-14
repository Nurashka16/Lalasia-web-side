import { search } from "./../api/search";
import { makeAutoObservable, runInAction } from "mobx";
import { IProductsFilter } from "../interface/IProductsFilter";
import { IDiapason } from "../interface/IDiapason";
import { IProduct } from "../../product/interface/IProduct";
import { ICategory } from "../../categories/interface/ICategory";
import { getAll } from "../api/getAll";
import * as productsApi from "../api/search";
import { Pagination } from "../../common/api/Pagination";
import { ProductsFilter } from "../../common/api/ProductsFilter";

class ProductsStore {
  filter: ProductsFilter = new ProductsFilter();
  categoriesData: ICategory[] = [];
  partProducts: IProduct[] = [];
  allProducts: IProduct[] = [];
  pagination: Pagination = new Pagination(9);

  constructor() {
    makeAutoObservable(this);
  }
  setPage = async (page: number = 1) => {
    this.pagination.currentPage = page;
    this.partProducts = this.allProducts.slice(
      this.pagination.getStartIndex(),
      this.pagination.getEndIndex()
    );
  };
  search = async () => {
    this.allProducts = [];
    this.pagination.numberAllProducts = 0;
    try {
      if (this.filter.categoryIds.length !== 0) {
        for (let i = 0; i < this.filter.categoryIds.length; i++) {
          const response: IProduct[] = await productsApi.search({
            title: this.filter.title,
            categoryId: this.filter.categoryIds[i],
            diapason: {
              priceMin: this.filter.diapason.min,
              priceMax: this.filter.diapason.max,
            },
          });
          runInAction(() => {
            this.pagination.numberAllProducts += response.length;
            this.allProducts = { ...this.allProducts, ...response };
            this.setPage();
          });
        }
      } else {
        const response: IProduct[] = await productsApi.search({
          title: this.filter.title,
          diapason: {
            priceMin: this.filter.diapason.min,
            priceMax: this.filter.diapason.max,
          },
        });
        runInAction(() => {
          console.log(response.length);
          
          // this.pagination.numberAllProducts = response.length;
          // this.allProducts = response;
          // this.setPage();
        });
      }
    } catch {
      throw new Error("Ошибка в поиске элементов");
    }
  };
  getAll = async () => {
    try {
      let response = await getAll();
      let result: IProduct[] = [];
      runInAction(() => {
        if (response.length > 1000) {
          response = response.slice(0, 1000);
        } 
        // else {
        //   result = response;
        // }
        this.pagination.numberAllProducts = response.length;
        this.allProducts = response;
        this.setPage();
        // this.partProducts = response.slice(this.pagination.getOffset());
      });
    } catch {
      throw new Error("Ошибка в получении всех элементов каталога");
    }
  };
}
export default new ProductsStore();
