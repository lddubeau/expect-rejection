import { expect } from "chai";
import "mocha";

import { expectRejection } from "../build/dist/expect-rejection";

class Custom extends Error {
  constructor(...args: any[]) {
    super(...args);
    if (Object.setPrototypeOf !== undefined) {
      Object.setPrototypeOf(this, Custom.prototype);
    }
    else {
      (this as any).__proto__ = Custom.prototype;
    }
  }
}

describe("expectRejection", () => {
  it("rejects if the promise resolves", async () => {
    try {
      await expectRejection(Promise.resolve(1), Error, "foo");
    }
    catch (e) {
      expect(e.message).to.equal("should have thrown an error");

      return;
    }
    throw new Error("expectRejection should have rejected");
  });

  describe("with error instance", () => {
    it("rejects if the error is not strictly equal", async () => {
      try {
        await expectRejection(Promise.reject(new Error("moo")),
                              new Error("moo"));
      }
      catch (e) {
        expect(e.message).to.
          equal("expected [Error: moo] to equal [Error: moo]");

        return;
      }
      throw new Error("expectRejection should have rejected");
    });

    it("resolves if the error is strictly equal", async () => {
      const err = new Error("moo");
      await expectRejection(Promise.reject(err), err);
    });
  });

  describe("with string pattern", () => {
    it("rejects if the string does not match", async () => {
      try {
        await expectRejection(Promise.reject(new Error("moo")), "foo");
      }
      catch (e) {
        expect(e.message).to.equal("expected 'moo' to equal 'foo'");

        return;
      }
      throw new Error("expectRejection should have rejected");
    });

    it("resolves if the string matches", async () => {
      await expectRejection(Promise.reject(new Error("moo")), "moo");
    });
  });

  describe("with RegExp pattern", () => {
    it("rejects if the RegExp does not match", async () => {
      try {
        await expectRejection(Promise.reject(new Error("moo")), /^foo/);
      }
      catch (e) {
        expect(e.message).to.equal("expected 'moo' to match /^foo/");

        return;
      }
      throw new Error("expectRejection should have rejected");
    });

    it("resolves if the RegExp matches", async () => {
      await expectRejection(Promise.reject(new Error("moo")), /o/);
    });
  });

  describe("with error class and string pattern", () => {
    it("rejects if the class does not match", async () => {
      try {
        await expectRejection(Promise.reject(new Error("moo")), Custom, "moo");
      }
      catch (e) {
        expect(e.message).to
          .equal("expected [Error: moo] to be an instance of Custom");

        return;
      }
      throw new Error("expectRejection should have rejected");
    });

    it("rejects if the string does not match", async () => {
      try {
        await expectRejection(Promise.reject(new Error("moo")), Error, "foo");
      }
      catch (e) {
        expect(e.message).to.equal("expected 'moo' to equal 'foo'");

        return;
      }
      throw new Error("expectRejection should have rejected");
    });

    it("resolves if the class and string match", async () => {
      await expectRejection(Promise.reject(new Custom("moo")), Custom, "moo");
    });
  });

  describe("with error class and RegExp pattern", () => {
    it("rejects if the class does not match", async () => {
      try {
        await expectRejection(Promise.reject(new Error("moo")), Custom, /o/);
      }
      catch (e) {
        expect(e.message).to
          .equal("expected [Error: moo] to be an instance of Custom");

        return;
      }
      throw new Error("expectRejection should have rejected");
    });

    it("rejects if the RegExp does not match", async () => {
      try {
        await expectRejection(Promise.reject(new Error("moo")), Error, /^foo/);
      }
      catch (e) {
        expect(e.message).to.equal("expected 'moo' to match /^foo/");

        return;
      }
      throw new Error("expectRejection should have rejected");
    });

    it("resolves if the class and RegExp match", async () => {
      await expectRejection(Promise.reject(new Custom("moo")), Custom, /o/);
    });
  });
});
