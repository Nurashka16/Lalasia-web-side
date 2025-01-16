import { makeAutoObservable } from "mobx";

interface IOrderProducts {
  id: number;
  price: number;
  count: number;
}
interface ICoupon {
  name: string;
  discount: number;
}
class OrderStore {
  products: IOrderProducts[] = [];
  totalCost: number = 0;
  coupons: ICoupon[] = [
    { name: "1", discount: 10 },
    { name: "2", discount: 20 },
    { name: "3", discount: 30 },
  ];
  constructor() {
    makeAutoObservable(this);
  }
  getPrice = () => {
    this.totalCost = 0;
    this.products.forEach((product) => {
      this.totalCost += product.count * product.price;
    });
  };
  applyDiscount = (value: string) => {
    this.coupons.forEach((coupon) => {
      if (coupon.name == value) {
        console.log(this.totalCost - (this.totalCost / 100) * coupon.discount);
      }
    });
  };
}
export default new OrderStore();
