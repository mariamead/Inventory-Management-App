import { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import { AuthorizationError} from "../errors/errors";

export const requireSelfOrAdmin = async (
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId: clerkId } = getAuth(req);

        if(!clerkId) {
            throw new AuthorizationError("User not found", "USER_NOT_FOUND");
        }

        const requestedUserId = Number(req.params.id as string);
        if (isNaN(requestedUserId)) {
        throw new AuthorizationError("Invalid ID", "INVALID_ID");
        }

        const user = await clerkClient.users.getUser(clerkId);
        const role = user.publicMetadata?.role;

        if(role === "admin") {
            return next();
        }

        throw new AuthorizationError(
            "FORBIDDEN: NOT OWNER OR ADMIN", 
            "INSUFFICIENT_PERMISSIONS"
        );
        
    } catch (error: unknown) {
        next(error);
    }
}