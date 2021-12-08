const {createLogger, transports, format} = require('winston')

const customLogger = createLogger({
	transports:[
		new transports.File({
			filename: 'error_logs.log',
			level: 'error',
			format: format.combine(format.timestamp(),format.json())
		}),
	]
})

module.exports = { customLogger }