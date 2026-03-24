import type { UserProfile, UpdateProfileData } from '@shared/types/userProfile';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get user profile by ID
 * @param id - The user ID
 * @returns - The user profile if found, null otherwise
 */
export const getProfileById = async (id: string): Promise<UserProfile | null> => {
    try {
        const userProfile = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        return userProfile;
    } catch (error) {
        console.error('User profile not found:', error);
        throw error;
    }
};

/**
 * Update user profile by ID
 * @param id - The user ID
 * @param data - The updated profile data
 * @returns - The updated user profile
 */
export const updateProfile = async (
    id: string,
    data: UpdateProfileData
): Promise<UserProfile> => {
    try {
        const updatedProfile = await prisma.user.update({
            where: { id: parseInt(id) },
            data: data,
        });
        return updatedProfile;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

/**
 * Get all user profiles
 * @returns - All user profiles
 */
export const getAllProfiles = async (): Promise<UserProfile[]> => {
    try {
        const profiles = await prisma.user.findMany();
        return profiles;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
};