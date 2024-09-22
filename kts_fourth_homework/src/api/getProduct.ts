import axios from "axios";
import { Product } from "../store/products-store";



export const getProduct = async (id:string) =>
  (
    await axios.get<Product>(
      "https://api.escuelajs.co/api/v1/products/"+id
    )
  ).data;
