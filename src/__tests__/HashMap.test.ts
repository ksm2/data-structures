import { HashMap } from "../HashMap";

describe("HashMap", () => {
  test("empty", () => {
    expect(HashMap.empty().size).toBe(0);
  });

  test("of", () => {
    expect(HashMap.of().size).toBe(0);

    const m1 = HashMap.of("one", 1);
    expect(m1.size).toBe(1);
    expect(m1.get("one")).toBePresentWith(1);

    const m2 = HashMap.of("one", 1, "two", 2);
    expect(m2.size).toBe(2);
    expect(m2.get("one")).toBePresentWith(1);
    expect(m2.get("two")).toBePresentWith(2);

    const m3 = HashMap.of("one", 1, "two", 2, "three", 3);
    expect(m3.size).toBe(3);
    expect(m3.get("one")).toBePresentWith(1);
    expect(m3.get("two")).toBePresentWith(2);
    expect(m3.get("three")).toBePresentWith(3);
  });

  test("has", () => {
    const map = HashMap.of("one", 1, "two", 2, "three", 3);
    expect(map.has("one")).toBe(true);
    expect(map.has("zero")).toBe(false);
  });

  test("get", () => {
    const map = HashMap.of("one", 1, "two", 2, "three", 3);
    expect(map.get("one")).toBePresentWith(1);
    expect(map.get("zero")).toBeEmpty();
  });

  test("set", () => {
    const map = HashMap.of("one", 1, "two", 2, "three", 3);
    expect(map.get("four")).toBeEmpty();
    map.set("four", 4);
    expect(map.get("four")).toBePresentWith(4);
  });

  test("delete", () => {
    const map = HashMap.of("one", 1, "two", 2, "three", 3);
    expect(map.get("two")).toBePresentWith(2);
    expect(map.delete("two")).toBe(true);
    expect(map.get("two")).toBeEmpty();
    expect(map.delete("two")).toBe(false);
  });

  test("delete", () => {
    const map = HashMap.of("one", 1, "two", 2, "three", 3);
    map.clear();
    expect(map.size).toBe(0);
    expect(map.get("one")).toBeEmpty();
    expect(map.get("two")).toBeEmpty();
    expect(map.get("three")).toBeEmpty();
  });

  test("filterKeys", () => {
    const map = HashMap.of(1, "a", null, "b", undefined, "c");
    expect(map.filterKeys(isDefined)).toStrictEqual(HashMap.of(1, "c"));
  });

  test("mapKeys", () => {
    const map = HashMap.of(1, "a", 2, "b", 3, "c");
    expect(map.mapKeys((k) => 2 * k)).toStrictEqual(HashMap.of(2, "a", 4, "b", 6, "c"));
  });

  test("filterValues", () => {
    const map = HashMap.of("a", 1, "b", null, "c", undefined);
    expect(map.filterValues(isDefined)).toStrictEqual(HashMap.of("a", 1));
  });

  test("mapValues", () => {
    const map = HashMap.of("a", 1, "b", 2, "c", 3);
    expect(map.mapValues((k) => 2 * k)).toStrictEqual(HashMap.of("a", 2, "b", 4, "c", 6));
  });

  function isDefined<T>(value: T): value is NonNullable<T> {
    return value != null;
  }
});
