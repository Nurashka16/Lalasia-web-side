import { makeAutoObservable, runInAction } from "mobx";
import { IProductsFilter } from "../interface/IProductsFilter";
import { iDiapason } from "../interface/IDiapason";
import { IProduct } from "../../product/interface/IProduct";
import { ICategory } from "../interface/ICategory";
import { getAll } from "../api/getAll";
import { getCategories } from "../api/getCategories";
import {getProductsSameCategory} from '../api/getProductsSameCategory'
import { searchProducts } from "../api/searchProducts";

class ProductsFilter implements IProductsFilter {
  categoryIds: number[] = [];
  diapason?: iDiapason = undefined;
  title?: string = undefined;

  public Clear(): void {
    this.categoryIds = [];
    this.diapason = undefined;
    this.title = undefined;
  }
}

class Pagination {
  private _limitPage: number;

  public numberAllProducts: number = 0;
  public currentPage: number = 1;

  constructor(limitPage: number) {
    this._limitPage = limitPage;
  }

  get limitPage(): number {
    return this._limitPage;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this._limitPage;
  }
  getEndIndex(): number {
    return this.limitPage * this.currentPage;
  }
}

class ProductsStore {
  private _selectedFilters: ProductsFilter = new ProductsFilter();

  categoriesData: ICategory[] = [];
  partProducts: IProduct[] = [];
  allProducts: IProduct[] = [];
  pagination: Pagination = new Pagination(9);

  get selectedFilters(): ProductsFilter {
    return this._selectedFilters;
  }

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
  search = async (data: IProductsFilter) => {

    // const categoriesLength = this.selectedFilters.categoryIds.length;
    // this.allProducts = [];//подумать
    // this.pagination.numberAllProducts = 0;

    try {
      if (data.categoryIds.length !== 0) {
        for (let i = 0; i < data.categoryIds.length; i++) {
          const response: IProduct[] = await searchProducts({
            title: data.title,
            categoryId: this.selectedFilters.categoryIds[i],
            diapason: {
              priceMin: data.diapason?.priceMin,
              priceMax: data.diapason?.priceMin,
            },
          });
          runInAction(() => {
            this.pagination.numberAllProducts += response.length;
            this.allProducts = { ...this.allProducts, ...response };
            this.setPage();
          });
        }
      } else {
        const response: IProduct[] = await searchProducts({
          title: data.title,
          diapason: {
            priceMin: data.diapason?.priceMin,
            priceMax: data.diapason?.priceMin,
          },
        });
        runInAction(() => {
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
      const response = await getAll();
      runInAction(() => {
        this.pagination.numberAllProducts = response.length;
        this.allProducts = response;
        this.setPage();
        // this.partProducts = response.slice(this.pagination.getOffset());
      });
    } catch {
      throw new Error("Ошибка в получении всех элементов каталога");
    }
  };
  getCategories = async () => {
    try {
      const response = await getCategories();
      runInAction(() => {
        this.categoriesData =
          response.length > 5 ? response.slice(0, 5) : response;
      });
    } catch {
      throw new Error("Ошибка в получении категорий");
    }
  };
  getProductsSameCategories = async (id: number) => {
    try {
      const response = await searchProducts( categoryId:id);
      runInAction(() => {
        this.allProducts = response;
        // this.setPage();
        // this.pagination.numberAllProducts = response.length;
        // console.log(this.allProducts);
      });
    } catch {
      throw new Error("Ошибка в получении продуктов одной категории");
    }
  };
  addFilter = async (id: number) => {
    this._selectedFilters.categoryIds.push(id);
  };
}
export default new ProductsStore();
