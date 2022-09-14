import { jest } from "@jest/globals";
import { Optional } from "../Optional.js";

describe("Optional", () => {
  const presentValue = 42;
  let empty: Optional<number>;
  let present: Optional<number>;

  beforeEach(() => {
    empty = Optional.empty();
    present = Optional.of(presentValue);
  });

  test("ofNullable", () => {
    expect(Optional.ofNullable(undefined)).toBe(empty);
    expect(Optional.ofNullable(null)).toBe(empty);
    expect(Optional.ofNullable(presentValue)).toStrictEqual(present);
  });

  test("empty", () => {
    expect(empty).toBeEmpty();
    expect(present).not.toBeEmpty();
  });

  test("present", () => {
    expect(empty).not.toBePresent();
    expect(present).toBePresent();
  });

  test("get", () => {
    expect(() => empty.get()).toThrow(RangeError);
    expect(present.get()).toBe(presentValue);
  });

  test("or", () => {
    const cb = jest.fn(() => Optional.of(1337));

    expect(empty.or(cb)).toStrictEqual(Optional.of(1337));
    expect(cb).toHaveBeenCalled();

    cb.mockClear();

    expect(present.or(cb)).toStrictEqual(present);
    expect(cb).not.toHaveBeenCalled();
  });

  test("orElse", () => {
    expect(empty.orElse(23)).toBe(23);
    expect(present.orElse(23)).toBe(presentValue);
  });

  test("orElseGet", () => {
    expect(empty.orElseGet(() => 23)).toBe(23);
    expect(present.orElseGet(() => 23)).toBe(presentValue);
  });

  test("orElseThrow", () => {
    const err = new Error();
    expect(() => empty.orElseThrow(() => err)).toThrow(err);
    expect(() => present.orElseThrow(() => err)).not.toThrow(err);
  });

  test("filter", () => {
    expect(empty.filter((v) => v > 42)).toBeEmpty();
    expect(empty.filter((v) => v <= 42)).toBeEmpty();
    expect(present.filter((v) => v > 42)).toBeEmpty();
    expect(present.filter((v) => v <= 42)).not.toBeEmpty();
  });

  test("map", () => {
    expect(empty.map((v) => v + 1)).toBeEmpty();
    expect(present.map((v) => v + 1)).toStrictEqual(Optional.of(presentValue + 1));
  });

  test("flatMap", () => {
    expect(empty.flatMap(() => Optional.empty())).toBeEmpty();
    expect(empty.flatMap((v) => Optional.of(v + 1))).toBeEmpty();
    expect(present.flatMap(() => Optional.empty())).toBeEmpty();
    expect(present.flatMap((v) => Optional.of(v + 1))).toStrictEqual(Optional.of(presentValue + 1));
  });

  test("toString", () => {
    expect(empty.toString()).toBe("Optional.empty");
    expect(present.toString()).toBe("Optional[42]");
  });
});
