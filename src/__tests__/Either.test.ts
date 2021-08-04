import { Either } from "../Either";

describe("Either", () => {
  let left: Either<number, string>;
  let right: Either<number, string>;

  const leftValue = 42;
  const rightValue = "hello";

  beforeEach(() => {
    left = Either.left(leftValue);
    right = Either.right(rightValue);
  });

  test("get", () => {
    expect(left.get()).toBe(leftValue);
    expect(() => right.get()).toThrow(rightValue);
  });

  test("isLeft", () => {
    expect(left.isLeft()).toBe(true);
    expect(right.isLeft()).toBe(false);
  });

  test("isRight", () => {
    expect(left.isRight()).toBe(false);
    expect(right.isRight()).toBe(true);
  });

  test("ifLeftOrRight", () => {
    const leftAction = jest.fn();
    const rightAction = jest.fn();

    left.ifLeftOrRight(leftAction, rightAction);
    expect(leftAction).toHaveBeenCalledWith(leftValue);
    expect(rightAction).not.toHaveBeenCalled();

    leftAction.mockClear();
    rightAction.mockClear();

    right.ifLeftOrRight(leftAction, rightAction);
    expect(leftAction).not.toHaveBeenCalled();
    expect(rightAction).toHaveBeenCalledWith(rightValue);
  });

  test("equals", () => {
    expect(left.equals(undefined)).toBe(false);
    expect(right.equals(undefined)).toBe(false);
    expect(left.equals(left)).toBe(true);
    expect(right.equals(right)).toBe(true);
    expect(left.equals(Either.left(leftValue))).toBe(true);
    expect(left.equals(Either.left(1337))).toBe(false);
    expect(right.equals(Either.right(rightValue))).toBe(true);
    expect(right.equals(Either.right("world"))).toBe(false);
  });
});
