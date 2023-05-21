import type { Configuration } from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const config: Configuration = {
  mode: 'development',
  entry: './src/client.ts',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Discourse'
    })
  ]
}

export default config
