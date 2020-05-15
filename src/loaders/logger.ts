import winston from 'winston';

/**
 * @constructs logger A logger that will log in a file
 * and on the console depending on how urgent the message is
 */
export default winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({format: 'DD/MM hh:mm:ss'}),
        winston.format.align(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.errors({stack:false}),
            level: 'info'
        }),
        new winston.transports.File({
            filename: './winston.log',
            level: 'silly'
        })
    ]
});