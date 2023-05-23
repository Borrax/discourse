import type { Configuration } from 'webpack'
import type { Configuration as ConfigDevServer } from 'webpack-dev-server'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

type WebpackConfig = Configuration & ConfigDevServer

const config: WebpackConfig = {
  mode: 'development',
  entry: './src/client.tsx',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Discourse'
    })
  ],
  devServer: {
    port: 5000,
    hot: true,
    open: true
  }
}

export default config
