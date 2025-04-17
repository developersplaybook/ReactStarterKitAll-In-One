const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env) => {
  const isDevBuild = !(env && env.production);
  console.log("mode: ", isDevBuild ? "development" : "production");

  const sharedConfig = () => ({
    mode: isDevBuild ? "development" : "production",
    optimization: {
      minimize: !isDevBuild
    },
    stats: { modules: false },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: { 'react': path.join(__dirname, 'node_modules', 'react') }
    },
    output: {
      filename: () => {
        return '[name].js';
      },
      publicPath: '/dist/' // Ensure assets are correctly referenced
    },
    devtool: isDevBuild ? 'inline-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        },
        {
          test: /\.jsx$/,
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg|jpe?g|gif|png)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name].[contenthash][ext]',
            publicPath: '/dist/' // Correct public path for assets
          }
        },
        { test: /\.html$/, loader: "html-loader" },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: true // Enable processing URLs in CSS files
              }
            }
          ]
        },
        { test: /\.(pdf)$/, use: [{ loader: 'file-loader', options: {} }] },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "[name].[contenthash].css", chunkFilename: "[id].[contenthash].css" }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isDevBuild ? 'development' : 'production')
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx'],
        context: 'ClientApp',  // Lint files inside the ClientApp directory
        fix: true,             // Automatically fix linting errors
      }),
    ]
  });

  const clientBundleOutputDir = './wwwroot/dist';
  const clientBundleConfig = merge(sharedConfig(), {
    entry: { 'main-client': './ClientApp/boot-client.jsx' },
    output: { path: path.join(__dirname, clientBundleOutputDir) },
    plugins: []
  });


  return [clientBundleConfig];
};
