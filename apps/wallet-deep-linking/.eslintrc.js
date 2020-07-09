module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ["react", "prettier", "react-native", "jest", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "prettier",
    "prettier/react",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    "no-console": ["error", { allow: ["warn", "error", "info"] }],
    "react-native/no-raw-text": ["error", { skip: ["LargeText"] }],
    "react/prop-types": ["off"],
    "prettier/prettier": "error",
    "jest/no-large-snapshots": ["error", { maxSize: 50 }],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowTypedFunctionExpressions: true,
      },
    ],
  },
  settings: {
    react: {
      version: "16.8",
    },
  },
  globals: {
    react: true,
    __DEV__: "readonly",
  },
};
