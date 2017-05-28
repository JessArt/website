const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const nodeModules = {}

const DEV = process.env.NODE_ENV !== 'production'
fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`
  })

const commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    options: {
      presets: ['es2015', 'react', 'stage-1'],
      plugins: ['transform-decorators-legacy']
    },
    // exclude: /(node_modules|bower_components)/
    include: path.join(__dirname, '..', 'src'),
    exclude: path.join(__dirname, '..', 'node_modules')
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    loader: 'url',
    options: {
      name: '[hash].[ext]',
      limit: 10000
    }
  },
  { test: /\.html$/, loader: 'html-loader' }
]

const config = {
  name: 'server-side rendering',
  devtool: DEV ? 'eval' : 'source-map',
  entry: {
    server: [
      'babel-polyfill',
      'isomorphic-fetch',
      './src/server/index.js'
    ]
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  output: {
    // The output directory as absolute path
    path: path.join(__dirname, '..', 'build'),
    // The filename of the entry chunk as relative path inside the output.path directory
    filename: 'server.js',
    // The output path from the view of the Javascript
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: commonLoaders.concat([
      {
        test: /\/.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.css$/,
        loader: 'css/locals?module&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ])
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: DEV,
      __SERVER__: true,
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify(DEV ?  'development' : 'production')
      }
    })
  ],
  externals: nodeModules
}

module.exports = config
