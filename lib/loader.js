const path = require('path')
const fs = require('fs')
const Router = require('koa-router')

const resolve = pathName => path.resolve(__dirname, '../', pathName)

function walk(dir, cb) {
	fs.readdirSync(resolve(dir)).map(fileName => fileName.replace('.js', '')).forEach(fileName => {
		cb(fileName, require(resolve(`${dir}/${fileName}`)))
	})
}

function initRouter() {
	const router = new Router()
	walk('router', (fileName, routes) => {
		const prefix = fileName === 'index' ? '' : `/${fileName}`
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

module.exports = { initRouter, loadConf }
