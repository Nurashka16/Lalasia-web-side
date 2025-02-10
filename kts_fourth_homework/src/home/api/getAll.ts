import axios from "axios";
import { IProduct } from "src/product/interface/IProduct";

export const getAll = async () => {
  const response = await axios.get<IProduct[]>(
    "https://api.escuelajs.co/api/v1/products"
  );
  //Возвращается неправильный массив картинок c лишними символами
  return response.data.map((product) => ({
    ...product,
    images: product.images.map((img) => img.replace(/["\[\]]/g, "")),
  }));
};
