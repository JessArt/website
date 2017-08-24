const webpack = require('webpack')
const path = require('path')

const cwd = process.cwd()
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function getConfig (params) {
  const dev = params.dev

  const devEntries = dev
    ? [
      // For hot style updates
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server'
    ] : []

  const devPlugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

  const buildPlugins = [
    new ExtractTextPlugin({ filename: 'styles.css' }),
    new webpack.optimize.UglifyJsPlugin(),
    // Copy directory contents to {output}/to/directory/
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '..', 'src', 'assets', 'favicons'),
        to: path.join(__dirname, '..', 'build', 'public')
      }
    ])
  ]

  const cssLoader = dev
    ? ['style-loader', 'css-loader', 'postcss-loader']
    : ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader']
    })

  const sassLoader = dev
    ? [
      'style-loader',
      'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
      {
        loader: 'sass-loader',
        options: {
          indentedSyntax: true
        }
      }
    ]: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
        {
          loader: 'sass-loader',
          options: {
            indentedSyntax: true
          }
        }
      ]
    })

  const config = {
    // eval - Each module is executed with eval and //@ sourceURL.
    devtool: dev ? 'eval' : 'source-maps',
    // The configuration for the client
    name: 'browser',
    entry: []
      .concat('isomorphic-fetch')
      .concat('babel-polyfill')
      .concat(devEntries)
      .concat('./src/client/index.js'),
    output: {
      path: path.resolve(cwd, 'build/public'),
      publicPath: '/',
      filename: 'client.js'
    },
    module: {
      rules: [
        {
          /*
           * TC39 categorises proposals for babel in 4 stages
           * Read more http://babeljs.io/docs/usage/experimental/
           */
          test: /\.js$|\.jsx$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
              presets: []
              .concat(dev ? 'react-hmre' : [])
              .concat(['react', 'es2015', 'stage-1']),
              plugins: ['transform-decorators-legacy']
            }
          }
        },
        {
          test: /\.css$/,
          loader: cssLoader
        },
        {
          test: /\.sass$/,
          use: sassLoader
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          loader: 'url-loader',
          options: {
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
          NODE_ENV: JSON.stringify(dev ?  'development' : 'production')
        }
      }))
  }

  return config
}
