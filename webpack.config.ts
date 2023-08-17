import { Configuration } from "webpack";
const Dotenv = require("dotenv-webpack");

const webpackConfig: Configuration = {
  plugins: [
    new Dotenv({
      path: process.env.NODE_ENV === 'production' ? '../../path/to/other.env' : '.env',
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // Adiciona os estilos no DOM injetando uma tag <style>
          "css-loader",   // Carrega arquivos CSS com importações e resolução de URLs
        ],
      },
    ],
  },
};

export default webpackConfig;