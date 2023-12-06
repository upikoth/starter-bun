if (typeof process.env.APP_PORT !== 'string') {
	throw new Error('Не задана env переменная APP_PORT')
}

export default {
	APP_PORT: process.env.APP_PORT
}
