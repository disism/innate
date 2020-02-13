path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: {
      base: './src/base/base.ts',
      buttons: "./src/buttons/buttons.ts",
      tabs: "./src/tabs/tabs.ts"
    },
    module:{
      rules: [
        {
          test: /\.ts/, loader: 'ts-loader', exclude: /node_modules/
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader', 
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/[contenthash].[ext]',
          },
        },
        {
          test: /\.html$/,
            loader: 'html-loader'
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    },
    // production
    mode: 'development',
    output: {
      filename: 'js/[name]_[hash]_bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name]_[hash]_bundle.css',
      })
    ]
  }