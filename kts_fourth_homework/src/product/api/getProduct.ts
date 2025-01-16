import axios from "axios";
import { IProduct } from "../interface/IProduct";

export type IProductResponse = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
};

export const getProduct = async (id: string) => {
  const response = (
    await axios.get<IProductResponse>(
      "https://api.escuelajs.co/api/v1/products/" + id
    )
  ).data;

  const result: IProduct = {
    id: response.id,
    title: response.title,
    price: response.price,
    description: response.description,
    images: response.images,
    category: {
      id: response.category.id,
      name: response.category.name,
      image: response.category.image,
    },
  };
  return result;
};
