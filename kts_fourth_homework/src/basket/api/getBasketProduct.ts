import axios from "axios";
import { IBasketProduct } from "../interface/IBasketProduct";
import { IProductResponse } from "../../product/api/getProduct";


export const getProduct = async (id: string) => {
  const response = (
    await axios.get<IProductResponse>(
      "https://api.escuelajs.co/api/v1/products/" + id
    )
  ).data;

  const result: IBasketProduct = {
    id: response.id,
    title: response.title,
    price: response.price,
    description: response.description,
    images: response.images,
  };
  return result;
};
