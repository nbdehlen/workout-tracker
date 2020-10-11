module.exports = {
  env: {
    jest: true,
    browser: true,
    es2020: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "styled-components"],
  rules: {
    "react/prop-types": 0,
    "styled-components/no-undef": 0,
  },
  globals: {
    css: false,
  },
};
