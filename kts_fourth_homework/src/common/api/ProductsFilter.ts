import { makeAutoObservable, runInAction } from "mobx";
import { IDiapason } from "src/home/interface/IDiapason";
import { Option } from "../MultiDropDown/interface/Option";
import { SortType } from "src/home/interface/SortType";

export class ProductsFilter {
  private readonly _options: Option<SortType>[];

  selectedCategories: Option<string>[] = [];
  selectedTypeSort: Option<SortType>;
  diapason: IDiapason = { max: 1000, min: 0 };
  searchValue: string = "";

  constructor(options: Option<SortType>[]) {
    if (options.length == 0) {
      throw new Error("Options не должен быть пустым");
    }
    this._options = options;

    this.selectedTypeSort = this._options[0];
    // this._defaultOption = this.selectedSort;
    makeAutoObservable(this);
  }

  //получить извне приватные варианты сортировки
  get getOptions() {
    return [...this._options];
  }
  get isChangeFilters() {
    return (
      this.searchValue ||
      this.selectedCategories.length > 0 ||
      this.diapason.max < 1000 ||
      this.diapason.min > 0
    );
  }
  // this.selectedSort
  // Метод для работы с сортировкой

  setSelectedSort = (sort: Option<SortType>) => {
    this.selectedTypeSort = sort;
  };

  // Метод для работы с категориями

  toggleCategory = (clickedCategory: Option<string>) => {
    runInAction(() => {
      const selectedCategoriesIds = this.selectedCategories.map(
        (selectedCategory) => selectedCategory.key
      );

      if (selectedCategoriesIds.includes(clickedCategory.key)) {
        this.selectedCategories = this.selectedCategories.filter(
          (selectedCategory) => selectedCategory.key !== clickedCategory.key
        );
      } else {
        this.selectedCategories = [...this.selectedCategories, clickedCategory];
      }
    });
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
    this.selectedTypeSort = this._options[0];
  }
}
