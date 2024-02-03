const environment = {
	APP_PORT: '',
	APP_NAME: '',
	NODE_ENV: 'development' as NodeEnv,
	EMAIL_FROM: '',
	EMAIL_PASSWORD: '',
	FRONT_URL: '',
	S3_REGION: '',
	S3_ENDPOINT: '',
	S3_ACCESS_KEY_ID: '',
	S3_SECRET_ACCESS_KEY: '',
	S3_BUCKET_NAME: ''
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

	if (typeof env.S3_REGION !== 'string') {
		throw new Error('Не задана env переменная S3_REGION')
	}

	if (typeof env.S3_ENDPOINT !== 'string') {
		throw new Error('Не задана env переменная S3_ENDPOINT')
	}

	if (typeof env.S3_ACCESS_KEY_ID !== 'string') {
		throw new Error('Не задана env переменная S3_ACCESS_KEY_ID')
	}

	if (typeof env.S3_SECRET_ACCESS_KEY !== 'string') {
		throw new Error('Не задана env переменная S3_SECRET_ACCESS_KEY')
	}

	if (typeof env.S3_BUCKET_NAME !== 'string') {
		throw new Error('Не задана env переменная S3_BUCKET_NAME')
	}

	Object.assign(environment, {
		APP_PORT: env.APP_PORT,
		APP_NAME: env.APP_NAME,
		NODE_ENV: env.NODE_ENV,
		EMAIL_FROM: env.EMAIL_FROM,
		EMAIL_PASSWORD: env.EMAIL_PASSWORD,
		FRONT_URL: env.FRONT_URL,
		S3_REGION: env.S3_REGION,
		S3_ENDPOINT: env.S3_ENDPOINT,
		S3_ACCESS_KEY_ID: env.S3_ACCESS_KEY_ID,
		S3_SECRET_ACCESS_KEY: env.S3_SECRET_ACCESS_KEY,
		S3_BUCKET_NAME: env.S3_BUCKET_NAME
	})
}

export default environment
