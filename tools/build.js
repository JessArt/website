const webpack = require('webpack')
const config = require('./webpack-client.config.js')({ dev: false })

const compiler = webpack(config)

compiler.run((err, stats) => {
  console.log(err, stats)
})
