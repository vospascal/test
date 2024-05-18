import { expect } from "vitest";

expect.extend({
  toContain(received: unknown[] | DOMTokenList, expected: unknown) {
    const array = received instanceof DOMTokenList ? Array.from(received) : received;

    return {
      pass: array.includes(expected),
      message: () => `${received} ${this.isNot ? "contains" : "does not contain"} ${expected}`,
    };
  },
});
