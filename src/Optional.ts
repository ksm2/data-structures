export class Optional<T> {
  static readonly #EMPTY = new Optional<never>();

  readonly #value: T | undefined;

  constructor(value?: T) {
    this.#value = value;
  }

  static empty<T>(): Optional<T> {
    return Optional.#EMPTY;
  }

  static ofNullable<T>(value: T | undefined | null): Optional<T> {
    if (value == null) {
      return Optional.empty();
    } else {
      return Optional.of(value);
    }
  }

  static of<T>(value: T): Optional<T> {
    return new Optional<T>(value);
  }

  get empty(): boolean {
    return this.#value === undefined;
  }

  get present(): boolean {
    return this.#value !== undefined;
  }

  get(): T {
    if (this.#value === undefined) {
      throw new RangeError("No value present");
    } else {
      return this.#value;
    }
  }

  or(alternative: () => Optional<T>): Optional<T> {
    if (this.#value === undefined) {
      return alternative();
    } else {
      return this;
    }
  }

  orElse(value: T): T {
    return this.#value ?? value;
  }

  orElseGet(valueProducer: () => T): T {
    return this.#value ?? valueProducer();
  }

  orElseThrow(errorProducer: () => Error): T {
    if (this.#value === undefined) {
      throw errorProducer();
    } else {
      return this.#value;
    }
  }

  filter<U extends T>(predicate: (value: T) => value is U): Optional<U>;
  filter(predicate: (value: T) => boolean): Optional<T>;
  filter(predicate: (value: T) => boolean): Optional<T> {
    if (this.#value !== undefined && predicate(this.#value)) {
      return Optional.of(this.#value);
    }

    return Optional.empty();
  }

  map<U>(fn: (value: T) => U): Optional<U> {
    if (this.#value === undefined) {
      return Optional.empty();
    }

    return Optional.of(fn(this.#value));
  }

  flatMap<U>(fn: (value: T) => Optional<U>): Optional<U> {
    if (this.#value === undefined) {
      return Optional.empty();
    }

    return fn(this.#value);
  }

  toString(): string {
    return this.#value === undefined ? "Optional.empty" : `Optional[${this.#value}]`;
  }
}
