// export type Option = {
//   /** Ключ варианта, используется для отправки на бек/использования в коде */
//   key: string;
//   /** Значение варианта, отображается пользователю */
//   value: string;

// };
interface IEquatable<T> {
  isEqual: (obj: T) => boolean;
}
export class Option<TKey> implements IEquatable<Option<TKey>> {
  public readonly key: TKey;
  public readonly value: string;

  constructor(key: TKey, value: string) {
    this.key = key;
    this.value = value;
  }

  isEqual(obj: Option<TKey>) {
    return this.key == obj.key && this.value == obj.value;
  }
}
