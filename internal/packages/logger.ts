import winston from 'winston'

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
	transports: [
		new winston.transports.File({
			filename: LogFiles.Error,
			level: 'error'
		}),
		new winston.transports.File({ filename: LogFiles.All })
	]
})

interface ILoggerOptions {
	appName: string;
	environment: 'production' | 'development';
}

export function initLogger(options: ILoggerOptions) {
	logger.defaultMeta = { service: options.appName }

	if (options.environment !== 'production') {
		logger.add(new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.timestamp(),
				winston.format.simple()
			)
		}))
	}
}

export { logger }
