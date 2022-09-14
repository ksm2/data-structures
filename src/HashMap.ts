import { Optional } from "./Optional.js";

export class HashMap<K, V> {
  static readonly #EMPTY = new HashMap<never, never>();

  readonly #map: Map<K, V>;

  constructor(initialValues: ReadonlyArray<readonly [K, V]> = []) {
    this.#map = new Map<K, V>(initialValues);
  }

  static empty<K, V>(): HashMap<K, V> {
    return HashMap.#EMPTY;
  }

  static of<K, V>(): HashMap<K, V>;
  static of<K, V>(k1: K, v1: V): HashMap<K, V>;
  static of<K, V>(k1: K, v1: V, k2: K, v2: V): HashMap<K, V>;
  static of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V): HashMap<K, V>;
  static of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V, k4: K, v4: V): HashMap<K, V>;
  static of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V, k4: K, v4: V, k5: K, v5: V): HashMap<K, V>;
  static of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V, k4: K, v4: V, k5: K, v5: V, k6: K, v6: V): HashMap<K, V>;
  static of<K, V>(...values: (K | V)[]): HashMap<K, V> {
    const entries = new Array<readonly [K, V]>();
    for (let i = 0, j = 1; j < values.length; i += 2, j += 2) {
      entries.push([values[i] as K, values[j] as V]);
    }
    return new HashMap<K, V>(entries);
  }

  get size(): number {
    return this.#map.size;
  }

  has(key: K): boolean {
    return this.#map.has(key);
  }

  get(key: K): Optional<V> {
    return Optional.ofNullable(this.#map.get(key));
  }

  set(key: K, value: V): this {
    this.#map.set(key, value);
    return this;
  }

  delete(key: K): boolean {
    return this.#map.delete(key);
  }

  clear(): this {
    this.#map.clear();
    return this;
  }

  filterKeys<U extends K>(predicate: (key: K, value: V, map: HashMap<K, V>) => key is U): HashMap<U, V>;
  filterKeys(predicate: (key: K, value: V, map: HashMap<K, V>) => boolean): HashMap<K, V>;
  filterKeys(predicate: (key: K, value: V, map: HashMap<K, V>) => boolean): HashMap<K, V> {
    return new HashMap<K, V>([...this.#map].filter(([key, value]) => predicate(key, value, this)));
  }

  mapKeys<U>(fn: (key: K, value: V, map: HashMap<K, V>) => U): HashMap<U, V> {
    return new HashMap<U, V>([...this.#map].map(([key, value]) => [fn(key, value, this), value]));
  }

  filterValues<U extends V>(predicate: (value: V, key: K, map: HashMap<K, V>) => value is U): HashMap<K, U>;
  filterValues(predicate: (value: V, key: K, map: HashMap<K, V>) => boolean): HashMap<K, V>;
  filterValues(predicate: (value: V, key: K, map: HashMap<K, V>) => boolean): HashMap<K, V> {
    return new HashMap<K, V>([...this.#map].filter(([key, value]) => predicate(value, key, this)));
  }

  mapValues<U>(fn: (value: V, key: K, map: HashMap<K, V>) => U): HashMap<K, U> {
    return new HashMap<K, U>([...this.#map].map(([key, value]) => [key, fn(value, key, this)]));
  }
}
