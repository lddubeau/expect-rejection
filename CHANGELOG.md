<a name="2.0.0"></a>
# [2.0.0](https://github.com/lddubeau/expect-rejection/compare/v1.1.0...v2.0.0) (2019-11-12)


### Features

* add a use function to link this library with Chai ([14b1af1](https://github.com/lddubeau/expect-rejection/commit/14b1af1))


### BREAKING CHANGES

* you must now use the ``use`` function to link this library with
Chai at run time. Previous versions just used ``import``, which worked fine for
some use-case scenarios, but caused problems in other cases. The new method is
generally nicer to use.



<a name="1.1.0"></a>
# [1.1.0](https://github.com/lddubeau/expect-rejection/compare/v1.0.3...v1.1.0) (2019-01-18)


### Features

* allow testing the error class without message test ([05a549a](https://github.com/lddubeau/expect-rejection/commit/05a549a))
* return the exception and allow single-argument call ([3bc9ce6](https://github.com/lddubeau/expect-rejection/commit/3bc9ce6))



<a name="1.0.3"></a>
## [1.0.3](https://github.com/lddubeau/expect-rejection/compare/v1.0.2...v1.0.3) (2019-01-11)


### Bug Fixes

* sigh... the "fix" in 1.0.2 was a stupid mistake ([1e16446](https://github.com/lddubeau/expect-rejection/commit/1e16446))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/lddubeau/expect-rejection/compare/v1.0.1...v1.0.2) (2019-01-11)


### Bug Fixes

* take a Promise<any> rather than Promise<unknown> ([28caca3](https://github.com/lddubeau/expect-rejection/commit/28caca3))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/lddubeau/expect-rejection/compare/v1.0.0...v1.0.1) (2019-01-09)



<a name="1.0.0"></a>
# 1.0.0 (2019-01-09)


### Features

* initial commit ([e223dfd](https://github.com/lddubeau/expect-rejection/commit/e223dfd))



