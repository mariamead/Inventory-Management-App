import { profileRepository } from "../apis/profileRepo";
//This is just a mock service to ensure I don't have Vercel failures and should be updated with the real service file.
export type Profile = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}


export async function fetchProfileById(userId: string): Promise<Profile> {
    const profile = profileRepository.getById(userId);
    if (!profile) throw new Error("Profile not found");
    return profile;
}
export async function updateUserProfile(userId: string, data: Profile): Promise<Profile> {
    const updated = profileRepository.update(userId, data);
    if (!updated) throw new Error("Failed to update profile");
    return updated;
}