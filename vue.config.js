const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/sikb-front/'
    : '/',
  productionSourceMap: false,
  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000,
      }
    },
    resolve: {
      modules: ['node_modules', 'src/resources']
    }
  },
}
