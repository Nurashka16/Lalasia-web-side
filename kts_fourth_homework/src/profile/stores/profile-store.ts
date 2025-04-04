import { makeAutoObservable } from "mobx";
import { IProductPayment } from "src/goCheckout/stores/payment-store";

interface Order {
  products: IProductPayment[];
  dateDelivery: string;
  totalCount: string;
  address: string;
  paymentType: string;
}

class ProfileStore {
  completedOrder: Order[] = [];
  isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  addOrder = (order: Order) => {
    this.completedOrder.push(order);
  };
}

export default new ProfileStore();
