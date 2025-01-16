import { makeAutoObservable, runInAction } from "mobx";
import { getProduct } from "../../product/api/getProduct";
import { IBasketProduct } from "../interface/IBasketProduct";

export interface IBasketProductsIdToCount {
  id: number;
  count: number;
}

export interface ISelectedProduct {
  data: IBasketProduct;
  isActive: boolean;
}

class BasketStore {
  basketProductsIdToCount = new Map<number, number>();
  selectedProducts: ISelectedProduct[] = [];
  countSelectedProducts: number = 0;
  totalPrice: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addProduct = (product: IBasketProductsIdToCount) => {
    const count = this.basketProductsIdToCount.get(product.id);
    if (!count) {
      this.basketProductsIdToCount.set(product.id, product.count);
    } else {
      this.basketProductsIdToCount.set(product.id, count + 1);
    }
  };

  getPriceSelectedProducts = () => {
    const products: ISelectedProduct[] = this.selectedProducts;
    this.totalPrice = 0;
    products.map((product: ISelectedProduct) => {
      if (product.isActive) {
        const count = this.basketProductsIdToCount.get(product.data.id)!;
        this.totalPrice += count * product.data.price;
      }
    });
  };

  getCountSelectedProducts = () => {
    const products: ISelectedProduct[] = this.selectedProducts;
    this.countSelectedProducts = 0;
    products.map((product) => {
      if (product.isActive) {
        const count = this.basketProductsIdToCount.get(product.data.id)!;
        this.countSelectedProducts += count;
      }
    });
  };

  /**
   * Вызывается при входе в корзину
   */
  getProducts = async () => {
    //из за плохого API мы перебираем по id и по одному получаем
    this.selectedProducts = [];
    try {
      for (const productIds of this.basketProductsIdToCount.keys()) {
        const response: IBasketProduct = await getProduct(
          productIds.toString()
        );
        runInAction(() => {
          this.selectedProducts.push({ data: response, isActive: true });
        });
      }
      this.getCountSelectedProducts();
      this.getPriceSelectedProducts();
    } catch {
      throw new Error("Ошибка в получении элементов для корзины");
    }
  };

  deleteProduct = (id: number) => {
    this.basketProductsIdToCount.delete(id);
    this.selectedProducts = this.selectedProducts.filter(
      (product) => product.data.id !== id
    );
    this.getCountSelectedProducts();
    this.getPriceSelectedProducts();
  };

  updateCountProduct = (count: number, id: number) => {
    this.basketProductsIdToCount.set(id, count);
    this.getCountSelectedProducts();
    this.getPriceSelectedProducts();
    // console.log(this.selectedProducts.get(id));
  };

  toggleSelectedProduct = (id: number, isActive: boolean) => {
    this.selectedProducts.forEach((product) => {
      if (product.data.id == id) {
        product.isActive = isActive;
        this.getCountSelectedProducts();
        this.getPriceSelectedProducts();
      }
    });
  };
}
export default new BasketStore();
