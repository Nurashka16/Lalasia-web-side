
import axios from "axios";
import { Product } from "../store/product-store";
import { IProductsFilter } from "../store/products-store";

export interface IProductsFilterRequest {
  title?: string;
  price?: number;
  diapason?: {
    price_min?: number;
    price_max?: number;
  };
  categoryId?: number;
}


export const searchProducts = async (data:IProductsFilterRequest) =>
  (
    await axios.get<Product[]>(
      `https://api.escuelajs.co/api/v1/products/?title=${data.title}`
    )
  ).data;
