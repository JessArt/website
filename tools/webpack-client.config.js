const webpack = require('webpack')
const path = require('path')
const cwd = process.cwd()
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

module.exports = ({ dev }) => {
  const devEntries = dev
    ? [
      // For hot style updates
      'webpack/hot/dev-server',
      hotMiddlewareScript
    ] : []

  const devPlugins = [
    new webpack.HotModuleReplacementPlugin()
  ]

  const buildPlugins = []

  const cssLoader = dev
    ? 'style-loader!css-loader!postcss-loader'
    : ExtractTextPlugin.extract(
        'style-loader',
        'css-loader!postcss-loader')

  const config = {
    // eval - Each module is executed with eval and //@ sourceURL.
    devtool: 'eval',
    // The configuration for the client
    name: 'browser',
    entry: []
      .concat('babel-polyfill')
      .concat(devEntries)
      .concat('./src/scripts/client/index.js'),
    output: {
      path: path.resolve(cwd, 'build'),
      publicPath: '',
      filename: 'client.js'
    },
    module: {
      loaders: [
        {
          /*
           * TC39 categorises proposals for babel in 4 stages
           * Read more http://babeljs.io/docs/usage/experimental/
           */
          test: /\.js$|\.jsx$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components)/,
          // Reason why we put this here instead of babelrc
          // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
          query: {
            presets: ['react-hmre', 'es2015', 'react', 'stage-2'],
            plugins: ['transform-decorators-legacy', 'transform-object-assign']
          }
        },
        {
          test: /\.css$/,
          loader: cssLoader
        },
        {
          test: /\.json$/,
          loader: 'json'
        }
      ]
    },
    plugins: dev ? devPlugins : buildPlugins,
    postcss: [
      autoprefixer,
      require('postcss-modules')({
        generateScopedName: '[name]__[local]___[hash:base64:5]'
      })
    ]
  }

  return config
}
