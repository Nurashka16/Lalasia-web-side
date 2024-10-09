import axios from "axios";
import { IProductFilter } from "../interface/IProductsFilter";
import { IProduct } from "../../product/interface/IProduct";


export const searchProducts = async (data: IProductFilter) =>
  (
    await axios.get<IProduct[]>(
      `https://api.escuelajs.co/api/v1/products/?title=${data.title}&price_min=
      ${data.diapason?.priceMin}&price_max=${data.diapason?.priceMax}&categoryId=${data.categoryId}`
    )
  ).data;
