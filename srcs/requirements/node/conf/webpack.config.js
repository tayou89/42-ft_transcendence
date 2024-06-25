const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: function() {
                  return [require("autoprefixer")];
                }
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                {
                  pragma: "MyReact.createElement"
                },
              ],
            ],
          },
        },
      },
    ],
  },
  //socket.io 부분 추가
  resolve: {
    fallback: {
      "socket.io-client": require.resolve("socket.io-client"),
    },
    extensions: ['.js'],
  },
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
  },
  mode: "development",
//   devServer: {
//     contentBase: path.join(__dirname, 'public'),
//     compress: true,
//     port: 3000, // 원하는 포트 번호로 변경
//   },
};
