const path = require('path')

module.exports = {
  mode:'production',
  entry:'./public/index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    
    rules:[
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
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
  }
}