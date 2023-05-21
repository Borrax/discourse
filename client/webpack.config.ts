import type { Configuration } from 'webpack'
import path from 'path'

const config: Configuration = {
  mode: 'development',
  entry: './src/client.ts',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}

export default config
