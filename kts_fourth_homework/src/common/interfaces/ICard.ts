export interface ICard {
   id: number;
   title: string;
   price: number;
   description: string;
   images: string[];
   category: {
     id: number;
     name: string;
     image: string;
   };
 }