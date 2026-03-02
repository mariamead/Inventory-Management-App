import { useState } from "react";

export type Validation = {
    isValid: boolean;
    error: string;
}

/**
 * This is a custom hook, which will be used when we want to reuse presentation
 * logic for a form. It will handle the errors presented to the user and call
 * a form service method so that it can be used with different components,
 * and have different behaviors.
 * @param formServiceMethod - This is the service method will set the input validation
 * behavior to check for errors.
 * @param initialState - This is the initial state of the inputs.
 * @returns - {
 *  inputValue: The value of the input from the user.
    setValue: The value set to update the state
    error: The error to be displayed or null if valid.
    onChange: Change handler to handle the input change from the user.
    validateForm: Validate the form to test if inputs meet requirements.
 * }
 */
export function useFormInput(
    formServiceMethod: (initialValue: string | number) => Validation,
    initialState : string | number = ""
) {
    const [ inputValue, setValue ] = useState<string | number>(initialState);
    const [ error, setError ] = useState<string | null>(null);

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
        setError(null);
    }

    // validate for error message
    const validateForm = (): Validation => {
        const errorMessage = formServiceMethod(inputValue);

        if(!errorMessage.isValid) {
            setError(errorMessage.error);
            return { isValid: false, error: errorMessage.error};
        }

        setError(null);
        return {isValid: true, error: ""};
    }

    return {
        inputValue,
        setValue,
        onChange,
        error,
        setError,
        validateForm,
    }
    
}