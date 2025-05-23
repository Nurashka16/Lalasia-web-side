import { IProduct } from "src/product/interface/IProduct";
import * as ProductsApi from "../../home/api/ProductsApi";

export interface IRelatesProducts {
  getProducts: (
    id: number,
    countItems: number,
    currentIdItem: number
  ) => Promise<IProduct[]>;
}
/**
 * Возвращает рандомные продукты
 */
export class RandomRelatesProducts implements IRelatesProducts {
  private getRandomElements(arr: number[], countElem: number) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, countElem);
  }

  public async getProducts(
    idCategory: number,
    countItems: number,
    currentIdItem: number
  ) {
    const response = await ProductsApi.search({ categoryIds: [idCategory] });
    const arrProductsIds = response
      .map((category) => {
        if (response.length < countItems) {
          return category.id;
        } else if (category.id !== currentIdItem) {
          return category.id;
        }
      })
      .filter((id) => id !== undefined);

    const randomProductsIds = this.getRandomElements(
      arrProductsIds,
      countItems
    );
    const relatesProducts = response.filter((category) =>
      randomProductsIds.includes(category.id)
    );
    return relatesProducts.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        images: product.images,
        category: {
          id: product.category.id,
          name: product.category.name,
          image: product.category.image,
        },
      };
    });
  }
}
