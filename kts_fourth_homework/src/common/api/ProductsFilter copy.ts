import { IDiapason } from "src/home/interface/IDiapason";

//переписать selected на set
export class ProductsFilter {
  public selectedFilterIds = new Set();
  public diapason: IDiapason = { max: 1000, min: 0 };
  public title: string = "";

  public clearAllFilters(): void {
    this.selectedFilterIds.clear();
    this.diapason = { max: 1000, min: 0 };
    this.title = "";
  }
  public toggleCategory(id: number): void {
    if (this.selectedFilterIds.has(id)) {
      this.selectedFilterIds.delete(id);
    } else {
      this.selectedFilterIds.add(id);
    }
  }
  public clearAllCategories(): void {
    this.selectedFilterIds.clear();
  }
  public setDiapason(data: IDiapason): void {
    this.diapason = data;
  }
  public setTitle = (value: string) => {
    this.title = value;
  };
}
