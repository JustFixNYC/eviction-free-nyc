module.exports = {
  globals: {
    Rollbar: "readonly",
    process: "readonly",
    // This is a global in Gatsby v1.
    graphql: "readonly",
    // Some of our code uses CommonJS globals.
    require: "readonly",
    module: "readonly",
    // Jest globals
    describe: "readonly",
    expect: "readonly",
    it: "readonly",
    test: "readonly",
    // TypeScript globals (so weird that we have to define these here but whatever)
    JSX: "readonly",
    NodeJS: "readonly",
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
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  rules: {
    // This just makes our code harder to read.
    "react/no-unescaped-entities": "off",
    // The legacy codebase only partly uses this, so disable.
    "react/prop-types": "off",
    // TODO: We should enable this eventually.
    "react/jsx-no-target-blank": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-types": "off",
  },
};
