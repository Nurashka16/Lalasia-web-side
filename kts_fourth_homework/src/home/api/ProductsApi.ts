import { ISearchProductsRequest } from "../interface/ISearchProductsRequest";
import { IProductResponse } from "src/product/api/getProduct";
import { ParamQueryCollection } from "src/common/api/ParamQueryCollection";
import axios from "axios";
import { IProduct } from "src/product/interface/IProduct";


//Из за плохого api(невозможность отправлять несколько категорий id),
// приходится делать несколько запросов
export const search = async (
  request: ISearchProductsRequest
): Promise<IProductResponse[]> => {
  if (request.categoryIds.length) {
    const tasks = request.categoryIds.map(async (id) => {
      const innerRequest: IInnerSearchProductsRequest = {
        categoryId: id,
        diapason: request.diapason,
        title: request.title,
      };
      return await innerSearch(innerRequest);
    });

    return (await Promise.all(tasks)).flat();
  }
  return innerSearch({
    diapason: request.diapason,
    title: request.title,
  });
};

export const innerSearch = async (data: IInnerSearchProductsRequest) => {
  const params = new ParamQueryCollection();
  params.set("title", data.title);
  params.set("price_min", data.diapason?.priceMin?.toString());
  params.set("price_max", data.diapason?.priceMax?.toString());
  params.set("categoryId", data.categoryId?.toString());
  const response = await axios.get<IProductResponse[]>(
    `https://api.escuelajs.co/api/v1/products/${params.createParamQuery()}`
  );
  //Возвращается неправильный массив картинок c лишними символами
  return removeExtraCharacters(response.data);
};

export const getAll = async () => {
  const response = await axios.get<IProduct[]>(
    "https://api.escuelajs.co/api/v1/products"
  );
  //Возвращается неправильный массив картинок c лишними символами
  return removeExtraCharacters(response.data);
};

const removeExtraCharacters = (data: IProduct[]) => {
  return data.map((product) => ({
    ...product,
    images: product.images.map((img) => img.replace(/["\[\]]/g, "")),
  }));
};
