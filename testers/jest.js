expect.extend({
  toBeEmpty(received) {
    const pass = typeof received.empty === "boolean" ? received.empty : false;
    if (pass) {
      return {
        message: () => `expected ${received} not to be empty`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be empty`,
        pass: false,
      };
    }
  },

  toBePresent(received) {
    const pass = typeof received.present === "boolean" ? received.present : false;
    if (pass) {
      return {
        message: () => `expected ${received} not to be present`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be present`,
        pass: false,
      };
    }
  },

  toBePresentWith(received, value) {
    const present = typeof received.present === "boolean" ? received.present : false;
    const pass = present && Object.is(received.get(), value);
    if (pass) {
      return {
        message: () => `expected ${received} not to be present with ${value}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be present with ${value}`,
        pass: false,
      };
    }
  },
});
