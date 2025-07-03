import { makeAutoObservable } from "mobx";
import { getCalculateValues } from "src/common/function/getCalculateValues";
import { IProduct } from "src/product/interface/IProduct";

export type PaymentType = "Cash" | "Card" | "QR";

export interface IProductPayment extends IProduct {
  count: number;
}
export const coupons = [
  {
    name: "1",
    sale: "100$",
  },
  {
    name: "2",
    sale: "10%",
  },
];

class PaymentStore {
  productsPayment: IProductPayment[] = []; //продукты выбранные для оплаты
  isLoading: boolean = false;
  deliveryDate: string = "";
  deliveryAddress: string = "";
  paymentType: PaymentType | undefined = undefined;
  appliedCoupon: string | null = null; // Для отслеживания применённого купона
  couponError: string | null = null;
  selectedDeliveryPointId: number | null = null;
  // Для хранения сообщений об ошибках

  // Приватные свойства
  private _productsItemsCount: number = 0;
  private _sumProducts: number = 0;
  private _countAllProducts: number = 0;
  private _discountValue: number = 0;

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
  get discountValue() {
    return this._discountValue;
  }
  setDeliveryDate = (date: string) => {
    this.deliveryDate = date;
  };
  setDeliveryAddress = (value: string) => {
    this.deliveryAddress = value;
  };
  setPaymentType = (type: PaymentType) => {
    this.paymentType = type;
  };
  //при нажатии на кнопку "быстрой покупки" или в момент оформления
  addProductsPayment = (product: IProductPayment[]) => {
    this.isLoading = true;
    this.productsPayment = [];
    this.productsPayment.push(...product);
    this.updateProductsValues();
    setTimeout(() => (this.isLoading = false), 1000);
  };

  addProductPayment = (product: IProductPayment) =>
    this.addProductsPayment([product]);

  /*Обновляет количество необходимых значений*/
  updateProductsValues = () => {
    const results = getCalculateValues(this.productsPayment);
    this._productsItemsCount = results.totalCount;
    this._sumProducts = results.totalSum;
  };
    /*Применение купонов*/
  applyCoupon = (value: string) => {
    const coupon = coupons.find((c) => c.name === value);
    if (!coupon) {
      this.couponError = "Coupon not found";
      return;
    }
    if (this.appliedCoupon === coupon.name) {
      this.couponError = "The coupon has already been applied"; // Проверка на повторное применение
      return;
    }
    if (this.appliedCoupon) {
      this.updateProductsValues();
    }
    const discountValue = coupon.sale.endsWith("%")
      ? (this._sumProducts * parseFloat(coupon.sale)) / 100
      : parseFloat(coupon.sale.replace("$", ""));
    this._sumProducts - discountValue > 0
      ? (this._sumProducts -= discountValue)
      : (this._sumProducts = 0);
      // get = discountValue
      this._discountValue=discountValue;
    this.appliedCoupon = coupon.name;
    this.couponError = null;
  };

  // Метод для сброса купона
  resetCoupon = () => {
    this.appliedCoupon = null;
    this.couponError = null;
  };
}

export default new PaymentStore();
