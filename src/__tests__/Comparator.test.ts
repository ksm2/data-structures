import { Comparable, Comparator } from "../Comparator";

describe("Comparator", () => {
  class MyComparable implements Comparable {
    private readonly value: number;

    constructor(value: number) {
      this.value = value;
    }

    compareTo(other: this): number {
      return this.value < other.value ? -1 : this.value > other.value ? 1 : 0;
    }
  }

  let naturalOrder = Comparator.naturalOrder<number>();
  let reverseOrder = Comparator.reverseOrder<string>();
  let keyComparator = Comparator.comparing((value: { key: boolean }) => value.key);
  let comparableComparator = Comparator.naturalOrder<MyComparable>();

  test("compare", () => {
    expect(naturalOrder.compare(1, 2)).toBe(-1);
    expect(naturalOrder.compare(1, 1)).toBe(0);
    expect(naturalOrder.compare(2, 1)).toBe(1);

    expect(reverseOrder.compare("a", "b")).toBe(1);
    expect(reverseOrder.compare("a", "a")).toBe(0);
    expect(reverseOrder.compare("b", "a")).toBe(-1);

    expect(keyComparator.compare({ key: false }, { key: true })).toBe(-1);
    expect(keyComparator.compare({ key: true }, { key: true })).toBe(0);
    expect(keyComparator.compare({ key: true }, { key: false })).toBe(1);

    expect(comparableComparator.compare(new MyComparable(4), new MyComparable(5))).toBe(-1);
    expect(comparableComparator.compare(new MyComparable(3), new MyComparable(3))).toBe(0);
    expect(comparableComparator.compare(new MyComparable(2), new MyComparable(1))).toBe(1);
  });

  test("reversed", () => {
    expect(naturalOrder.reversed().compare(1, 2)).toBe(1);
    expect(naturalOrder.reversed().compare(1, 1)).toBe(0);
    expect(naturalOrder.reversed().compare(2, 1)).toBe(-1);

    expect(reverseOrder.reversed().compare("a", "b")).toBe(-1);
    expect(reverseOrder.reversed().compare("a", "a")).toBe(0);
    expect(reverseOrder.reversed().compare("b", "a")).toBe(1);

    expect(keyComparator.reversed().compare({ key: false }, { key: true })).toBe(1);
    expect(keyComparator.reversed().compare({ key: true }, { key: true })).toBe(0);
    expect(keyComparator.reversed().compare({ key: true }, { key: false })).toBe(-1);
  });

  test("thenComparing", () => {
    expect(naturalOrder.thenComparing(() => 42).compare(1, 2)).toBe(-1);
    expect(naturalOrder.thenComparing(() => 42).compare(1, 1)).toBe(0);

    // @ts-expect-error
    expect(naturalOrder.thenComparing(new Comparator(() => -1)).compare(2, 1)).toBe(1);
    // @ts-expect-error
    expect(naturalOrder.thenComparing(new Comparator(() => -1)).compare(1, 1)).toBe(-1);
  });
});
