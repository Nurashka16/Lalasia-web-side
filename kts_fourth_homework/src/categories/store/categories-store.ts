import { makeAutoObservable, runInAction } from "mobx";
import { getCategories } from "../api/getCategories";
import { ICategory } from "../interface/ICategory";

class CategoriesStore {
  allCategories: ICategory[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  getCategories = async () => {
    try {
      const response = await getCategories();
      runInAction(() => {
        this.allCategories = response;
      });
    } catch {
      throw new Error("Ошибка в получении категорий");
    }
  };
}
export default new CategoriesStore();
