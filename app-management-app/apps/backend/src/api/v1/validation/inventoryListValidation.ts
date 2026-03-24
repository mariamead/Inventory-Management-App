import Joi, { ObjectSchema } from "joi";


export const inventoryListSchema: ObjectSchema = Joi.object({
    name: Joi.string().required().min(3).messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be blank",
        "string.min": "Name must be a least 3 characters long."
    }),
    description: Joi.string().required().min(5).messages({
        "any.required": "Description is required",
        "string.empty": "Description cannot be empty.",
        "string.min": "Description must be a least 5 characters long."
    }),
    location: Joi.string().required().messages({
        "any.required": "Location is required",
        "string.empty": "Location cannot be empty."
    }),
    manufacturer: Joi.string().required().messages({
        "any.required": "Manufacturer is required",
        "string.empty": "Manufacturer cannot be empty."
    }),
    category: Joi.string().required().min(3).messages({
        "any.required": "Category is required",
        "string.empty": "Category cannot be empty.",
        "string.min": "Category must be a least 3 characters long."
    }),
    quantity: Joi.number().integer().min(0).required().messages({
        "number.min": "Quantity must be 0 or greater.",
        "number.base": "Quantity must be a number.",
        "number.integer": "Quantity must be a whole number",
        "any.required": "Quantity is required."
    }),
    price: Joi.number().min(0).precision(2).required().messages({
        "number.min": "Price must be 0 or greater",
        "number.base": "Price must be a number",
        "number.precision": "Price cannot have more than 2 decimal places.",
        "any.required": "Price is required"
    }),
    lowStockThreshold: Joi.number().min(3).required().messages({
        "number.min": "Low stock threshold must be 3 or greater",
        "number.base": "Low stock threshold must be a number",
        "any.required": "Low stock threshold is required"
    })
});