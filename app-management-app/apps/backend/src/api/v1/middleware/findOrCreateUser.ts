import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import * as profileService from "../services/profileService";
import { User } from "@prisma/client";

/**
 * If a sessionToken is included in Authorization header, get userId from Clerk
 * If user does not exist, add user to back-end database
 */
export const findOrCreateUser = async(
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // clerk getAuth method authenticates user against HTTP request Authorization heading
        const auth = getAuth(req);
        const clerkId = auth.userId;
        console.log("CLERK ID:", clerkId);

        if(clerkId) {
             const existingUser: User | null = await profileService.getProfileByClerkId(clerkId);

            const backendUser: User = existingUser ?? await profileService.createProfile(clerkId);
            req.userId = backendUser.id;
        } else {
            req.userId = null;
        }

        next();
    } catch(error) {
        next(error);
    }
}