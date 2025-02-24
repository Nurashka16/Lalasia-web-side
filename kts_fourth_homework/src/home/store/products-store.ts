import { makeAutoObservable, runInAction } from "mobx";
import { IProduct } from "src/product/interface/IProduct";
import { Pagination } from "src/common/api/Pagination";
import { ProductsFilter } from "src/common/api/ProductsFilter";
import { Option } from "src/common/MultiDropDown/interface/Option";
import { shuffleArray } from "src/common/function/shuffleArray";
import { SortType } from "../interface/SortType";
import * as ProductsApi from "../api/ProductsApi";

export const typesSort: Option<SortType>[] = [
  new Option("Popular", "Popular"),
  new Option("Cheaper", "Cheaper"),
  new Option("MoreExpensive", "More expensive"),
  new Option("NewItems", "New items"),
];

class ProductsStore {
  filter = new ProductsFilter(typesSort);
  productsCurrentPage: IProduct[] = [];
  pagination = new Pagination(9);
  allProducts: IProduct[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setPage = (page: number = 1) => {
    if (page) {
      this.pagination.currentPage = page;
      this.productsCurrentPage = this.allProducts.slice(
        this.pagination.getStartIndex(),
        this.pagination.getEndIndex()
      );
    }
  };

  sort(arr: IProduct[]) {
    const sortedArr = [...arr];
    switch (this.filter.selectedTypeSort.key) {
      case "Cheaper":
        this.allProducts = sortedArr.sort((a, b) => a.price - b.price);
        break;
      case "MoreExpensive":
        this.allProducts = sortedArr.sort((a, b) => b.price - a.price);

        break;
      case "NewItems":
        this.allProducts = shuffleArray(sortedArr);
        //поскольку мы не знаем дату создания товаров, то делаем рандомим продукты
        break;
      default:
        this.allProducts = sortedArr;
        break;
    }
  }

  search = async () => {
    this.isLoading = true;
    this.pagination.numberAllProducts = 0;
    this.allProducts = [];
    const selectedCategoriesIds = this.filter.selectedCategories.map(
      (category: Option<string>) => {
        return Number(category.key);
      }
    );
    try {
      let response = await ProductsApi.search({
        title: this.filter.searchValue,
        categoryIds: selectedCategoriesIds,
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
        this.sort(response);
      });
      this.setPage();
      this.isLoading = false;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Ошибка в получении данных:", error.message);
        throw new Error("Ошибка в получении всех искомых элементов");
      } else {
        console.error("Неизвестная ошибка:", error);
        throw new Error("Неизвестная ошибка");
      }
    }
  };

  getAll = async () => {
    this.isLoading = true;
    try {
      let response = await ProductsApi.getAll();
      runInAction(() => {
        if (response.length > 1000) {
          response = response.slice(0, 1000);
        }
        this.pagination.numberAllProducts = response.length;
        this.sort(response);
        this.setPage();
        this.isLoading = false;
      });
    } catch (error) {
      console.error("Ошибка в получении данных:", error);
      throw new Error("Ошибка в получении всех элементов каталога");
    }
  };
}

export default new ProductsStore();
