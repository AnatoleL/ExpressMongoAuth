import express from 'express'
import expressLoader from './express';
import mongooseLoader from './mongoose';
import logger from './logger';

/**
 * @function init Sets up the server.
 * @param app An express application.
 */
async function init(app: express.Application): Promise<void> {

    // we don't catch any connection issue,as it's necessarily fatal.
    await mongooseLoader()
        .then(() => logger.info('Database connected.'));

    await expressLoader(app)
        .then(() => logger.info('Express middlewares loaded'));
}

export default {init}