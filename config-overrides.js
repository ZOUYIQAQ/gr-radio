const { override, addWebpackPlugin } = require('customize-cra');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = override(
  addWebpackPlugin(new HardSourceWebpackPlugin())
);
