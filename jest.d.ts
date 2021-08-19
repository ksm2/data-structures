namespace jest {
  interface Matchers<R> {
    toBeEmpty(): R;
    toBePresent(): R;
    toBePresentWith(value: any): R;
  }
}
