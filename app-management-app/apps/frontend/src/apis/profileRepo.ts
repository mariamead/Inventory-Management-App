import type { FrontendProfile } from "@shared/types/frontend-profile"
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const PROFILE_ENDPOINT = "/user-profile";

type APIResponse<T> = { 
  status: string; 
  message?: string; 
  data: T;
  error?: {message: string; code?: string} 
};


// let profiles: Profile[] = [...testProfiles];

// export const profileRepository = {
//   /**
//    * Get all profiles
//    * @returns Array of all profiles
//    */
//   getAll(): Profile[] {
//     return [...profiles];
//   },

//   /**
//    * Get a profile by ID
//    * @param id - The profile ID
//    * @returns The profile if found, undefined otherwise
//    */
//   getById(id: string): Profile | undefined {
//     return profiles.find(profile => profile.id === id);
//   },

//   /**
//    * Create a new profile
//    * @param newProfile - The profile data
//    * @returns The created profile with generated ID
//    */
//   create(newProfile: Omit<Profile, 'id'>): Profile {
//     // Generate new ID
//     const maxId = profiles.length > 0 
//       ? Math.max(...profiles.map(p => {
//           const numId = parseInt((p.id || '').replace('user-', ''));
//           return isNaN(numId) ? 0 : numId;
//         })) 
//       : 0;
//     const id = `user-${maxId + 1}`;
    
//     const profile: Profile = { 
//       id, 
//       ...newProfile 
//     };
    
//     profiles.push(profile);
//     return profile;
//   },

//   /**
//    * Update an existing profile
//    * @param id - The profile ID
//    * @param updatedData - The updated profile data
//    * @returns The updated profile if successful, undefined otherwise
//    */
//   update(id: string, updatedData: Partial<Omit<Profile, 'id'>>): Profile | undefined {
//     const index = profiles.findIndex(p => p.id === id);
    
//     if (index !== -1) {
//       profiles[index] = { 
//         ...profiles[index], 
//         ...updatedData 
//       };
//       return profiles[index];
//     }
    
//     return undefined;
//   },

//   /**
//    * Delete a profile
//    * @param id - The profile ID
//    * @returns True if deleted successfully, false otherwise
//    */
//   delete(id: string): boolean {
//     const initialLength = profiles.length;
//     profiles = profiles.filter(p => p.id !== id);
//     return profiles.length < initialLength;
//   },

//   /**
//    * Reset profiles to test data
//    */
//   reset(): void {
//     profiles = [...testProfiles];
//   }
// };

// Generic fetch wrapper
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return response.json() as Promise<T>;
}

/**
 * Get all profiles from the backend
 * @returns Array of profiles from database
 */
export const getAllProfiles = async (): Promise<FrontendProfile[]> => {
  const json = await apiFetch<APIResponse<FrontendProfile[]>>(`${API_BASE_URL}${PROFILE_ENDPOINT}`);
  return json.data;
};

/**
 * Get a single profile by ID from the backend
 * @param id - The profile ID
 * @param token - The user's session token
 * @returns The profile data
 */
export const getProfile = async (id: string, token: string): Promise<FrontendProfile> => {
  const json = await apiFetch<APIResponse<FrontendProfile>>(`${API_BASE_URL}${PROFILE_ENDPOINT}/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return json.data;
};

/**
 * Update a profile through the backend
 * @param id - The profile ID
 * @param updatedData - The data to update
 * @param token - The user's session token
 * @returns The updated profile
 */
export const updateProfile = async (
  id: string,
  updatedData: Partial<Omit<FrontendProfile, 'id'>>,
  token: string
): Promise<FrontendProfile> => {
  const json = await apiFetch<APIResponse<FrontendProfile>>(
    `${API_BASE_URL}${PROFILE_ENDPOINT}/${id}`,
    {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedData),
    }
  );
  return json.data;
};