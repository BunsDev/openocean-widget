process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
	publicPath: process.env.VUE_APP_RES_URL,
	productionSourceMap: false,
	chainWebpack: config => {
		config.plugins.delete('prefetch');
		config.plugins.delete('preload');
	},
	configureWebpack: {
		devtool: 'source-map',
	},
	css: {
		sourceMap: false
	},
	devServer: {
		overlay: {
		  warnings: false,
		  errors: false
		}
	}
}
