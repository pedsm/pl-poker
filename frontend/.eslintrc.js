/* eslint-disable */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/base',
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