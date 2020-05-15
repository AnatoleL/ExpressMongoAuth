const bodyParser = require('body-parser');
const helmet = require('helmet');
const winston = require('winston');
const expressWinston = require('express-winston');

/**
 * @function load Loads eevery express middleware.
 * @argument app An express application.
 */
async function load(app : any) {
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
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            }),
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true
            })
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        )
    }));
}

module.exports = {load};