import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import winston from 'winston';
import expressWinston from 'express-winston';

/**
 * @function expressLoader Loads every express middleware.
 * @argument express.Application An express application.
 */
export default async function (app: express.Application): Promise<void> {
    app.use(bodyParser);

    // security fixing module
    app.use(helmet);

    // setting up a logger
    app.use(expressWinston.logger({
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: './logs/all-logs.log',
                handleExceptions: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
            }),
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
            })
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        )
    }));
}