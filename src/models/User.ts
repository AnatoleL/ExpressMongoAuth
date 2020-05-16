import mongoose, { Document } from 'mongoose';
import { IUser } from '../interfaces';

/**
 * @Schema User
 * @field email string required (user's email)
 * @field hash string required (hashed password)
 */
const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true
    }
});

export default mongoose.model<IUser & Document>('User', User);