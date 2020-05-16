import mongoose from 'mongoose';

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

export default mongoose.model<Models.UserModel>('User', User);