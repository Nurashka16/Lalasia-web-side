import { makeAutoObservable, runInAction } from "mobx";
import { getCategories } from "../api/getCategories";
import { ICategory } from "../interface/ICategory";

class CategoriesStore {
  allCategories: ICategory[] = [];
  isLoading: boolean = false;
  
  
  constructor() {
    makeAutoObservable(this);
  }
  getCategories = async () => {
    this.isLoading=true
    try {
      const response = await getCategories();
      runInAction(() => {
        this.allCategories = response;
        setTimeout(()=> this.isLoading=false, 500)
      });
    } catch {
      throw new Error("Ошибка в получении категорий");
    }
  };
}
export default new CategoriesStore();
