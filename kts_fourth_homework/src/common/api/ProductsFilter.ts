import {
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";
import { IDiapason } from "src/home/interface/IDiapason";


class ProductsFilter {
  selectedFilterIds = observable.set<number>();
  diapason: IDiapason = { max: 1000, min: 0 };
  title: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  toggleCategory = (id: number) => {
    runInAction(() => {
      if (this.selectedFilterIds.has(id)) {
        this.selectedFilterIds.delete(id);
      } else {
        this.selectedFilterIds.add(id);
      }
      this.selectedFilterIds = observable.set([...this.selectedFilterIds])
      
    });
  };
  clearAllFilters = () => {
    this.selectedFilterIds.clear();
    this.diapason = { max: 1000, min: 0 };
    this.title = "";
  };
  setDiapason(data: IDiapason): void {
    this.diapason = data;
  }
  setTitle = (value: string) => {
    this.title = value;
  };
}
export default new ProductsFilter();
