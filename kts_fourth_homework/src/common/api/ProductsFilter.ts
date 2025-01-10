import { makeAutoObservable } from "mobx";
import { IDiapason } from "../../home/interface/IDiapason";

//переписать selected на map
export class ProductsFilter {
  public selectedFilterIds: number[] = [];
  public diapason: IDiapason = { max: 1000, min: 0 };
  public title: string = "";

  public clear(): void {
    this.selectedFilterIds = [];
    this.diapason = { max: 1000, min: 0 };
    this.title = "";
  }
  public setCategory(id: number): void {
    if (this.selectedFilterIds.includes(id)) {
      this.selectedFilterIds = this.selectedFilterIds.filter((selectedId) => {
        return selectedId !== id;
      });
    } else {
      this.selectedFilterIds = this.selectedFilterIds.concat(id)
    }
  }
  public clearAllCategory(): void {
    this.selectedFilterIds = [];
  }
  public setDiapason(data: IDiapason): void {
    this.diapason = data;
  }
  public setTitle = (value: string) => {
    this.title = value;
  };
}
