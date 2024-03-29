/**
 * A container object which contains a value that is either left or right.
 */
export class Either<L, R> {
  readonly #value: ["left", L] | ["right", R];

  private constructor(...value: ["left", L] | ["right", R]) {
    this.#value = value;
  }

  /**
   * Returns an `Either` describing the given left value.
   */
  static left<L>(value: L): Either<L, never> {
    return new Either<L, never>("left", value);
  }

  /**
   * Returns an `Either` describing the given right value.
   */
  static right<R>(value: R): Either<never, R> {
    return new Either<never, R>("right", value);
  }

  /**
   * If a value is left, returns the value, otherwise throws the right value.
   */
  get(): L {
    if (this.#value[0] === "left") {
      return this.#value[1];
    }

    throw this.#value[1];
  }

  /**
   * If a value is left, returns `true`, otherwise `false`.
   */
  isLeft(): boolean {
    return this.#value[0] === "left";
  }

  /**
   * If a value is right, returns `true`, otherwise `false`.
   */
  isRight(): boolean {
    return this.#value[0] === "right";
  }

  /**
   * If a value is left, performs the given left action with the value,
   * otherwise performs the given right action.
   */
  ifLeftOrRight(leftAction: (value: L) => void, rightAction: (value: R) => void): void {
    if (this.#value[0] === "left") {
      leftAction(this.#value[1]);
    } else {
      rightAction(this.#value[1]);
    }
  }

  /**
   * Indicates whether some other object is "equal to" this `Either`.
   */
  equals(other: unknown): other is Either<L, R> {
    if (this === other) {
      return true;
    }

    if (other instanceof Either) {
      return this.#value[0] === other.#value[0] && this.#value[1] === other.#value[1];
    }

    return false;
  }
}
