import { makeAutoObservable, runInAction } from "mobx";
import { IDiapason } from "src/home/interface/IDiapason";
import { Option } from "../MultiDropDown/interface/Option";
import { action } from "mobx";

export class ProductsFilter {
  private readonly _options: Option[];

  selectedCategories: Option[] = [];
  selectedSort: Option;
  diapason: IDiapason = { max: 1000, min: 0 };
  searchValue: string = "";

  constructor(options: Option[]) {
    if (options.length == 0) {
      throw new Error("Options не должен быть пустым");
    }
    this._options = options;
    this.selectedSort = this._options[0];
    makeAutoObservable(this);
  }

  //получить извне приватные варианты сортировки
  get getOptions() {
    return [...this._options];
  }

  // Метод для работы с сортировкой

  setSelectedSort = (sort: Option) => {
    this.selectedSort = sort;
  };

  // Метод для работы с категориями

  toggleCategory = (clickedCategory: Option) => {
    const selectedCategoriesIds = this.selectedCategories.map(
      (selectedCategory) => {
        return selectedCategory.key;
      }
    );
    if (selectedCategoriesIds.includes(clickedCategory.key)) {
      this.selectedCategories = this.selectedCategories.filter(
        (selectedCategory) => {
          return selectedCategory.key !== clickedCategory.key;
        }
      );
    } else {
      this.selectedCategories.push(clickedCategory);
    }
  };

  // Метод для работы с диапазоном

  setDiapason(data: IDiapason): void {
    if (data.min < 0 || data.max > 1000 || data.min > data.max) {
      throw new Error(
        "Диапазон невалиден. Убедитесь, что min >= 0 и max <= 1000."
      );
    }
    this.diapason = data;
  }

  // Метод для работы с поисковиком
  setSearchValue(value: string) {
    this.searchValue = value;
  }

  // Метод для очистки фильтров
  clearAllFilters() {
    this.selectedCategories = [];
    this.diapason = { max: 1000, min: 0 };
    this.searchValue = "";
    this.selectedSort = this._options[0];
  }
}
