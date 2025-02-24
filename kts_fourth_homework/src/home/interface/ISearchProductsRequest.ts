export interface ISearchProductsRequest {
    title?: string;
    diapason?: {
      priceMin: number;
      priceMax: number;
    };
    categoryIds: number[];
  }