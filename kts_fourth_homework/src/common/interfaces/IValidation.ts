interface IValidation {
  rules?: IRule[];
  setIsValid?: (value: boolean) => void;
}
interface IRule {
  errorMessage: string;
  validate: (value: string) => boolean;
}
