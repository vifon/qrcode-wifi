const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "css/style.css",
  disable: process.env.NODE_ENV === "development"
});
const extractCSS = new ExtractTextPlugin({
  filename: "css/style.raw.css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: 'file-loader?name=[name].[ext]',
      exclude: /node_modules/
    }, {
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: extractSass.extract({
        use: [
          "css-loader",
          "sass-loader"
        ],
        fallback: "style-loader"
      })
    }, {
      test: /\.css$/,
      use: extractCSS.extract({
        use: 'css-loader',
        fallback: 'style-loader'
      })
    }, {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          "file-loader?name=fonts/[name].[ext]"
        ]
    }]
  },
  devServer: {
    contentBase: 'dist/'
  },
  devtool: 'source-map',
  plugins: [
    extractSass,
    extractCSS
  ]
};
