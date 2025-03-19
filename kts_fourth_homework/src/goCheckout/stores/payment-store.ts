import { makeAutoObservable, runInAction } from "mobx";
import { IProduct } from "src/product/interface/IProduct";

export interface IProductBasket extends IProduct {
  isSelected: boolean;
}
export interface IProductPayment extends IProduct {
  count: number;
}

class PaymentStore {
  selectedProductsPayment: IProductPayment[] = []; //продукты выбранные для оплаты *убрать в другой store
  isLoading: boolean = false;

  // Приватные свойства
  private _countSelectedProducts: number = 0;
  private _sumSelectedProducts: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  /*Геттер о количестве выбранных продуктов*/
  get countSelectedProducts() {
    return this._countSelectedProducts;
  }
  /*Геттер о сумме выбранных продуктов*/
  get sumSelectedProducts() {
    return this._sumSelectedProducts;
  }


  //при нажатии на кнопку "быстрой покупки" или в момент оформления
  updateProductsPayment = (product: IProduct extends IProductPayment| IProduct[]) => {
    // Проверяем, является ли product массивом
    if (Array.isArray(product)) {
      // Обработка массива продуктов
      this.selectedProductsPayment({...product, })
    } else {

    }
  };
//   updateProductsPayment = (product: IProduct | products: IProduct[]) => {
//     if (product) {
//       this.selectedProductsPayment = [];
//       this.selectedProductsPayment.push({
//         count: this.productIdsWithCounts.get(product.id)!,
//         ...product,
//       });
//     } else {
//       this.allProductsBasket.forEach((product) => {
//         if (product.isSelected) {
//           this.selectedProductsPayment.push({
//             count: this.productIdsWithCounts.get(product.id)!,
//             ...product,
//           });
//         }
//       });
//     }
//   };

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
}

export default new PaymentStore();
