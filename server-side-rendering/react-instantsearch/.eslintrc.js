module.exports = {
  extends: ['algolia', 'algolia/react', 'algolia/typescript'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
};
