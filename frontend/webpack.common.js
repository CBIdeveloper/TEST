const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      chunks: ['index'],
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/server/iis/', to: '' },
        {
          from: './src/assets/docs/',
          to: 'docs',
        },
        {
          from: './src/assets/favicon/',
          to: 'favicon',
        },
        {
          from: './src/assets/documents/',
          to: 'documents',
        },
        {
          from: './src/assets/config/',
          to: 'config',
        },
      ],
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendors',
          enforce: true,
          minChunks: 2,
          minSize: 100 * 1024,
        },
      },
    },
  },
};
