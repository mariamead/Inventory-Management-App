import { HTTP_STATUS } from "../../../../src/constants/httpConstants";

export class AppError extends Error {

    constructor(
        public message: string,
        public code: string,
        public statusCode: number
    ) { 
        super(message); 
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);

    }

}

/**
 * Class representing an authorization error.
 * Used for insufficient permissions and role validation failures.
 */
export class AuthorizationError extends AppError {
    constructor(
        message: string,
        code: string = "AUTHORIZATION_ERROR",
        statusCode: number = HTTP_STATUS.FORBIDDEN
    ) {
        super(message, code, statusCode);
    }
}
