import mongoose from 'mongoose';
import config from '../config';

export default async function (): Promise<void> {
    await mongoose.connect(config.databaseURL, { useNewUrlParser: true, });
}