/**
 * A tiny library for testing rejections.
 */
import { expect } from "chai";

// tslint:disable-next-line:no-any
export type ErrorClass<E extends Error> = new (...args: any[]) => E;

/* tslint:disable:unified-signatures */

/**
 * Test that a promise rejects.
 *
 * @param p The promise to test.
 *
 * @returns A promise that resolves to the error of the rejection. If the
 * promise ``p`` did not reject, then the returned promise rejects.
 */
// tslint:disable-next-line:no-any
export async function expectRejection(p: Promise<unknown>): Promise<any>;
/**
 * Test that a promise rejects with a specific error.
 *
 * @param p The promise to test.
 *
 * @param error The error that the promise must reject with. The test is done
 * with strict equality.
 *
 * @returns A promise that resolves to the error of the rejection. If the
 * promise ``p`` did not reject, then the returned promise rejects.
 */
export async function expectRejection<E extends Error>(p: Promise<unknown>,
                                                       error: E): Promise<E>;
/**
 * Test that a promise rejects with a specific pattern. The error's ``message``
 * field must match the specified pattern. If the pattern is a string, the match
 * must be exact. Otherwise, the ``RegExp`` rules apply.
 *
 * @param p The promise to test.
 *
 * @param pattern The pattern to test.
 *
 * @returns A promise that resolves to the error of the rejection. If the
 * promise ``p`` did not reject, then the returned promise rejects.
 */
export async function expectRejection(p: Promise<unknown>,
                                      pattern: RegExp | string): Promise<Error>;
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
 * @returns A promise that resolves to the error of the rejection. If the
 * promise ``p`` did not reject, then the returned promise rejects.
 */
export async function expectRejection<E extends Error>(
  p: Promise<unknown>,
  errorClass: ErrorClass<E>,
  pattern?: RegExp | string): Promise<E>;
export async function expectRejection<E extends Error>(
  p: Promise<unknown>,
  errorLike?: RegExp | string | ErrorClass<E> | E,
  pattern?: RegExp | string): Promise<E> {
  let shouldHaveThrown = false;
  try {
    await p;
    shouldHaveThrown = true;
  }
  catch (ex) {
    if (errorLike !== undefined) {
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

        if (pattern !== undefined) {
          if (pattern instanceof RegExp) {
            expect(ex).to.have.property("message").match(pattern);
          }
          else {
            expect(ex).to.have.property("message").equal(pattern);
          }
        }
      }
    }

    return ex;
  }

  if (shouldHaveThrown) {
    throw new Error("should have thrown an error");
  }

  throw new Error("should not get here");
}
