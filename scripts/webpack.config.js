const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: 'static/js/[name].[chunkHash:9].js'  //chunkHash两个文件的文件名就不一样了。
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack',
      template: 'public/index.html'//指定的public下边的index.html
    }),
    new MiniCssExtractPlugin({

      filename: 'static/css/[name][chunkHash:9].css',

    }),
  ],
  devServer: {
    port: 8080,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/images/[name].[ext]',
              publicPath: '/'
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
}