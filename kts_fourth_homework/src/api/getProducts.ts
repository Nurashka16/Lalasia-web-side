import axios from "axios";
import { Product } from "../store/product-store";


export const getProducts = async (offset: number, limit: number) =>
  (
    await axios.get<Product[]>(
      `https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`
    )
  ).data;
