/* eslint-disable import/no-commonjs */

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  /*
   * Client entrypoint
   */
  {
    name: 'client',
    entry: ['./src/client.tsx'],
    output: {
      path: path.join(__dirname, 'dist/static'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    mode: 'development',
    target: 'web',
    resolve: {
      /*
       * Automatically resolve extensions when importing a file without extension
       * https://webpack.js.org/configuration/resolve/#resolve-extensions
       */
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        /*
         * Transpiling TypeScript/JavaScript files using Babel
         * https://github.com/babel/babel-loader
         */
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                /*
                 * Current environment
                 * Used in `babel.config.js` to conditionally apply configuration or load plugins.
                 * https://babeljs.io/docs/en/options#envname
                 */
                envName: 'client',
              },
            },
          ],
        },
      ],
    },
  },
  /*
   * Server entrypoint
   */
  {
    name: 'server',
    entry: ['./src/server.tsx'],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/',
    },
    mode: 'development',
    target: 'node',
    node: {
      __dirname: true,
      __filename: true,
    },
    resolve: {
      /*
       * Automatically resolve extensions when importing a file without extension
       * https://webpack.js.org/configuration/resolve/#resolve-extensions
       */
      extensions: ['.ts', '.tsx', '.js'],
    },
    /*
     * Exclude node modules from webpack bundle
     * https://github.com/liady/webpack-node-externals
     */
    externals: nodeExternals(),
    module: {
      rules: [
        /*
         * Transpiling TypeScript/JavaScript files using Babel
         * https://github.com/babel/babel-loader
         */
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                /*
                 * Current environment
                 * Used in `babel.config.js` to conditionally apply configuration or load plugins.
                 * https://babeljs.io/docs/en/options#envname
                 */
                envName: 'server',
              },
            },
          ],
        },
      ],
    },
  },
];
