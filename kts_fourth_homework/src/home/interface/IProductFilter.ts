export interface IProductsFilter {
   title?: string;
   diapason?: {
     priceMin?: number;
     priceMax?: number;
   };
   categoryIds?: number[];
   pagination?: IPaginable
 }

export interface IPaginable {
limit: number,
offset: number
}