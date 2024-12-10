import { makeAutoObservable } from "mobx";
import { IDiapason } from "../../home/interface/IDiapason";
import { Option } from "../components/MultiDropdown";

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
    // if (!this.selectedFilterIds.length) {
    //   this.selectedFilterIds = [item];
    // } else {
    //   const ids = this.selectedFilterIds.map((category) => {
    //     return category.key;
    //   });
    //   const set = new Set(ids);
    //   if (set.has(item.key)) {
    //     this.selectedFilterIds = this.selectedFilterIds.filter((category) => {
    //       return category.key !== item.key;
    //     });
    //   } else {
    //     this.selectedFilterIds = this.selectedFilterIds.concat(item);
    //   }
    // }
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
