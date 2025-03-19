import { makeAutoObservable, runInAction } from "mobx";
import { getProduct } from "../../product/api/getProduct";
import { IProduct } from "src/product/interface/IProduct";

export interface IProductBasket extends IProduct {
  isSelected: boolean;
}
export interface IProductPayment extends IProduct {
  count: number;
}

class BasketStore {
  productIdsWithCounts = new Map<number, number>(); //данные о айди продуктов и его количестве(копятся извне)
  allProductsBasket: IProductBasket[] = []; //Вся информация о продуктах в корзине
  selectedProductsPayment: IProductPayment[] = []; //продукты выбранные для оплаты *убрать в другой store
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
      
      // Используйте Promise.all для параллельного выполнения запросов
      const responses = await Promise.all(
        productIds.map((id) => getProduct(id))
      );
  
      runInAction(() => {
        this.allProductsBasket = responses.map((response) => ({
          ...response,
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
  

  //при нажатии на кнопку "быстрой покупки" или в момент оформления
  updateProductsPayment = (product?: IProduct) => {
    if (product) {
      this.selectedProductsPayment = [];
      this.selectedProductsPayment.push({
        count: this.productIdsWithCounts.get(product.id)!,
        ...product,
      });
    } else {
      this.allProductsBasket.forEach((product) => {
        if (product.isSelected) {
          this.selectedProductsPayment.push({
            count: this.productIdsWithCounts.get(product.id)!,
            ...product,
          });
        }
      });
    }
  };
  /*Добавляет извне продукты в корзину*/
  addProduct = (id: number, count = 1) => {
    const currentCount = this.productIdsWithCounts.get(id) || 0;
    this.productIdsWithCounts.set(id, currentCount + count);
  };

  /*Обновляет количество нужных значений*/
  updateSelectedProductsValues = () => {
    this._countSelectedProducts = this.calculateSelectedProductsValue(
      (count) => count
    );
    this._sumSelectedProducts = this.calculateSelectedProductsValue(
      (count, price) => count * price
    );
  };

  /*Метод для подсчета количества значений*/
  calculateSelectedProductsValue = (
    callback: (count: number, price: number) => number
  ) => {
    const products: IProductBasket[] = this.allProductsBasket;
    let total = 0;
    products.forEach((product) => {
      if (product.isSelected) {
        const count = this.productIdsWithCounts.get(product.id);
        if (count !== undefined) {
          total += callback(count, product.price);
        }
      }
    });
    return total;
  };

  /*Удалить продукт*/
  deleteProduct = (id: number) => {
    this.productIdsWithCounts.delete(id);
    this.allProductsBasket = this.allProductsBasket.filter(
      (product) => product.id !== id
    );
    this.updateSelectedProductsValues();
  };

  /*Обновить количество продукта*/
  updateCountProduct = (count: number, id: number) => {
    this.productIdsWithCounts.set(id, count);
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
