import express from 'express'
import expressLoader from './express';

/**
 * @function init Sets up the server
 * @param app An express application
 */
async function init(app: express.Application): Promise<void> {

    // log('setting up mongodb connection');
    // await mongoLoader();

    await expressLoader(app);
}

export default {init}