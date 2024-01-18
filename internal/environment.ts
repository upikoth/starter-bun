const environment = {
	APP_PORT: '',
	APP_NAME: '',
	NODE_ENV: 'development' as NodeEnv,
	EMAIL_FROM: '',
	EMAIL_PASSWORD: '',
	FRONT_URL: ''
}

type NodeEnv = 'production' | 'development'

function checkIsNodeEnv(nodeEnv?: string): nodeEnv is NodeEnv {
	return ['production', 'development'].includes(nodeEnv as NodeEnv)
}

export async function loadEnvironmentVariables() {
	const { env } = process

	if (typeof env.APP_PORT !== 'string') {
		throw new Error('Не задана env переменная APP_PORT')
	}

	if (!checkIsNodeEnv(process.env.NODE_ENV)) {
		throw new Error('Не задана env переменная NODE_ENV')
	}

	if (typeof env.APP_NAME !== 'string') {
		throw new Error('Не задана env переменная APP_NAME')
	}

	if (typeof env.EMAIL_FROM !== 'string') {
		throw new Error('Не задана env переменная EMAIL_FROM')
	}

	if (typeof env.EMAIL_PASSWORD !== 'string') {
		throw new Error('Не задана env переменная EMAIL_PASSWORD')
	}

	if (typeof env.FRONT_URL !== 'string') {
		throw new Error('Не задана env переменная FRONT_URL')
	}

	Object.assign(environment, {
		APP_PORT: env.APP_PORT,
		APP_NAME: env.APP_NAME,
		NODE_ENV: env.NODE_ENV,
		EMAIL_FROM: env.EMAIL_FROM,
		EMAIL_PASSWORD: env.EMAIL_PASSWORD,
		FRONT_URL: env.FRONT_URL
	})
}

export default environment
