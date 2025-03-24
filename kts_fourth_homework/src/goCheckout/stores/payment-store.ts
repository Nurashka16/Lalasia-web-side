import { makeAutoObservable } from "mobx";
import { getCalculateValues } from "src/common/function/getCalculateValues";
import { IProduct } from "src/product/interface/IProduct";

export interface IProductPayment extends IProduct {
  count: number;
}

class PaymentStore {
  productsPayment: IProductPayment[] = []; //продукты выбранные для оплаты
  isLoading: boolean = false;

  // Приватные свойства
  private _productsItemsCount: number = 0;
  private _sumProducts: number = 0;
  private _countAllProducts: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  /*Геттер о количестве выбранных продуктов*/
  get productsItemsCount() {
    return this._productsItemsCount;
  }
  /*Геттер о количестве всех продуктов*/
  get countAllProducts() {
    return this._countAllProducts;
  }
  /*Геттер о сумме выбранных продуктов*/
  get sumProducts() {
    return this._sumProducts;
  }

  //при нажатии на кнопку "быстрой покупки" или в момент оформления
  addProductsPayment = (product: IProductPayment[]) => {
    this.isLoading=true;
    this.productsPayment=[]
    this.productsPayment.push(...product);
    this.updateProductsValues();
    setTimeout(()=>this.isLoading=false, 1000)
  };

  addProductPayment = (product: IProductPayment) =>
    this.addProductsPayment([product]);

  /*Обновляет количество необходимых значений*/
  updateProductsValues = () => {
    const results = getCalculateValues(this.productsPayment);
    this._productsItemsCount = results.totalCount;
    this._sumProducts = results.totalSum;
  };
}

export default new PaymentStore();
