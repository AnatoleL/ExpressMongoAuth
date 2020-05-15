import winston from 'winston';

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