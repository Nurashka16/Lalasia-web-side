import { ICategory } from '../store/categories-store';
import axios from "axios";

export const getCategories = async () =>
  (await axios.get<ICategory[]>("https://api.escuelajs.co/api/v1/categories"))
    .data;
