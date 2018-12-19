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
    "no-console": "off",
    "react-native/no-raw-text": "off",
    "react/prop-types": "off",
    "prettier/prettier": "error",
    "jest/no-large-snapshots": ["warn", { maxSize: 20 }],
  },
  settings: {
    react: {
      version: "16.5",
    },
  },
};
