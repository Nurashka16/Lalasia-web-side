import { makeAutoObservable, runInAction } from "mobx";
import { getCategories } from "../api/getCategories";
import { ICategory } from "../interface/ICategory";

class CategoriesStore {
  categoriesData: ICategory[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  getCategories = async () => {
    try {
      const response = await getCategories();
      runInAction(() => {
        this.categoriesData =
          response.length > 5 ? response.slice(0, 5) : response;
        // console.log(response);
      });
    } catch {
      throw new Error("Ошибка в получении категорий");
    }
  };
}
export default new CategoriesStore();
