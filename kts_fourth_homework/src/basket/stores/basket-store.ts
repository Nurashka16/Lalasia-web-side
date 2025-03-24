import { makeAutoObservable, runInAction } from "mobx";
import { getProduct } from "../../product/api/getProduct";
import { IProduct } from "src/product/interface/IProduct";
import { getCalculateValues } from "src/common/function/getCalculateValues";

export interface IProductBasket extends IProduct {
  isSelected: boolean;
  count: number;
}

class BasketStore {
  productIdsWithCounts = new Map<number, number>(); //данные о айди продуктов и его количестве(копятся извне)
  allProductsBasket: IProductBasket[] = []; //Вся информация о продуктах в корзине
  isLoading: boolean = false;

  // Приватные свойства
  private _countSelectedProducts: number = 0;
  private _sumSelectedProducts: number = 0;
  private _countAllProducts: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  /*Геттер о количестве выбранных продуктов*/
  get countSelectedProducts() {
    return this._countSelectedProducts;
  }
  /*Геттер о количестве всех продуктов*/
  get countAllProducts() {
    return this._countAllProducts;
  }
  /*Геттер о сумме выбранных продуктов*/
  get sumSelectedProducts() {
    return this._sumSelectedProducts;
  }

  /*Вызывается при входе в корзину*/
  getProducts = async () => {
    this.isLoading = true;
    this.allProductsBasket = [];

    try {
      const productIds = Array.from(this.productIdsWithCounts.keys());
      const responses = await Promise.all(
        productIds.map((id) => getProduct(id))
      );

      runInAction(() => {
        this.allProductsBasket = responses.map((response) => ({
          ...response,
          count: this.productIdsWithCounts.get(response.id) || 1,
          isSelected: true,
        }));
      });

      this.updateSelectedProductsValues();
    } catch {
      throw new Error("Ошибка в получении элементов для корзины");
    } finally {
      this.isLoading = false;
    }
  };

  /*Добавляет извне продукты в корзину*/
  addProduct = (id: number, count = 1) => {
    const currentCount = this.productIdsWithCounts.get(id) || 0;
    this.productIdsWithCounts.set(id, currentCount + count);
    this._countAllProducts = this.allProductsBasket.length;
  };

  /*Обновляет количество нужных значений*/
  updateSelectedProductsValues = () => {
    const results = getCalculateValues(this.allProductsBasket);
    this._countSelectedProducts = results.totalCount;
    this._sumSelectedProducts = results.totalSum;
  };

  /*Удалить продукт*/
  deleteProduct = (id: number) => {
    this.productIdsWithCounts.delete(id);
    this.allProductsBasket = this.allProductsBasket.filter(
      (product) => product.id !== id
    );
    this._countAllProducts = this.allProductsBasket.length;
    this.updateSelectedProductsValues();
  };

  /*Обновить количество продукта*/
  updateCountProduct = (count: number, id: number) => {
    this.productIdsWithCounts.set(id, count);
    this.allProductsBasket = this.allProductsBasket.map((product) => {
      if (product.id === id) {
        return { ...product, count };
      }
      return product;
    });

    this.updateSelectedProductsValues();
  };

  /*из продуктов корзины выбрать или убрать продукт для оплаты*/
  toggleSelectedProduct = (id: number, isSelected: boolean) => {
    const product = this.allProductsBasket.find((product) => product.id === id);
    if (product) {
      product.isSelected = isSelected;
      this.updateSelectedProductsValues();
    }
  };
}

export default new BasketStore();
