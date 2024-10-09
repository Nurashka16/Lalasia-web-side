import axios from "axios";
import { IProduct } from "../../product/interface/IProduct";

export const getAll = async () =>
  (await axios.get<IProduct[]>("https://api.escuelajs.co/api/v1/products"))
    .data;
