import { getProfile, updateProfile } from '../apis/profileRepo';

export type ProfileData = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export async function fetchProfileById(userId: string): Promise<ProfileData> {
    const profile = await getProfile(userId);
    return profile;
}

export async function updateUserProfile(userId: string, data: ProfileData): Promise<ProfileData> {
    const updatedProfile = await updateProfile(userId, data);
    return updatedProfile;
}