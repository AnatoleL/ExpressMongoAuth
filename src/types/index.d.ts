/* eslint-disable @typescript-eslint/no-unused-vars */
import { Interface } from "readline";
import { Document } from "mongoose";
import { IUser } from "../interfaces";
import { ResponseError } from "./Errors";

declare global {
    namespace Express {
        export interface Request {
            currentUser: IUser & Document;
        }
    }

    namespace Models {
        export type UserModel = Model<IUser & Document>;
    }
}