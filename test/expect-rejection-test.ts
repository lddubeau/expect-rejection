// tslint:disable-next-line:missing-jsdoc
import * as chai from "chai";
// tslint:disable-next-line:no-import-side-effect no-implicit-dependencies
import "mocha";

import { expectRejection, use } from "../build/dist/expect-rejection";

use(chai);
const { expect } = chai;

// tslint:disable-next-line:completed-docs
class Custom extends Error {
  // tslint:disable-next-line:no-any
  constructor(...args: any[]) {
    super(...args);
    if (Object.setPrototypeOf !== undefined) {
      Object.setPrototypeOf(this, Custom.prototype);
    }
    else {
      // tslint:disable-next-line:no-any
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

  describe("with a single argument", () => {
    it("resolves if the promise rejects", async () => {
      const got = await expectRejection(Promise.reject(1));
      expect(got).to.equal(1);
    });
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
      const got = await expectRejection(Promise.reject(err), err);
      expect(got).to.equal(err);
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
      const err = new Error("moo");
      const got = await expectRejection(Promise.reject(err), "moo");
      expect(got).to.equal(err);
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
      const err = new Error("moo");
      const got = await expectRejection(Promise.reject(err), /o/);
      expect(got).to.equal(err);
    });
  });

  describe("with error class", () => {
    it("rejects if the class does not match", async () => {
      try {
        await expectRejection(Promise.reject(new Error("moo")), Custom);
      }
      catch (e) {
        expect(e.message).to
          .equal("expected [Error: moo] to be an instance of Custom");

        return;
      }
      throw new Error("expectRejection should have rejected");
    });

    it("resolves if the class matches", async () => {
      const err = new Custom("moo");
      const got = await expectRejection(Promise.reject(err), Custom);
      expect(got).to.equal(err);
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
      const err = new Custom("moo");
      const got = await expectRejection(Promise.reject(err), Custom, "moo");
      expect(got).to.equal(err);
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
      const err = new Custom("moo");
      const got = await expectRejection(Promise.reject(err), Custom, /o/);
      expect(got).to.equal(err);
    });
  });
});
