'use strict'
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const OfflinePlugin = require('offline-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const rm = require('rimraf')
const base = require('./webpack.base')
const pkg = require('../package')
const _ = require('./utils')
const config = require('./config')
const Dotenv = require('dotenv-webpack')

if (config.platform === 'electron') {
  rm.sync('app/assets/*')
} else if (config.platform === 'mobile') {
  rm.sync('www/*')
  base.devtool = 'source-map'
} else {
  rm.sync('dist/*')
  base.devtool = 'source-map'
}

// use hash filename to support long-term caching
base.output.filename = '[name].[chunkhash:8].js'
// add webpack plugins
base.plugins.push(
  new ProgressPlugin(),
  new Dotenv({
    path: './.env',
  }),
  new ExtractTextPlugin('styles.[contenthash:8].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new UglifyJsPlugin({
    sourceMap: true,
    uglifyOptions: { ecma: 8 }
  }),
  // extract vendor chunks
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => {
      return module.resource && /\.(js|css|es6)$/.test(module.resource) && module.resource.indexOf('node_modules') !== -1
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  // progressive web app
  // it uses the publicPath in webpack config
  new OfflinePlugin({
    relativePaths: false,
    ServiceWorker: {
      events:true,
      navigateFallbackURL:'/'
    },
    AppCache: {
      events:true,
      FALLBACK:{ '/':'/' }
    }
  }),
  new BundleAnalyzerPlugin()
)

// extract css in standalone css files
_.cssProcessors.forEach(processor => {
  let loaders
  if (processor.loader === '') {
    loaders = ['postcss-loader']
  } else {
    loaders = ['postcss-loader', processor.loader]
  }
  base.module.loaders.push({
    test: processor.test,
    loader: ExtractTextPlugin.extract({
      use: [_.cssLoader].concat(loaders),
      fallback: 'style-loader'
    })
  })
})

// minimize webpack output
base.stats = {
  // Add children information
  children: false,
  // Add chunk information (setting this to `false` allows for a less verbose output)
  chunks: false,
  // Add built modules information to chunk information
  chunkModules: false,
  chunkOrigins: false,
  modules: false
}

module.exports = base
