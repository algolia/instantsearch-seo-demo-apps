/* eslint-disable import/no-commonjs */
module.exports = api => {
  const ifServer = plugin => (api.env() === 'server' ? plugin : undefined);
  const ifClient = plugin => (api.env() === 'client' ? plugin : undefined);

  return {
    presets: [
      /*
       * Apply transforms for TypeScript
       * https://babeljs.io/docs/en/babel-preset-typescript
       */
      '@babel/preset-typescript',
      /*
       * Apply transforms for React/JSX
       * https://babeljs.io/docs/en/babel-preset-react
       */
      '@babel/preset-react',
      /*
       * Apply transforms depending of the target environement
       * https://babeljs.io/docs/en/babel-preset-env
       */
      [
        '@babel/preset-env',
        {
          targets: {
            ...ifClient({
              // Uses values from `.browserslistrc` file
            }),
            ...ifServer({
              node: 'current',
            }),
          },
          /*
           * Modules are handled by webpack so we do not need any transforms
           */
          modules: false,
        },
      ],
    ],
    plugins: [
      /*
       * Class Fields (Stage 3)
       * Transforms static class properties as well as properties declared with the property initializer syntax
       * https://github.com/tc39/proposal-class-fields
       * https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-class-properties
       */
      '@babel/plugin-proposal-class-properties',
    ],
  };
};
