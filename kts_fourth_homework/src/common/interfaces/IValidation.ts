interface IValidation<T> {
  rules?: IRule<T>[];
  setIsValid?: (value: boolean) => void;
  classNameError?:string
}
interface IRule<T> {
  errorMessage: string;
  validate: (value: T) => boolean;
}
