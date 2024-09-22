import axios from "axios";
import { Product } from "../../store/product-store";

export const getProductsCategories = async (id:number) =>
  (
    await axios.get<Product[]>(
      `https://api.escuelajs.co/api/v1/categories/${id}/products`
    )
  ).data;
