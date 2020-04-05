const { resolve } = require('path')

module.exports = function nuxtVTooltip(moduleOptions) {
  const options = { ...this.options.VTooltip, ...moduleOptions }

  this.addPlugin({
    src: resolve(__dirname, '../plugins/v-tooltip.js'),
    fileName: 'v-tooltip.js',
    options
  })
}

module.exports.meta = require('../package.json')
