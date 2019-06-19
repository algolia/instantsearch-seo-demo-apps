module.exports = {
  extends: ['algolia', 'algolia/vue', 'prettier/vue', 'algolia/typescript'],
  parser: 'vue-eslint-parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
};
