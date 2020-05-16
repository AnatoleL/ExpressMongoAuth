import { IUser } from '../interfaces';
import { Document } from 'mongoose';

export interface Request {
    currentUser: IUser & Document;
}