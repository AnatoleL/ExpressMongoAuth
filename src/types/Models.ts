import {Model, Document} from 'mongoose';
import {IUser} from '../interfaces';

export type UserModel = Model<IUser & Document>;