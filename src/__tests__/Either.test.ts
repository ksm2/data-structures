import { Either } from "../Either";

describe("Either", () => {
  let left: Either<number, string>;
  let right: Either<number, string>;

  beforeEach(() => {
    left = Either.left(42);
    right = Either.right("hello");
  });

  test("isLeft", () => {
    expect(left.isLeft()).toBe(true);
    expect(right.isLeft()).toBe(false);
  });

  test("isRight", () => {
    expect(left.isRight()).toBe(false);
    expect(right.isRight()).toBe(true);
  });

  test("equals", () => {
    expect(left.equals(undefined)).toBe(false);
    expect(right.equals(undefined)).toBe(false);
    expect(left.equals(left)).toBe(true);
    expect(right.equals(right)).toBe(true);
    expect(left.equals(Either.left(42))).toBe(true);
    expect(left.equals(Either.left(1337))).toBe(false);
    expect(right.equals(Either.right("hello"))).toBe(true);
    expect(right.equals(Either.right("world"))).toBe(false);
  });
});
