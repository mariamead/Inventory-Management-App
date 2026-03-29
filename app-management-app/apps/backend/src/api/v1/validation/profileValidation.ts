import Joi from "joi";

export const updateProfileSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Name cannot be empty",
        "any.required": "Name is required"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Must be a valid email",
        "any.required": "Email is required"
    }),
    phone: Joi.string().required().messages({
        "string.empty": "Phone number cannot be empty",
        "any.required": "Phone number is required"
    }),
    address: Joi.string().required().messages({
        "string.empty": "Address cannot be empty",
        "any.required": "Address is required"
    }),
});