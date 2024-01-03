if (typeof process.env.APP_PORT !== 'string') {
	throw new Error('Не задана env переменная APP_PORT')
}

if (!checkIsNodeEnv(process.env.NODE_ENV)) {
	throw new Error('Не задана env переменная NODE_ENV')
}

if (typeof process.env.APP_NAME !== 'string') {
	throw new Error('Не задана env переменная APP_NAME')
}

if (typeof process.env.EMAIL_FROM !== 'string') {
	throw new Error('Не задана env переменная EMAIL_FROM')
}

if (typeof process.env.EMAIL_PASSWORD !== 'string') {
	throw new Error('Не задана env переменная EMAIL_PASSWORD')
}

if (typeof process.env.FRONT_URL !== 'string') {
	throw new Error('Не задана env переменная FRONT_URL')
}

export default {
	APP_PORT: process.env.APP_PORT,
	NODE_ENV: process.env.NODE_ENV,
	APP_NAME: process.env.APP_NAME,
	EMAIL_FROM: process.env.EMAIL_FROM,
	EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
	FRONT_URL: process.env.FRONT_URL
}

type NodeEnv = 'production' | 'development'

function checkIsNodeEnv(nodeEnv?: string): nodeEnv is NodeEnv {
	return ['production', 'development'].includes(nodeEnv as NodeEnv)
}
