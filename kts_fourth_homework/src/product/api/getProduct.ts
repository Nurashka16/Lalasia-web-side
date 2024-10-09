import axios from "axios";
import { IProduct } from "../interface/IProduct";

export const getProduct = async (id: string) =>
  (await axios.get<IProduct>("https://api.escuelajs.co/api/v1/products/" + id))
    .data;
