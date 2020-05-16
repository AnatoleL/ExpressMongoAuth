import winston from 'winston';
import config from '../config';

/**
 * @constructs logger A logger that will log in a file
 * and on the console depending on how urgent the message is
 */
export default winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({format: 'DD/MM hh:mm:ss'}),
                winston.format.align(),
                winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
                winston.format.errors({stack:false})
            ),
            level: config.infoLevel
        }),
        new winston.transports.File({
            format: winston.format.combine(
                winston.format.timestamp({format: 'DD/MM hh:mm:ss'}),
                winston.format.align(),
                winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
                winston.format.errors({stack:true})
            ),
            filename: './winston.log',
            level: 'silly'
        })
    ]
});