import { makeAutoObservable, runInAction } from "mobx";
import { getCategories } from "../api/getCategories";
// import { Option } from "../components/MultiDropdown";
import { ICategory } from "../interface/ICategory";
import { getProductsCategories } from "../api/getProductsCategory";
import { IProduct } from "../../product/interface/IProduct";
// import { Product, getProduct } from "../api/getProduct";

class CategoriesStore {
  categoriesData: ICategory[] = [];
  //   categories: Option[] = [];
  productsData: IProduct[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  setCategories = async () => {
    try {
      const response = await getCategories();
      runInAction(() => {
        this.categoriesData = response.length>5 ? response.slice(0,5) : response;
        // console.log(response);
      });
    } catch {
      throw new Error("Ошибка в получении категорий");
    }
  };
  setProductsSameCategories = async (id: number) => {
    try {
      const response = await getProductsCategories(id);
      runInAction(() => {
        this.productsData = response;
        //должно быть this.allProducts = response и т.п но как связать 2 разных не понятно
        console.log(this.productsData);
      });
    } catch {
      throw new Error("Ошибка в получении продуктов 1 категории");
    }
  };
}
export default new CategoriesStore();
