
//This is just a mock service to ensure I don't have Vercel failures and should be updated with the real service file.
export type ProfileData = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export async function fetchProfileById(_userId: string): Promise<ProfileData> {
    void _userId; // to ensure no linting issues.
    return {name: "", email: "", phone: "", address: ""};
}
export async function updateUserProfile(_userId: string, data: ProfileData): Promise<ProfileData> {
    return data;
}