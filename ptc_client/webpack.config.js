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
      loader: 'babel-loader?presets=es2015&retainLines=true',
    },
    { test: /\.scss$/,
     loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader") }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin("style.css", {allChunks: false})
  ]
};

// devServer: {
//   contentBase: './',
//   hot: true
// },
// new webpack.HotModuleReplacementPlugin(),
