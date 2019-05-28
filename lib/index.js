const Koa = require('koa')
const { initRouter, loadConf, loadController } = require('./loader')
const chalk = require('chalk')

module.exports = class {
	constructor() {
		this.$app = new Koa()
		loadController(this)
		loadConf(this.$app)
		this.$app.use(initRouter(this).routes())
	}
	start(port) {
		this.$app.listen(port, () => {
			console.log(`app is running on ${chalk.blue(`http://localhost:${port}`)}`)
		})
	}
}
