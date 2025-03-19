import axios from "axios";
import { IProduct } from "../interface/IProduct";

export type IProductResponse = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
};

export const getProduct = async (id:number) => {
  const response = (
    await axios.get<IProductResponse>(
      "https://api.escuelajs.co/api/v1/products/" + id.toString()
    )
  ).data;
  const result: IProduct = {
    id: response.id,
    title: response.title,
    price: response.price,
    description: response.description,
      //Возвращается неправильный массив картинок c лишними символами
    images: response.images.map((img) => img.replace(/["\[\]]/g, "")),
    category: {
      id: response.category.id,
      name: response.category.name,
      image: response.category.image,
    },
  };
  return result;
};
