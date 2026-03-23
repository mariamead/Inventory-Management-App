import { useState, useEffect } from "react";
import * as ProfileService from "../services/profileService";
import type {ProfileData } from "../services/profileService";


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
 *  tempData: The "in-progress" draft data (bind this to your inputs).
 *  handleEdit: Function to handle the data being edited sync temp data and current data.
 *  handleSave: Function that handles the saving of the new data.
 *  handCancel: Function that handles if the edit is canceled and discard temp data.
 *  onChange: Handles the change of the previous data with changes made though edit.
 * }
 */
export function useUserProfileEdit(userId: string) {
    //Default values before setting state.
    const defaultProfile: ProfileData = {
        name: "",
        email: "",
        phone: "",
        address: ""
    };
    
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [data, setData] = useState<ProfileData>(defaultProfile);

    //temp data storage
    const [ tempData, setTempData] = useState<ProfileData>(defaultProfile);

    //Fetch profile on mount / userId Change
    useEffect(() => {
        let ignore = false;

        async function loadProfile() {
            const profile = await ProfileService.fetchProfileById(userId);
            if(!ignore) {
                setData(profile);
                setTempData(profile);
            }
        }
        loadProfile();
        return () => { ignore = true };
        }, [userId]);
    
    
    const handleEdit = () => {
        if(data) {
            setTempData(data);
        }
        setIsEditing(true);
    };

    const handleSave = async () => {
        if(!tempData) return;

        const updatedData = await ProfileService.updateUserProfile(userId, tempData);
        setData(updatedData);
        setTempData(updatedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        if(data) {
            setTempData(data);
        }
        setIsEditing(false);
    };

    const onChange = (field: string, value: string) => {
        setTempData(prev => ({...prev, [field]: value}));
    };

    return {
        isEditing,
        data,
        tempData,
        handleEdit,
        handleSave,
        handleCancel,
        onChange
    }
}