import { makeAutoObservable, runInAction } from "mobx";
import { getAll } from "../api/getAll";
import { IProduct } from "src/product/interface/IProduct";
import { Pagination } from "src/common/api/Pagination";
import { search } from "../api/search";
import { ProductsFilter } from "src/common/api/ProductsFilter";
import { Option } from "src/common/MultiDropDown/interface/Option";

const typesSort: Option[] = [
  { key: "1", value: "Popular" },
  { key: "2", value: "Cheaper" },
  { key: "3", value: "More expensive" },
  { key: "4", value: "New Items" },
];

class ProductsStore {
  filter = new ProductsFilter(typesSort);
  productsCurrentPage: IProduct[] = [];
  pagination = new Pagination(9);
  allProducts: IProduct[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setPage = (page: number = 1) => {
    if(page) {
      this.pagination.currentPage = page;
      this.productsCurrentPage = this.allProducts.slice(
        this.pagination.getStartIndex(),
        this.pagination.getEndIndex()
      );
    }
  };

  sort(arr: IProduct[]) {
    const sortedArr = [...arr];
    switch (this.filter.selectedSort.value) {
      case "asc":
        return sortedArr.sort((a, b) => a.price - b.price);
      case "desc":
        return sortedArr.sort((a, b) => b.price - a.price);
        //поскольку мы не знаем дату создания товаров, то делаем рандомим продукты
      case "new":
        return this.shuffleArray(sortedArr);
      default:
        return sortedArr;
    }
  }
  shuffleArray(arr: IProduct[]): IProduct[] {
    //возможно убрать в common func
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
    }
    return copy;
  }
  
  search = async () => {
    this.pagination.numberAllProducts = 0;
    this.allProducts = [];
    const selectedCategoriesIds = this.filter.selectedCategories.map(
      (category: Option) => {
        return Number(category.key);
      }
    );
    try {
      let response = await search({
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
        this.allProducts = this.sort(response);
      });
      this.setPage();
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
    try {
      let response = await getAll();
      runInAction(() => {
        if (response.length > 1000) {
          response = response.slice(0, 1000);
        }
        this.pagination.numberAllProducts = response.length;
        this.allProducts = this.sort(response);
        this.setPage();
      });
    } catch (error) {
      console.error("Ошибка в получении данных:", error);
      throw new Error("Ошибка в получении всех элементов каталога");
    }
  };
}

export default new ProductsStore();
