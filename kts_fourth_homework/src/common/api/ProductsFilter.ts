import { makeAutoObservable } from "mobx";
import { IDiapason } from "../../home/interface/IDiapason";

export class ProductsFilter {
  public categoryIds: number[] = [];
  public diapason: IDiapason = { max: 1000, min: 0 };
  public title: string = "";

  public clear(): void {
    this.categoryIds = [];
    this.diapason = { max: 1000, min: 0 };
    this.title = "";
  }
  public setCategoryIds(id: number): void {
    if (this.categoryIds.includes(id)) {
      this.categoryIds = this.categoryIds.filter((category) => category !== id);
    } else {
      this.categoryIds.push(id);
    }
  }
  public clearAllCategory():void {
    this.categoryIds =[]
  }
  public setDiapason(data: IDiapason): void {
    this.diapason = data;
  }
  public setTitle = (value: string) => {
    this.title = value;
  };
}
