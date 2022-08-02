const path = require('path')

module.exports = {
  mode:'production',
  entry:'./public/src/index.js',
  output: {
    filename: 'bundle.js',
    path:path.resolve(__dirname,'public','dist')
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