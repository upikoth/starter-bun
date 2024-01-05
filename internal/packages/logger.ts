import winston from 'winston'

import environment from '@/environment'

enum LogFiles {
	Error = 'logs/error-logs.log',
	All = 'logs/all-logs.log'
}

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.json(),
		winston.format.timestamp(),
		winston.format.prettyPrint()
	),
	exitOnError: false,
	defaultMeta: { service: environment.APP_NAME },
	transports: [
		new winston.transports.File({
			filename: LogFiles.Error,
			level: 'error'
		}),
		new winston.transports.File({ filename: LogFiles.All })
	]
})

if (environment.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.timestamp(),
			winston.format.simple()
		)
	}))
}

export { logger }
