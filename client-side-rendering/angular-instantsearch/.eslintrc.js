module.exports = {
  extends: ['algolia', 'algolia/typescript'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'new-cap': [2, { capIsNewExceptions: ['NgModule', 'Component'] }],
  },
};
