import { makeAutoObservable, runInAction } from "mobx";
import { getProduct } from "../api/getProduct";
import { IProduct } from "../interface/IProduct";
import {
  IRelatesProducts,
  RandomRelatesProducts,
} from "src/common/api/RandomRelatesProducts";

class ProductStore {
  private readonly _relatesProducts: IRelatesProducts;

  product: IProduct = null!;
  relatesProducts: IProduct[] = [];
  isLoading: boolean = false;

  constructor(relatesProducts: IRelatesProducts) {
    this._relatesProducts = relatesProducts;
    makeAutoObservable(this);
  }

  getProductAction = async (id: number) => {
    this.isLoading = true;
    try {
      const response = await getProduct(id);
      runInAction(() => {
        this.product = response;
        this.getRelatesProduct(this.product.category.id, 3, this.product.id);
      });
    } catch (error) {
      console.error("Ошибка в получении продукта:", error);
    } finally {
      setTimeout(()=>this.isLoading = false, 500)
    }
  };

  getRelatesProduct = async (
    idCategory: number,
    countItems: number,
    currentIdItem: number
  ) => {
    try {
      const relatesProducts = await this._relatesProducts.getProducts(
        idCategory,
        countItems,
        currentIdItem
      );
      runInAction(() => {
        this.relatesProducts = relatesProducts;
      });
    } catch (error) {
      console.error("Ошибка в получении рекомендуемых продуктов:", error);
    }
  };
}

export default new ProductStore(new RandomRelatesProducts());
