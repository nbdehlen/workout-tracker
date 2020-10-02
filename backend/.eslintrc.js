module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    "arrow-parens": [1, "as-needed"],
    "no-underscore-dangle": 0
  },
};
