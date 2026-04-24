import type { FrontendProfile } from '@shared/types/frontend-profile';
import  prisma  from "../../../../prisma/prismaClient";
import { clerkClient } from '@clerk/express';
import { User } from "@prisma/client";

const profileSelect = {
    id: true,
    clerkId: true,
    name: true,
    email: true,
    phone: true,
    address: true,
    locationId: true,
    location: true
};

// Map to front end profile
const mapToFrontendProfile = (profile: any): FrontendProfile => ({
    id: profile.id.toString(),
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    locationId: profile.locationId,
    locationName: profile.location?.name ?? null,
});

/**
 * Get user profile by ID
 * @param id - The user ID
 * @returns - The user profile if found, null otherwise
 */
export const getProfileById = async (id: string): Promise<FrontendProfile | null> => {
    try {
        const userProfile = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            select: profileSelect
        });

        return userProfile ? mapToFrontendProfile(userProfile) : null;

    } catch (error) {
        console.error('User profile not found:', error);
        throw error;
    }
};

/**
 * This is to get profile by ClerkId when trying to Auth.
 * @param clerkId - The string id provided by clerk for Auth
 * @returns the corresponding correct Profile
 */
export const getProfileByClerkId = async (clerkId: string): Promise<User|null> => {
    return prisma.user.findFirst({
        where: { clerkId },
        include: {
            location: true,
        },
    });
};

/**
 * Function to create a user when user registers using clerk.
 * @param clerkId -String id from clerk to identify user
 * @returns - user that was created by Clerk
 */
export const createProfile = async (clerkId: string): Promise<User> => {
    const clerkUser = await clerkClient.users.getUser(clerkId);

    const email = clerkUser.emailAddresses[0]?.emailAddress ?? "unknown";

    const name = clerkUser.firstName && clerkUser.lastName
        ? `${clerkUser.firstName} ${clerkUser.lastName}`
        : clerkUser.firstName ?? "unknown";

    const newUser = await prisma.user.upsert({
        where: { clerkId },
        update: {},
        create: {
            clerkId,
            email,
            name,
            phone: "000-000-0000",
            address: "unknown",
            locationId: null,
        },
    });
    return newUser;

}

/**
 * Update user profile by ID
 * @param id - The user ID
 * @param data - The updated profile data
 * @returns - The updated user profile
 */
export const updateProfile = async (
    clerkId: string,
    data: Partial<Omit<FrontendProfile, 'id'>>
): Promise<FrontendProfile> => {
    try {
        const { name, email, phone, address, locationId } = data;
        const updatedProfile = await prisma.user.update({
            where: { clerkId },
            data: {
                name,
                email,
                phone,
                address,
                locationId,
            },
            select: profileSelect
        });

        // Added update to clerk so that the info and clerk will remain synced.
        //Only happens if clerkId exists and the following fields are changed.
        if(updatedProfile.clerkId && (data.email || data.name)) {
            const [firstName, ...lastNameParts] = (data.name || "").split(/\s+/);
            const lastName = lastNameParts.join(" ");

            await clerkClient.users.updateUser(updatedProfile.clerkId, {
                firstName:  firstName || "User",
                lastName:lastName || undefined,
                ...(data.email ? { emailAddress: [data.email] } : {})
            });
        
        }
        return mapToFrontendProfile(updatedProfile);
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

/**
 * Get all user profiles
 * @returns - All user profiles
 */
export const getAllProfiles = async (): Promise<FrontendProfile[]> => {
    try {
        const profiles = await prisma.user.findMany({
            select: profileSelect
        });
        return profiles.map(mapToFrontendProfile);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
};