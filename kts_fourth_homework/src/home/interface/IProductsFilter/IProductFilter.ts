export interface IProductsFilter {
   title?: string;
   diapason?: {
     priceMin?: number;
     priceMax?: number;
   };
   categoriesIds?: number[];
   pagination?: IPaginable
 }

export interface IPaginable {
limit: number,
offset: number
}

 export interface IProductFilter {
  title?: string;
  diapason?: {
    priceMin?: number;
    priceMax?: number;
  };
  categoryId?: number;
}