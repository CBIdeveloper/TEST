const fs = require('fs')
const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common');
const nodePackage = require('./package.json');

const baseFolder =
  process.env.APPDATA !== undefined && process.env.APPDATA !== ''
    ? `${process.env.APPDATA}/ASP.NET/https`
    : `${process.env.HOME}/.aspnet/https`;

const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
const certificateName = certificateArg ? certificateArg.groups.value : "AdmSystemFrontend";

if (!certificateName) {
  console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
  process.exit(-1);
}

const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    allowedHosts: 'all',
    port: 443,
    historyApiFallback: true,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${nodePackage.version}/[name].js`,
    publicPath: '/',
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
          filename: `${nodePackage.version}/static/images/[name][ext]`,
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
          filename: `${nodePackage.version}/static/fonts/[name][ext]`,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${nodePackage.version}/[name].css`,
      chunkFilename: `${nodePackage.version}/[id].css`,
    }),
  ],
});
