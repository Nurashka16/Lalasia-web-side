import axios from "axios";
import { ParamQueryCollection } from "../../common/api/ParamQueryCollection";

export interface ISearchProductsRequest {
  title?: string;
  diapason?: {
    priceMin: number;
    priceMax: number;
  };
  categoryId?: number;
}

export const search = async (data: ISearchProductsRequest) => {
  const params = new ParamQueryCollection();
  params.set("title", data.title);
  params.set("price_min", data.diapason?.priceMin?.toString());
  params.set("price_max", data.diapason?.priceMax?.toString());
  params.set("categoryId", data.categoryId?.toString());
  return (
    await axios.get<any>(
      `https://api.escuelajs.co/api/v1/products/${params.createParamQuery()}`
    )
  ).data;
};
