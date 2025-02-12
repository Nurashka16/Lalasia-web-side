import { search } from "src/home/api/search";
import { IProduct } from "src/product/interface/IProduct";

export interface IRelatesProducts {
  getProducts: (
    id: number,
    countItems: number,
    currentIdItem: number
  ) => Promise<IProduct[]>;
}

export class RandomRelatesProducts implements IRelatesProducts {
  public async getProducts(
    idCategory: number,
    countItems: number,
    currentIdItem: number
  ) {
    const response = await search({ categoryIds: [idCategory] });
    const arrProductsIds = response
      .map((category) => {
        if (response.length < countItems) {
          return category.id;
        } else if (category.id !== currentIdItem) {
          return category.id;
        }
      })
      .filter((id) => id !== undefined); //хз

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

  private getRandomElements(arr: number[], countElem: number) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, countElem);
  }
}
