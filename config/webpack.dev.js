const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');//打包js
const htmlPlugin = require('html-webpack-plugin');//打包html
module.exports = {
  mode: 'development',
  //入口文件配置
  entry: {
    main: './src/main.js',
    a: './src/a.js', //这里新添加一个入口文件

  },
  //出口文件配置
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  //模块
  module: {
    rules: [
      //css loader
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      //图片 loader
      {
        test: /\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
        use: [
          {
            loader: 'url-loader',//是指定使用的loader和loader的配置参数
            options: {
              limit: 500  //是把小于500B的文件打成Base64的格式，写入JS
            }
          },
        ]
      },
      //babel 
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      }
    ]
  },
  //插件
  plugins: [
    new uglify(),//js压缩插件
    new htmlPlugin({
      minify: { //是对html文件进行压缩
        removeAttributeQuotes: true  //removeAttrubuteQuotes是却掉属性的双引号。
      },
      hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
      template: './src/index.html' //是要打包的html模版路径和文件名称。
    })

  ],
  //配置webpack开发服务功能
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    host: 'localhost',
    compress: true,
    port: 8080
  }
}