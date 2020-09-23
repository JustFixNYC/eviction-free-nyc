module.exports = {
  globals: {
    Rollbar: "readonly",
    require: "readonly",
    process: "readonly",
    graphql: "readonly",
    module: "readonly",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/prop-types": "off",
    "react/jsx-no-target-blank": "off",
  },
};
