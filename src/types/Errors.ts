/* eslint-disable semi */
/**
 * @class Describes an error with a status field.
 */
export class ResponseError extends Error {

    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

/**
 * @class Describes an already existing user entry on signup with status 400
 * @argument email faulty email that will be written in the error message
 */
export class UserExistsError extends ResponseError { 
    constructor(email: string) {
        super(`User already exists: ${email}`, 400);
    }
}

/**
 * @class Describes an internal server error with status 500
 * @argument message error message that will be sent along to the user
 */
export class InternalServerError extends ResponseError {
    constructor() {
        super('Internal server error', 500);
    }
}