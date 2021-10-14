const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    build: './src/main.js'
  },
  output: {
    filename: '[name].js?v=[hash]',
    path: resolve(__dirname, 'dist')
  },
  devtool: isProduction ? null : 'inline-source-map',
  devServer: {
    compress: true,
    port: 1000
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ],
      exclude: /node_modules/
    }, {
      test: /\.(svg|png)$/,
      type: 'asset/resource',
      generator: {
        filename: 'images/[name][ext]'
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Numbers Converter',
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['build']
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[name].css?v=[hash]'
    }),
    new ESLintPlugin()
  ]
};
