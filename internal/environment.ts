if (typeof process.env.APP_PORT !== 'string') {
	throw new Error('Не задана env переменная APP_PORT')
}

if (!checkIsNodeEnv(process.env.NODE_ENV)) {
	throw new Error('Не задана env переменная NODE_ENV')
}

if (typeof process.env.APP_NAME !== 'string') {
	throw new Error('Не задана env переменная APP_NAME')
}

export default {
	APP_PORT: process.env.APP_PORT,
	NODE_ENV: process.env.NODE_ENV,
	APP_NAME: process.env.APP_NAME
}

type NodeEnv = 'production' | 'development'

function checkIsNodeEnv(nodeEnv?: string): nodeEnv is NodeEnv {
	return ['production', 'development'].includes(nodeEnv as NodeEnv)
}
