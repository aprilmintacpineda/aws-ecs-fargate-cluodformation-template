const alias = require('./importAliases');

const config = {
  comments: false,
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        useBuiltIns: false,
        targets: {
          node: true
        }
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-modules-commonjs',
      {
        strict: true,
        loose: true,
        importInterop: 'node'
      }
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias
      }
    ]
  ],
  ignore: [/node_modules/]
};

module.exports = config;
