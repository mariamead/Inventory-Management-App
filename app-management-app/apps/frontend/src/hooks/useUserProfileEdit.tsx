import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as ProfileService from "../services/profileService";
import type { ProfileData } from "../services/profileService";
import { FrontendProfile } from "@shared/types";

// extracting error message
const getErrorMessage = (err: unknown) : string =>
    err instanceof Error ? err.message : 'Unknown error';


/**
 * This is a custom hook that will handle editing a user profile.
 * It will handle: 
 *  -the edit, 
 *  -save, 
 *  -cancel 
 *  -onChange to update the state of the data being edited.
 * 
 * The data is handled in temp data before its implemented as a change.
 * @param userId - The profile ID to fetch and edit.
 * @returns -{
 *  isEditing: Is a boolean to check whether state is editing in edit mode. 
 *  data: The confirmed/saved version of the data.
 *  tempData: The "in-progress" draft data
 *  handleEdit: Function to handle the data being edited sync temp data and current data.
 *  handleSave: Function that handles the saving of the new data.
 *  handCancel: Function that handles if the edit is canceled and discard temp data.
 *  onChange: Handles the change of the previous data with changes made though edit.
 * }
 */
export function useUserProfileEdit(userId: string) {
    const { getToken } = useAuth();
    const defaultProfile: FrontendProfile = { name: "", email: "", phone: "", address: "" };
    
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [data, setData] = useState<ProfileData>(defaultProfile);
    const [error, setError] = useState<string | null>(null);
    const [tempData, setTempData] = useState<ProfileData>(defaultProfile);

    useEffect(() => {
        let ignore = false;

        async function loadProfile() {
            try {
                const token = await getToken();
                if (!token) {
                    throw new Error("No authentication token available");
                }
                const profile = await ProfileService.fetchProfileById(userId, token);
                if (!ignore) {
                    setData(profile);
                    setTempData(profile);
                    setError(null);
                }
            } catch (err) {
                if (!ignore) {
                    setError(`Failed to load profile: ${getErrorMessage(err)}`);
                    console.error('Failed to load profile:', err);
                }
            }
        }
        loadProfile();
        return () => { ignore = true };
    }, [userId, getToken]);

    const handleEdit = () => {
        if (data) setTempData(data);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!tempData) return;
        try {
            const token = await getToken();
            if (!token) {
                throw new Error("No authentication token available");
            }
            const updatedData = await ProfileService.updateUserProfile(userId, tempData, token);
            setData(updatedData);
            setTempData(updatedData);
            setIsEditing(false);
            setError(null);
            console.log('Profile saved successfully');
            console.log("SENDING TO BACKEND:", tempData);
        } catch (err) {
            setError(`Failed to save profile: ${getErrorMessage(err)}`);
            console.error('Failed to save profile:', err);
        }
    };

    const handleCancel = () => {
        if (data) setTempData(data);
        setIsEditing(false);
    };

    const onChange = (field: string, value: string) => {
        setTempData(prev => ({ 
            ...prev, 
            [field]:
                field === "locationId"
                    ? value === ""
                        ? undefined
                        : Number(value)
                    : value 
        }));
    };

    return {
        isEditing,
        data,
        tempData,
        error,
        handleEdit,
        handleSave,
        handleCancel,
        onChange
    };
}