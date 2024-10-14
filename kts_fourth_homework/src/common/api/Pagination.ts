export class Pagination {
   private _limitPage: number;
 
   public numberAllProducts: number = 0;
   public currentPage: number = 1;
 
   constructor(limitPage: number) {
     this._limitPage = limitPage;
   }
 
   get limitPage(): number {
     return this._limitPage;
   }
 
   getStartIndex(): number {
     return (this.currentPage - 1) * this._limitPage;
   }
   getEndIndex(): number {
     return this.limitPage * this.currentPage;
   }
 }