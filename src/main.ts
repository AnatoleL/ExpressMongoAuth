import express from 'express';
import loaders from './loaders';
import config from './config';
import logger from './loaders/logger';


/**
 * @function startServer Starts the API server
 * 
 * It'll start by loading the configuration from the loaders (MongoDB, express middlwares, etc..)
 * and then start listening on the config port
 */
async function startServer(): Promise<void> {
    const app: express.Application = express();

    logger.info(`Running loaders`);
    await loaders.init(app);

    app.listen(config.port, () => { logger.info(`Listening on PORT ${config.port}`); });
}

startServer();