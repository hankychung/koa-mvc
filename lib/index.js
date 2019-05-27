const Koa = require('koa')
const { initRouter } = require('./loader')
const chalk = require('chalk')

class Hoa {
	constructor() {
		this.app = new Koa()
		this.app.use(initRouter().routes())
	}
	start(port) {
		this.app.listen(port, () => {
			console.log(`app is running on ${chalk.blue(`http://localhost:${port}`)}`)
		})
	}
}

module.exports = Hoa