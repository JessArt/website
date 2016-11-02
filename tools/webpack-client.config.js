const webpack = require('webpack')
const path = require('path')
const cwd = process.cwd()
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

const variables = require('../src/scripts/shared/variables')

module.exports = function getConfig (params) {
  const dev = params.dev
  console.log('VARIABLES:')
  console.log(variables)
  const postCSSConfig = function () {
    return [
      require('postcss-import')({
        path: path.join(__dirname, '..', 'src', 'scripts', 'shared'),
        // addDependencyTo is used for hot-reloading in webpack
        addDependencyTo: webpack
      }),
      // Note: you must set postcss-mixins before simple-vars and nested
      require('postcss-mixins')(),
      require('postcss-simple-vars')({
        // to allow hot reload:
        // https://github.com/postcss/postcss-simple-vars
        variables
      }),
      // Unwrap nested rules like how Sass does it
      require('postcss-nested')(),
      //  parse CSS and add vendor prefixes to CSS rules
      require('autoprefixer')({
        browsers: ['last 2 versions', 'IE > 8']
      }),
      require('postcss-modules')({
        generateScopedName: '[name]__[local]___[hash:base64:5]'
      }),
      // A PostCSS plugin to console.log() the messages registered by other
      // PostCSS plugins
      require('postcss-reporter')({
        clearMessages: true
      })
    ]
  }

  const devEntries = dev
    ? [
      // For hot style updates
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server'
    ] : []

  const devPlugins = [
    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

  const buildPlugins = [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]

  const cssLoader = dev
    ? 'style-loader!css-loader!postcss-loader'
    : ExtractTextPlugin.extract(
        'style-loader',
        'css-loader!postcss-loader')

  const config = {
    // eval - Each module is executed with eval and //@ sourceURL.
    devtool: dev ? 'eval' : 'source-maps',
    // The configuration for the client
    name: 'browser',
    entry: []
      .concat('babel-polyfill')
      .concat(devEntries)
      .concat('./src/scripts/client/index.js'),
    output: {
      path: path.resolve(cwd, 'build/public'),
      publicPath: '/',
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
            presets: []
            .concat(dev ? 'react-hmre' : [])
            .concat(['react', 'es2015', 'stage-1']),
            plugins: ['transform-decorators-legacy']
          }
        },
        {
          test: /\.css$/,
          loader: cssLoader
        },
        {
          test: /\.json$/,
          loader: 'json'
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          loader: 'url',
          query: {
            name: '[hash].[ext]',
            limit: 10000
          }
        }
      ]
    },
    plugins: []
      .concat(dev ? devPlugins : buildPlugins)
      .concat(new webpack.DefinePlugin({
        __DEV__: dev,
        __SERVER__: false,
        'process.env': {
          BROWSER: true,
          // This has effect on the react lib size
          NODE_ENV: JSON.stringify(dev ?  'development' : 'production'),
        },
      })),
    postcss: postCSSConfig
  }

  return config
}
