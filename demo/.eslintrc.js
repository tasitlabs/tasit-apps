module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ["react", "prettier", "react-native"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "prettier",
    "prettier/react",
  ],
  rules: {
    "no-console": 0,
    "react/prop-types": 0,
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      version: "16.5",
    },
  },
};
