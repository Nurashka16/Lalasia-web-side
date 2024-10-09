import axios from "axios";
import { ICategory } from "../../home/interface/ICategory";

export const getCategories = async () =>
  (await axios.get<ICategory[]>("https://api.escuelajs.co/api/v1/categories"))
    .data;
