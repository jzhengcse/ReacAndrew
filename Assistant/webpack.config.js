const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    index: ['babel-polyfill', './src/app.js']
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public')
  },
  node: {
    fs: 'empty',
    tls: 'empty',
    net: 'empty',

  }
  // target: 'node', // in order to ignore built-in modules like path, fs, etc.
  // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};
