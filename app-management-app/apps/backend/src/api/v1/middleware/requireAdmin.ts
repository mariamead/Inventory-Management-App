import { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import { AuthorizationError} from "../errors/errors";

export const requireAdmin = async (
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = getAuth(req);

        if(!userId) {
            throw new AuthorizationError("User not found", "USER_NOT_FOUND");
        }

        const user = await clerkClient.users.getUser(userId);

        const role = user.publicMetadata?.role;
        if(role !== "admin") {
            throw new AuthorizationError(
                "Forbidden: Insufficient role", 
                "INSUFFICIENT_ROLE"
            );
        }

        next();

    } catch (error: unknown) {
        next(error);
    }
};