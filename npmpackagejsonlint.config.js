"use strict";

module.exports = {
  extends: "npm-package-json-lint-config-lddubeau",
  rules: {
    "require-private": "error",
    "valid-values-private": ["error", [
      true,
    ]],
  },
};
