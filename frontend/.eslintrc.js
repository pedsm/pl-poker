/* eslint-disable */
module.exports = {
  extends: [
    'plugin:vue/base',
    'eslint:recommended',
    '@vue/typescript'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: false }
    ]
  },
  ignorePatterns: ['*.js', 'src/shims-*', '.eslintrc.*']
}