import { IRule } from "src/common/interfaces/IValidation";
import { search } from "./../../home/api/ProductsApi";

export class RuleBuilder<T> {
  private readonly _rules: IRule<T>[] = [];

  public required(errorMessage?: string): RuleBuilder<T> {
    this._rules.push({
      errorMessage: errorMessage ?? "value is required",
      validate: (value) => !!value,
    });
    return this;
  }

  public moreThen(otherValue: T, errorMessage?: string) {
    this._rules.push({
      errorMessage: errorMessage ?? "",
      validate: (value) => value > otherValue,
    });
  }

  public dateInFuture(errorMessage?: string): RuleBuilder<T> {
    this._rules.push({
      errorMessage: errorMessage ?? "Select a date from 1 day.",
      validate: (dateString: string) => {
        const date = new Date(dateString);
        return date > new Date();
      },
    });
    return this;
  }

  public dateWithinOneMonth(errorMessage?: string): RuleBuilder<T> {
    this._rules.push({
      errorMessage: errorMessage ?? "Select a date within one month.",
      validate: (dateString: string) => {
        const date = new Date(dateString);
        const oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
        return date <= oneMonthFromNow;
      },
    });
    return this;
  }
  public fieldIsNotEmpty(errorMessage?: string): RuleBuilder<T> {
    this._rules.push({
      errorMessage:
        errorMessage ?? "Address format should be: City Street Number.",
      validate: (value: string) => {
        const details = value.split(" ");
        return (
          details.length === 3 &&
          details.every((part) => part.trim() !== "") && // Проверка, что все части не пустые
          !isNaN(Number(details[2])) // Проверка, что третья часть - число
        );
      },
    });
    return this;
  }
  public custom(validate: (value: T) => boolean, errorMessage: string) {
    this._rules.push({
      errorMessage: errorMessage,
      validate: validate,
    });
    return this;
  }
  public build(): IRule<T>[] {
    return this._rules;
  }
}
