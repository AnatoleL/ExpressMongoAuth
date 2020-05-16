import mongoose, { Mongoose } from 'mongoose';
import config from '../config';
import logger from './logger';

/**
 * @function mongooseLoader Connects to the mongoDb instance
 */
export default async function (): Promise<Mongoose> {
    logger.debug(`Connection URL: ${config.databaseURL}`);
    return mongoose.connect(config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => {
            logger.error(`Connection failed: ${err}`);
            logger.info('Shutting down... #TODO retry connection');
            process.exit(2);
        });
}