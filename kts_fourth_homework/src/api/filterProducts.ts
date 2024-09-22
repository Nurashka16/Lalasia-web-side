import axios from "axios";
import { Product } from "./getProduct";

export const filterProducts = async (value: string) =>
  (
    await axios.get<Product[]>(
      `https://api.escuelajs.co/api/v1/products/?title=${value}`
    )
  ).data;
