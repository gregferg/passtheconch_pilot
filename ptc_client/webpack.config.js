var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

// 'webpack-dev-server/client?http://localhost:8080',
// 'webpack/hot/only-dev-server',
module.exports = {
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    { test: /\.scss$/,
     loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader") }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './',
    hot: true
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin("style.css", {allChunks: false})
  ]
};

// new webpack.HotModuleReplacementPlugin(),
