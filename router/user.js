module.exports = ins => ({
	'get /': async ctx => {
		ctx.body = 'user'
	},
	'get /info': ins.$ctrl.user.info,
	'get /list': ins.$ctrl.user.list
})
