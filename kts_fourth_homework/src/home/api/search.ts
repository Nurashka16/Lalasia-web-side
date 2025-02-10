import axios from "axios";
import { ParamQueryCollection } from "src/common/api/ParamQueryCollection";
import { IProductResponse } from "src/product/api/getProduct";
import { IProduct } from "src/product/interface/IProduct";

export interface ISearchProductsRequest {
  title?: string;
  diapason?: {
    priceMin: number;
    priceMax: number;
  };
  categoryIds: number[];
}
interface IInnerSearchProductsRequest {
  title?: string;
  diapason?: {
    priceMin: number;
    priceMax: number;
  };
  categoryId?: number;
}

//Из за плохого api(невозможность отправлять несколько категорий id),
// приходится делать несколько запросов

export const search = async (
  request: ISearchProductsRequest
): Promise<IProductResponse[]> => {
  if (request.categoryIds.length) {
    return request.categoryIds
      .map(async (id) => {
        const innerRequest: IInnerSearchProductsRequest = {
          categoryId: id,
          diapason: request.diapason,
          title: request.title,
        };
        return await innerSearch(innerRequest);
      })
      .reduce((result, products) => {
        result.push(...products);
        return result;
      }, []); //flat()
  }
  return innerSearch({ diapason: request.diapason, title: request.title });
};

const innerSearch = async (data: IInnerSearchProductsRequest) => {
  const params = new ParamQueryCollection();
  params.set("title", data.title);
  params.set("price_min", data.diapason?.priceMin?.toString());
  params.set("price_max", data.diapason?.priceMax?.toString());
  params.set("categoryId", data.categoryId?.toString());
  const response = await axios.get<IProductResponse[]>(
    `https://api.escuelajs.co/api/v1/products/${params.createParamQuery()}`
  );
    //Возвращается неправильный массив картинок c лишними символами
  return response.data.map((product) => ({
    ...product,
    images: product.images.map((img) => img.replace(/["\[\]]/g, "")),
  }));
};
