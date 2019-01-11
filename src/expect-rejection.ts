/**
 * A tiny library for testing rejections.
 */
import { expect } from "chai";

// tslint:disable-next-line:no-any
export type ErrorClass = new (...args: any[]) => Error;

/* tslint:disable:unified-signatures */

/**
 * Test that a promise rejects with a specific error.
 *
 * @param p The promise to test.
 *
 * @param error The error that the promise must reject with. The test is done
 * with strict equality.
 *
 * @returns A promise that resolves or rejects once the test is done.
 */
// tslint:disable-next-line:no-any
export async function expectRejection(p: Promise<any>,
                                      error: Error): Promise<void>;
/**
 * Test that a promise rejects with a specific pattern. The error's ``message``
 * field must match the specified pattern. If the pattern is a string, the match
 * must be exact. Otherwise, the ``RegExp`` rules apply.
 *
 * @param p The promise to test.
 *
 * @param pattern The pattern to test.
 *
 * @returns A promise that resolves or rejects once the test is done.
 */
// tslint:disable-next-line:no-any
export async function expectRejection(p: Promise<any>,
                                      pattern: RegExp | string): Promise<void>;
/**
 * Test that a promise rejects with a specific error class and specific pattern.
 *
 * The error must be an instance of ``errorClass``.
 *
 * The error's ``message`` field must match the specified pattern. If the
 * pattern is a string, the match must be exact. Otherwise, the ``RegExp`` rules
 * apply.
 *
 * @param p The promise to test.
 *
 * @param errorClass The class to match.
 *
 * @param pattern The pattern to test. The message of the error must match this
 * pattern.
 *
 * @returns A promise that resolves or rejects once the test is done.
 */
// tslint:disable-next-line:no-any
export async function expectRejection(p: Promise<any>,
                                      errorClass: ErrorClass,
                                      pattern: RegExp | string): Promise<void>;
// tslint:disable-next-line:no-any
export async function expectRejection(p: Promise<any>,
                                      errorLike:
                                      RegExp | string | ErrorClass | Error,
                                      pattern?: RegExp | string):
Promise<void> {
  let shouldHaveThrown = false;
  try {
    await p;
    shouldHaveThrown = true;
  }
  catch (ex) {
    if (errorLike instanceof Error) {
      expect(ex).to.equal(errorLike);
    }
    else {
      if (!(errorLike instanceof RegExp || typeof errorLike === "string")) {
        expect(ex).to.be.instanceof(errorLike);
      }
      else {
        // tslint:disable-next-line:no-parameter-reassignment
        pattern = errorLike;
      }

      if (pattern instanceof RegExp) {
        expect(ex).to.have.property("message").match(pattern);
      }
      else {
        expect(ex).to.have.property("message").equal(pattern);
      }
    }
  }

  if (shouldHaveThrown) {
    throw new Error("should have thrown an error");
  }
}
