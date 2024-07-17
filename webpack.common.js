const path = require('path');
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  externalsPresets: { node: true },
  module: {
    rules: [
      {
        test: [/\.ts$/,/\.tsx$/,/\.js$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],'@babel/preset-flow',
              '@babel/preset-react']
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js','.ts','.tsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
  },
}; 