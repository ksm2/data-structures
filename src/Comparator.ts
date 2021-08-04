export interface Comparable {
  compareTo(other: this): number;
}

type ComparableValue = string | number | boolean | Date | Comparable;

export class Comparator<T> {
  private readonly comparer: (one: T, two: T) => number;

  private constructor(comparer: (one: T, two: T) => number) {
    this.comparer = comparer;
  }

  static naturalOrder<T extends ComparableValue>(): Comparator<T> {
    return new Comparator<T>((one, two) => {
      return Comparator.compare(one, two);
    });
  }

  static reverseOrder<T extends ComparableValue>(): Comparator<T> {
    return new Comparator<T>((one, two) => {
      return Comparator.negate(Comparator.compare(one, two));
    });
  }

  static comparing<T, U extends ComparableValue>(keyExtractor: (value: T) => U): Comparator<T> {
    return new Comparator<T>((one, two) => Comparator.compare(keyExtractor(one), keyExtractor(two)));
  }

  private static compare<T extends ComparableValue>(one: T, two: T): number {
    if (typeof one === "string" || typeof one === "number" || typeof one === "boolean" || one instanceof Date) {
      return one < two ? -1 : one > two ? 1 : 0;
    }

    return one.compareTo(two as Comparable);
  }

  private static negate(value: number): number {
    return Object.is(value, 0) ? 0 : -value;
  }

  compare(one: T, two: T): number {
    return this.comparer(one, two);
  }

  reversed(): Comparator<T> {
    return new Comparator<T>((one, two) => {
      return Comparator.negate(this.compare(one, two));
    });
  }

  thenComparing<U extends ComparableValue>(other: Comparator<T> | ((value: T) => U)): Comparator<T> {
    const comparer = this.comparer;
    return new Comparator<T>((one, two) => {
      const value = comparer(one, two);

      if (!Object.is(value, 0)) {
        return value;
      }

      if (other instanceof Comparator) {
        return other.compare(one, two);
      }

      return Comparator.compare(other(one), other(two));
    });
  }
}
