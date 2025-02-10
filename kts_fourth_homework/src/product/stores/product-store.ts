import { makeAutoObservable, runInAction } from "mobx";
import { getProduct } from "../api/getProduct";
import { IProduct } from "../interface/IProduct";

class ProductStore {
  product: IProduct | undefined = undefined;
  constructor() {
    makeAutoObservable(this);
  }

  getProductAction = async (id: string) => {
    try {
      const response = await getProduct(id);
      console.log(response.images[0]);
      
      runInAction(() => {
        this.product = response;
      });
    } catch {
      throw new Error("Ошибка в получении элементa");
    }
  };
}
export default new ProductStore();
