const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode:'production',
  entry:'./public/src/index.js',
  output: {
    filename: 'js/bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  module: {
    
    rules:[
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 5000,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
}