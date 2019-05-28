const path = require('path')
const fs = require('fs')
const Router = require('koa-router')

const resolve = pathName => path.resolve(__dirname, '../', pathName)

function walk(dir, cb) {
	fs.readdirSync(resolve(dir)).map(fileName => fileName.replace('.js', '')).forEach(fileName => {
		cb(fileName, require(resolve(`${dir}/${fileName}`)))
	})
}

function initRouter(ins) {
	const router = new Router()
	walk('router', (fileName, routes) => {
		const prefix = fileName === 'index' ? '' : `/${fileName}`
		if (typeof routes === 'function') routes = routes(ins)
		Object.keys(routes).forEach(route => {
			const [method, path] = route.split(' ')
			router[method](prefix + path, routes[route])
		})
	})
	return router
}

function loadConf(app) {
	walk('config', (fileName, config) => {
		let runMids = config.middleware
		runMids && runMids.length && runMids.forEach(midName => {
			app.use(require(resolve(`middleware/${midName}`)))
		})
	})
}

function loadController(ins) {
	ins.$ctrl = {}
	walk('controller', (fileName, ctrls) => {
		Object.keys(ctrls).forEach(ctrl => {
			if (!ins.$ctrl[fileName]) ins.$ctrl[fileName] = {}
			ins.$ctrl[fileName][ctrl] = ctrls[ctrl]
		})
	})
}

module.exports = { initRouter, loadConf, loadController }
