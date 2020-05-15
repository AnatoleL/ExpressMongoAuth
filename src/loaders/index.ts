import express from 'express'
import expressLoader from './express';
import mongooseLoader from './mongoose';

/**
 * @function init Sets up the server.
 * @param app An express application.
 */
async function init(app: express.Application): Promise<void> {

    // we don't catch any connection issue,as it's necessarily fatal.
    await mongooseLoader()
        .then(() => console.info('Database connected.'));

    await expressLoader(app)
        .then(() => console.info('Express middlewares loaded'));
}

export default {init}