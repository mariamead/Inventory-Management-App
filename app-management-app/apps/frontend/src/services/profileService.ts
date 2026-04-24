import { getProfile, updateProfile } from '../apis/profileRepo';

export type ProfileData = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    locationId?: number | null;
    locationName?: string | null;

}

export async function fetchProfileById(userId: string, token: string): Promise<ProfileData> {
    const profile = await getProfile(userId, token);
    return profile;
}

export async function updateUserProfile(userId: string, data: ProfileData, token: string): Promise<ProfileData> {
    const updatedProfile = await updateProfile(userId, data, token);
    return updatedProfile;
}