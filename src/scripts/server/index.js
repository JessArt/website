/* global __DEV__ */
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import getConfig from '../../../tools/webpack-client.config.js'

const app = express()

if (__DEV__) {
  const config = getConfig({ dev: true })
  const compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler, {
    // publicPath: config.output.publicPath,
    stats: {colors: true}
  }))

  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }))
}

app.use(express.static(process.cwd() + '/build'))

// app.get('/', (req, res) => {
//   res.send('Hello world!')
// })

app.listen(9090, () => {
  console.log('app listening on 9090!')
})
