import { makeAutoObservable, runInAction, values } from "mobx";
import { getProduct } from "../../product/api/getProduct";
import { IProduct } from "../../product/interface/IProduct";
import { useLayoutEffect } from "react";

export interface IBasketProduct {
  id: number;
  count: number;
}

class BasketStore {
  productsData: IProduct[] = [];
  countAllProducts: number = 0;
  selectedProducts = new Map<number, number>();
  totalPrice: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addSelectedProducts = (product: IBasketProduct) => {
    let count = this.selectedProducts.get(product.id);
    if (!count) {
      this.selectedProducts.set(product.id, product.count);
    } else {
      this.selectedProducts.set(product.id, count + 1);
    }
    this.getTotalCount();
    // console.log(this.numberAllProducts);
  };
  getPrice = (products: IProduct[] = this.productsData) => {
    this.totalPrice = 0;
    products.map((product: IProduct) => {
      let count = this.selectedProducts.get(product.id)!; //count
      this.totalPrice += count * product.price;
    });
  };
  getTotalCount = (products: IProduct[] = this.productsData) => {
    this.countAllProducts = 0;
    for (const count of this.selectedProducts.values()) {
      // console.log(count);

      this.countAllProducts += count;
    }
  };
  getProductsBasket = async () => {
    this.productsData = [];
    try {
      for (const productIds of this.selectedProducts.keys()) {
        let response: IProduct = await getProduct(productIds.toString());
        runInAction(() => {
          // this.basket.push(response);
          this.getTotalCount();
          this.getPrice();
          this.productsData.push(response);
        });
      }
    } catch {
      throw new Error("Ошибка в получении элементов для корзины");
    }
  };
  deleteProduct = (id: number) => {
    this.selectedProducts.delete(id);
    this.productsData = this.productsData.filter(
      (product) => product.id !== id
    );
    this.getPrice();
    this.getTotalCount();
  };
  updateCountProduct = (count: number, id: number) => {
    this.selectedProducts.set(id, count);
    this.getPrice();
    this.getTotalCount();
    // console.log(this.selectedProducts.get(id));
  };
  toggleProduct = (id: number, toggle: boolean) => {
    const activeArr = this.productsData.filter((product) => product.id !== id);
  };
}
export default new BasketStore();
