import { makeAutoObservable, runInAction } from "mobx";
import { IProductsFilter } from "../interface/IProductsFilter";
import { iDiapason } from "../interface/IDiapason";
import { searchProducts } from "../../api/searchProducts";
import { getAllProducts } from "../../api/getAllProducts";
import { IProduct } from "../../product/interface/IProduct";

class ProductsFilter implements IProductsFilter {
  categoryIds: number[] = [];
  diapason?: iDiapason = undefined;
  price?: number = undefined;
  title?: string = undefined;

  public Clear(): void {
    this.categoryIds = [];
    this.diapason = undefined;
    this.price = undefined;
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

  // categoriesData: ICategory[] = [];

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

  search = async (value: string) => {
    const categoriesLength = this.selectedFilters.categoryIds.length;
    this.allProducts = [];

    try {
      if (categoriesLength !== 0) {
        for (let i = 0; i < categoriesLength; i++) {
          const response: IProduct[] = await searchProducts({
            title: value,
            categoryId: this.selectedFilters.categoryIds[i],
          });
          runInAction(() => {
            this.pagination.numberAllProducts = response.length;
            this.allProducts = { ...this.allProducts, ...response };
            this.setPage();
          });
        }
      } else {
        const response: IProduct[] = await searchProducts({
          title: value,
        });
        runInAction(() => {
          this.pagination.numberAllProducts = response.length;
          this.allProducts = response;
          this.setPage();
        });
      }
    } catch {
      throw new Error("Ошибка в получении отфильтрованный элементов");
    }
  };

  getAllProducts = async () => {
    try {
      const response = await getAllProducts();
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

  addFilter = async (id: number) => {
    this._selectedFilters.categoryIds.push(id);
  };
}
export default new ProductsStore();
