interface IInnerSearchProductsRequest {
    title?: string;
    diapason?: {
      priceMin: number;
      priceMax: number;
    };
    categoryId?: number;
  }