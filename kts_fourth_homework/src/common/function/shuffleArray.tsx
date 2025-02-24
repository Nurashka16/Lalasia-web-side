import { IProduct } from "src/product/interface/IProduct";

export const shuffleArray = (arr: IProduct[]): IProduct[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }
  return copy;
};
