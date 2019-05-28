const chalk = require('chalk')

module.exports = async (ctx, next) => {
	const start = new Date()
	console.log(chalk.yellow(`> ${ctx.method}: ${ctx.path}`))
	await next()
	const duration = new Date() - start
	console.log(chalk[ctx.status == 200 ? 'green' : 'red'](`< status: ${ctx.status}  use: ${duration}ms`))
}
