import { testProfiles, type Profile } from './profileData';

let profiles: Profile[] = [...testProfiles];

export const profileRepository = {
  /**
   * Get all profiles
   * @returns Array of all profiles
   */
  getAll(): Profile[] {
    return [...profiles];
  },

  /**
   * Get a profile by ID
   * @param id - The profile ID
   * @returns The profile if found, undefined otherwise
   */
  getById(id: string): Profile | undefined {
    return profiles.find(profile => profile.id === id);
  },

  /**
   * Create a new profile
   * @param newProfile - The profile data
   * @returns The created profile with generated ID
   */
  create(newProfile: Omit<Profile, 'id'>): Profile {
    // Generate new ID
    const maxId = profiles.length > 0 
      ? Math.max(...profiles.map(p => {
          const numId = parseInt((p.id || '').replace('user-', ''));
          return isNaN(numId) ? 0 : numId;
        })) 
      : 0;
    const id = `user-${maxId + 1}`;
    
    const profile: Profile = { 
      id, 
      ...newProfile 
    };
    
    profiles.push(profile);
    return profile;
  },

  /**
   * Update an existing profile
   * @param id - The profile ID
   * @param updatedData - The updated profile data
   * @returns The updated profile if successful, undefined otherwise
   */
  update(id: string, updatedData: Partial<Omit<Profile, 'id'>>): Profile | undefined {
    const index = profiles.findIndex(p => p.id === id);
    
    if (index !== -1) {
      profiles[index] = { 
        ...profiles[index], 
        ...updatedData 
      };
      return profiles[index];
    }
    
    return undefined;
  },

  /**
   * Delete a profile
   * @param id - The profile ID
   * @returns True if deleted successfully, false otherwise
   */
  delete(id: string): boolean {
    const initialLength = profiles.length;
    profiles = profiles.filter(p => p.id !== id);
    return profiles.length < initialLength;
  },

  /**
   * Reset profiles to test data
   */
  reset(): void {
    profiles = [...testProfiles];
  }
};

