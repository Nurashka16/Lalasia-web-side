import { makeAutoObservable, runInAction } from "mobx";
import { getProduct } from "../../product/api/getProduct";
import { IBasketProduct } from "../interface/IBasketProduct";

export interface IBasketProducts {
  id: number;
  count: number;
}

export interface IProductsSelectedPayment {
  data: IBasketProduct;
  isActive: boolean;
}
export interface IProductsCheckout {
  product: IBasketProduct;
  count: number;
  price: number;
}

class BasketStore {
  dataProductsBasket = new Map<number, number>(); //данные о количестве и айди продуктов(копятся извне)
  allProductsBasket: IProductsSelectedPayment[] = []; //Вся информация о продуктах в корзине
  selectedProductsPayment: IProductsCheckout[] = []; //продукты выбранные для оплаты
  isLoading: boolean = false;

  // Приватные свойства 
  private _countSelectedProducts: number = 0;
  private _totalPrice: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  /*Геттер для количества выбранных продуктов*/
  get countSelectedProducts() {
    return this._countSelectedProducts;
  }

  /*Геттер для общей цены*/
  get totalPrice() {
    return this._totalPrice;
  }

  /*Вызывается при входе в корзину*/
  getProducts = async () => {
    this.isLoading = true;
    this.allProductsBasket = [];
    try {
      const productIds = Array.from(this.dataProductsBasket.keys());
      const responses = await Promise.all(
        productIds.map((id) => getProduct(id.toString()))
      );

      runInAction(() => {
        this.allProductsBasket = responses.map((response) => ({
          data: response,
          isActive: true,
        }));
      });

      this.updateSelectedProductsValues();
      this.isLoading = false;
    } catch (error) {
      console.error("Ошибка в получении элементов для корзины", error);
      throw new Error("Ошибка в получении элементов для корзины");
    }
  };

  //рефакторинг
  updateProductsPayment = (product?: IBasketProduct) => {
    this.selectedProductsPayment = [];
    if (product) {
      this.selectedProductsPayment.push({
        count: this.dataProductsBasket.get(product.id)!,
        price: product.price,
        product: product,
      });
    } else {
      const products = this.allProductsBasket.filter(
        (product) => product.isActive == true
      );
      products.forEach((product) => {
        this.selectedProductsPayment.push({
          count: this.dataProductsBasket.get(product.data.id)!,
          price: product.data.price,
          product: product.data,
        });
      });
    }
    // this.selectedProductsPayment.push(...products);
  };
  /*Добавляет извне продукты в корзину*/
  addProduct = (product: IBasketProducts) => {
    const currentCount = this.dataProductsBasket.get(product.id) || 0;
    this.dataProductsBasket.set(product.id, currentCount + product.count);
  };

  /*Обновляет количество нужных значений*/
  updateSelectedProductsValues = () => {
    this._countSelectedProducts = this.calculateSelectedProductsValue(
      (count) => count
    );
    this._totalPrice = this.calculateSelectedProductsValue(
      (count, price) => count * price
    );
  };

  /*Метод для подсчета количества значений*/
  calculateSelectedProductsValue = (
    callback: (count: number, price: number) => number
  ) => {
    const products: IProductsSelectedPayment[] = this.allProductsBasket;
    let total = 0;
    products.forEach((product) => {
      if (product.isActive) {
        const count = this.dataProductsBasket.get(product.data.id);
        if (count !== undefined) {
          total += callback(count, product.data.price);
        }
      }
    });
    return total;
  };

  /*Удалить продукт*/
  deleteProduct = (id: number) => {
    this.dataProductsBasket.delete(id);
    this.allProductsBasket = this.allProductsBasket.filter(
      (product) => product.data.id !== id
    );
    this.updateSelectedProductsValues();
  };

  /*Обновить количество продукта*/
  updateCountProduct = (count: number, id: number) => {
    this.dataProductsBasket.set(id, count);
    this.updateSelectedProductsValues();
  };

  /*из продуктов корзины выбрать или убрать продукт для оплаты*/
  toggleSelectedProduct = (id: number, isActive: boolean) => {
    const product = this.allProductsBasket.find(
      (product) => product.data.id === id
    );
    if (product) {
      product.isActive = isActive;
      this.updateSelectedProductsValues();
    }
  };
}

export default new BasketStore();
