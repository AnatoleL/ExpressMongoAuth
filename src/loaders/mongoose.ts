import mongoose, { Mongoose } from 'mongoose';
import config from '../config';

/**
 * @function mongooseLoader Connects to the mongoDb instance
 */
export default async function (): Promise<Mongoose> {
    // #TODO retry if connection failed
    return mongoose.connect(config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
}