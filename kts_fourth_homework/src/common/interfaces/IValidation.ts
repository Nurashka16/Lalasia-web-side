export  interface IValidation<T> {
  rules?: IRule<T>[];
  isValid:boolean;
  setIsValid?: (value: boolean) => void;
  classNameError?:string
}
export interface IRule<T> {
  errorMessage: string;
  validate: (value: T) => boolean;
}
