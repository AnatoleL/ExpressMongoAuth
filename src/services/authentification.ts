import { BadCredentialsError, UserNotFoundError, UserExistsError, InternalServerError } from "../types/Errors";
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

    logger.debug(`email: ${email}`);
    logger.debug(`password: ${password}`);

    // check if this email address is already taken
    const exists = await UserModel.exists({email});
    if (exists) {
        throw new UserExistsError(email);
    }

    // We're good, we can start hashing some passwords
    const hash = await hashPassword(password)
        .catch((err: InternalServerError) => {
            logger.error(`Signup failed: hash failed`);
            throw err; // log any hashing fail but let caller handle it
        });

    // Fiou, that worked, now try to insert the created user in the db
    const userRecord = await UserModel.create({email, hash})
        .catch((err: Error) => {
            logger.error(`Signup failed: user insertion failed`);
            logger.debug(err);
            throw err;
        });

    // Alright, one last thing ! We need a token
    const {secret} = config;
    const token = jwt.sign({id:userRecord._id}, secret);
 
    // done.
    logger.info(`Signup succeeded: ${email}`);
    return token;
}

export async function login(email: string, password: string): Promise<string> {
    logger.debug(`email: ${email}`);
    logger.debug(`password: ${password}`);

    // Okay, first let's check if this user actually exists...
    const userRecord = await UserModel.findOne({email});
    if (!userRecord)
        throw new UserNotFoundError(email);

    // Did he provide the right password ?
    const match = await bcrypt.compare(password, userRecord.hash);
    if (!match)
        throw new BadCredentialsError(email);

    // Alright, one last thing ! We need a token
    const {secret} = config;
    const token = jwt.sign({id:userRecord._id}, secret);

    // done
    logger.info(`Login succeeded: ${email}`);
    logger.debug(`Issued token ${token}`);
    return token;
}