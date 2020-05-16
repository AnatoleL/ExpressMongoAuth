import { UserExistsError, InternalServerError } from "../types/Errors";
import UserModel from '../models/User';
import bcrypt from 'bcrypt';
import config from '../config';
import logger from '../loaders/logger';
import jwt from 'jsonwebtoken';

/**
 * @function hashPassword Hashes a password using bcrypt.
 * @param password {string} The password to hash.
 */
async function hashPassword(password: string): Promise<string> {
    const {saltRounds} = config;
    return bcrypt.hash(password, saltRounds)
        .catch(() => {throw new InternalServerError();});
}

/**
 * @function signup Create a user entry for these credentials
 * @param email {string} User email
 * @param password {string} User password
 * @returns Promise<string> A token for this user
 */
export async function signup(email: string, password: string): Promise<string> {

    logger.debug(`Trigger signup function with ${email} and ${password}`);

    // check if this email address is already taken
    const exists = UserModel.exists({email});
    if (exists) {
        logger.silly(`Signup failed: ${email} already taken`)
        throw new UserExistsError(email);
    }

    // We're good, we can start hashing some passwords
    const hash = await hashPassword(password)
        .catch((err: InternalServerError) => {
            logger.error(`Signup failed: hash failed`);
            throw err; // log any hashing fail but let caller handle it
        });

    // Fiou, that worked, now try to insert the created user in the db
    const userRecord = await UserModel.create(email, hash)
        .catch((err: Error) => {
            logger.error(`Signup failed: user insertion failed`);
            logger.debug(err);
            throw err;
        });

    // Alright, one last thing ! We need a token
    const {secret} = config;
    const token = jwt.sign(userRecord._id, secret);
  
    // done.
    return token;
}
