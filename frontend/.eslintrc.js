/* eslint-disable */
module.exports = {
  extends: [
    'plugin:vue/essential',
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