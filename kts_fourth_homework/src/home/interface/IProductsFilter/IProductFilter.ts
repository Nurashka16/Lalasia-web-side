export interface IProductsFilter {
   title?: string;
   price?: number;
   diapason?: {
     priceMin?: number;
     priceMax?: number;
   };
   categoryIds?: number[];
 }
