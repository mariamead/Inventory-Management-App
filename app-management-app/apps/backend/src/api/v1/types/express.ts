//import { FrontendProfile } from "@shared/types";
import { Request, Response, NextFunction } from "express";

/**
 * Express types
 */
export type MiddlewareFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;

// type of object in which keys must be strings and values can be anything
export type RequestBody = Record<string, unknown>

export type RequestData<T extends RequestBody = RequestBody> = {
    body: T,
    params: Record<string, string>,
    query: Record<string, string | string[]>;
}

// extend the Express namespace's Request interface via interface merging
declare global{
    namespace Express {
        export interface Request {
            auth: {
                userId: string | null;
                sessionId?: string | null;
                orgId?: string | null;
                claims?: Record<string, any>;
            };
            userId?: number|null; //DB user id
            role?: string | null;
            clerkUserId?: string|null; //clerk user Id
        }
    }
}