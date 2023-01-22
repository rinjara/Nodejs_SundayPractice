const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",

  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "js/main.js",
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
