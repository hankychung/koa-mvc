module.exports = {
	info: ctx => {
		ctx.body = 'userInfo from controller'
	},
	list: ctx => {
		ctx.body = ['han', 'mike']
	}
}
