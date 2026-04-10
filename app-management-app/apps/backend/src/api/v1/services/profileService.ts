import type { FrontendProfile } from '@shared/types/frontend-profile';
import  prisma  from "../../../../prisma/prismaClient";
import { clerkClient } from '@clerk/express';
import { User } from "@prisma/client";

const profileSelect = {
    id: true,
    name: true,
    email: true,
    phone: true,
    address: true,
};

// Map to front end profile
const mapToFrontendProfile = (profile: any): FrontendProfile => ({
    id: profile.id.toString(),
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
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
export const getProfileByClerkId = async (clerkId: string): Promise<User> => {
    return prisma.user.findFirst({
        where: { clerkId }
    });
};

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
    id: string,
    data: Partial<Omit<FrontendProfile, 'id'>>
): Promise<FrontendProfile> => {
    try {
        const updatedProfile = await prisma.user.update({
            where: { id: parseInt(id) },
            data: data,
            select: profileSelect
        });
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