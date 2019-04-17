const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

const BUILD_DIR = path.join(__dirname, "src/dist/");


module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },
  entry: {
    start: "./src/App.jsx",
    react: ["react", "react-dom"],
  },

  output: {
    path: BUILD_DIR,
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        exclude: /node_modules/,
        test: /\.jsx?$/,
      },
      {
        loader: "eslint-loader",
        test: /\.jsx?$/,
      },
      {
        loader: ["style-loader", "css-loader", "sass-loader"],
        test: /\.(scss|css)$/,
      },
    ],
  },
  plugins: [htmlWebpackPlugin],
};
