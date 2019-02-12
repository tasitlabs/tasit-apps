module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ["react", "prettier", "react-native", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "prettier",
    "prettier/react",
    "plugin:jest/recommended",
  ],
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
    "react-native/no-raw-text": ["error", { skip: ["LargeText"] }],
    "react/prop-types": ["error", { ignore: ["navigation"] }],
    "prettier/prettier": "error",
    "jest/no-large-snapshots": ["warn", { maxSize: 50 }],
    "react-native/sort-styles": "off",
  },
  settings: {
    react: {
      version: "16.5",
    },
  },
};
