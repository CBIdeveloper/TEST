const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common');
const nodePackage = require('./package.json');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${nodePackage.version}/[name].[contenthash].js`,
    publicPath: '/frontend/',
  },
  module: {
    rules: [
      {
        test: /.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: `${nodePackage.version}/static/images/[name].[contenthash][ext]`,
        },
        parser: {
          dataUrlCondition: {
            maxSize: 15 * 1024,
          },
        },
      },
      {
        test: /\.(eot|ttf|otf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${nodePackage.version}/static/fonts/[name].[contenthash][ext]`,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${nodePackage.version}/[name].[contenthash].css`,
      chunkFilename: `${nodePackage.version}/[id].[contenthash].css`,
    }),
  ],
});
