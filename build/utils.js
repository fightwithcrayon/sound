'use strict'
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./config')

const _ = module.exports = {}

_.cwd = (file) => {
  return path.join(process.cwd(), file || '')
}

_.cssLoader = config.cssModules ?
  'css-loader?-autoprefixer&modules&importLoaders=1&localIdentName=[local]' :
  'css-loader?-autoprefixer'

_.cssProcessors = [
  {loader: '', test: /\.css$/},
  {loader: 'sass-loader', options: { sourceMap: true }, test: /\.scss$/},
  {loader: 'less-loader', options: { sourceMap: true }, test: /\.less$/},
  {loader: 'stylus-loader', options: { sourceMap: true }, test: /\.styl$/},
  {loader: 'sass-loader?indentedSyntax', options: { sourceMap: true }, test: /\.sass$/},
]

if (config.platform === 'electron') {
  _.outputPath = path.join(__dirname, '../app/dist')
  _.inputIndexPath = path.resolve(__dirname, 'index.html')
  _.outputIndexPath = path.join(__dirname, '../app/dist/index.html')
  _.target = 'electron-renderer'
} else if (config.platform === 'mobile') {
  _.outputPath = path.join(__dirname, '../www')
  _.inputIndexPath = path.resolve(__dirname, 'index-cordova.html')
  _.outputIndexPath = path.join(__dirname, '../www/index.html')
  _.target = 'web'
} else {
  _.outputPath = path.join(__dirname, '../dist')
  _.inputIndexPath = path.resolve(__dirname, 'index.html')
  _.outputIndexPath = path.join(__dirname, '../dist/index.html')
  _.target = 'web'
}

// https://github.com/egoist/vbuild/blob/master/lib/vue-loaders.js
_.loadersOptions = () => {
  const isProd = process.env.NODE_ENV === 'production'

  function generateLoader(langs) {
    langs.unshift('css-loader?sourceMap&-autoprefixer')
    if (!isProd) {
      return ['vue-style-loader'].concat(langs).join('!')
    }
    return ExtractTextPlugin.extract({
      fallback: 'vue-style-loader',
      use: langs.join('!')
    })
  }

  return {
    minimize: isProd,
    options: {
      // css-loader relies on context
      context: process.cwd(),
      vue: {
        loaders: {
          css: generateLoader([]),
          sass: generateLoader(['sass-loader?indentedSyntax&sourceMap']),
          scss: generateLoader(['sass-loader?sourceMap']),
          less: generateLoader(['less-loader?sourceMap']),
          stylus: generateLoader(['stylus-loader?sourceMap']),
          js: 'babel-loader'
        }
      }
    }
  }
}
