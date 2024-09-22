
import axios from "axios";
import { Product } from "../store/product-store";

export const getAllProducts = async () =>
  (await axios.get<Product[]>("https://api.escuelajs.co/api/v1/products")).data;
