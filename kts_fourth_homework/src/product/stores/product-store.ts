import { makeAutoObservable, runInAction } from "mobx";
import { getProduct } from "../api/getProduct";
import { IProduct } from "../interface/IProduct";
import {
  IRelatesProducts,
  RandomRelatesProducts,
} from "src/common/api/RandomRelatesProducts";

class ProductStore {
  private readonly _relatesProducts: IRelatesProducts;

  product: IProduct | undefined = undefined;
  relatesProducts: IProduct[] = [];
  constructor(relatesProducts: IRelatesProducts) {
    this._relatesProducts = relatesProducts;
    makeAutoObservable(this);
  }

  getProductAction = async (id: string) => {
    try {
      const response = await getProduct(id);
      runInAction(() => {
        this.product = response;
        this.getRelatesProduct(this.product.category.id, 3, this.product.id);
      });
    } catch {
      throw new Error("Ошибка в получении продукта");
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
    } catch {
      throw new Error("Ошибка в получении похожих продуктов");
    }
  };
}
export default new ProductStore(new RandomRelatesProducts());
